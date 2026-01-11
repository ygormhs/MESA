-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Base User Table, extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  role text check (role in ('client', 'restaurant', 'admin')) default 'client',
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. RESTAURANTS (Linked to a Profile with role='restaurant')
create table public.restaurants (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null, -- Owner
  name text not null,
  slug text unique, -- For friendly URLs
  description text,
  address text,
  city text default 'Curitiba',
  neighborhood text,
  zip_code text,
  coordinates point, -- Latitude/Longitude
  logo_url text,
  cover_image_url text,
  
  -- Metadata stored as JSONB for flexibility
  cuisine_types text[], -- Array of strings e.g. ['Italiana', 'Massas']
  amenities text[], -- ['Pet Friendly', 'Kids Space', 'Wifi']
  price_range integer check (price_range between 1 and 4), -- 1=$ 4=$$$$
  opening_hours jsonb, -- Struct: { "mon": {open: "18:00", close: "23:00"}, ... }
  social_links jsonb, -- { "instagram": "@...", "website": "..." }
  
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. MENU CATEGORIES
create table public.menu_categories (
  id uuid default uuid_generate_v4() primary key,
  restaurant_id uuid references public.restaurants(id) on delete cascade not null,
  name text not null, -- "Entradas", "Pratos Principais"
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. MENU ITEMS
create table public.menu_items (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.menu_categories(id) on delete cascade not null,
  restaurant_id uuid references public.restaurants(id) on delete cascade not null, -- Redundant but useful for queries
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PROMOTIONS / DISCOUNTS
create table public.promotions (
  id uuid default uuid_generate_v4() primary key,
  restaurant_id uuid references public.restaurants(id) on delete cascade not null,
  title text not null, -- "50% OFF em Pratos Principais"
  description text,
  discount_percentage integer check (discount_percentage > 0 and discount_percentage <= 100),
  
  -- Validity Rules
  valid_from timestamp with time zone,
  valid_until timestamp with time zone,
  valid_days text[], -- ['Mon', 'Tue', ...]
  valid_times jsonb, -- { "start": "18:00", "end": "20:00" }
  
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. VALIDATIONS (Transaction History)
-- Records when a user visits a restaurant and redeems a discount
create table public.validations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  restaurant_id uuid references public.restaurants(id) on delete cascade not null,
  promotion_id uuid references public.promotions(id) on delete set null,
  
  -- Financials
  total_bill_amount numeric(10,2) not null, -- Conta original
  discount_amount numeric(10,2) not null,   -- Quanto economizou
  final_paid_amount numeric(10,2) not null, -- Quanto pagou
  
  visit_date timestamp with time zone default timezone('utc'::text, now()) not null,
  status text check (status in ('pending', 'completed', 'cancelled')) default 'completed',
  
  -- Feedback
  rating integer check (rating between 1 and 5),
  review_comment text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. FAVORITES
create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, restaurant_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table profiles enable row level security;
alter table restaurants enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table promotions enable row level security;
alter table validations enable row level security;
alter table favorites enable row level security;

-- Public Read Policies
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Restaurants are viewable by everyone" on restaurants for select using (true);
create policy "Menu items are viewable by everyone" on menu_items for select using (true);
create policy "Promotions are viewable by everyone" on promotions for select using (true);

-- User Specific Policies
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Validation Policies
create policy "Users can see their own validations" on validations for select using (auth.uid() = user_id);
create policy "Restaurants can see their own validations" on validations for select using (
  auth.uid() in (select profile_id from restaurants where id = validations.restaurant_id)
);
create policy "Users can insert validations" on validations for insert with check (auth.uid() = user_id);

-- TRIGGERS to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', coalesce(new.raw_user_meta_data->>'role', 'client'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
