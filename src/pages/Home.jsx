import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, ChevronRight, ChevronDown, SlidersHorizontal, Utensils, Coffee, Wine, Pizza, Sandwich, IceCream, Beer, Carrot } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

// Mock Data
const CATEGORIES = [
    { id: '1', name: 'Geral', icon: Utensils },
    { id: '2', name: 'Pizza', icon: Pizza },
    { id: '3', name: 'Café', icon: Coffee },
    { id: '4', name: 'Bebidas', icon: Wine },
    { id: '5', name: 'Lanches', icon: Sandwich },
    { id: '6', name: 'Sorvetes', icon: IceCream },
    { id: '7', name: 'Bar', icon: Beer },
    { id: '8', name: 'Saudável', icon: Carrot },
];

const FEATURED = [
    {
        id: 1,
        name: "Trattoria Bella",
        type: "Italiana",
        location: "Paulista",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800&h=1000",
        rating: 4.9,
        discount: "50%",
        discountType: "OFF"
    },
    {
        id: 2,
        name: "Osaka Sushi",
        type: "Japonesa",
        location: "Jardins",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800&h=1000",
        rating: 4.8,
        discount: "30%",
        discountType: "OFF"
    },
    {
        id: 3,
        name: "Boi de Ouro",
        type: "Churrascaria",
        location: "Batel",
        image: "https://images.unsplash.com/photo-1544025162-d76690b67f11?auto=format&fit=crop&q=80&w=800&h=1000",
        rating: 4.7,
        discount: "Rolha",
        discountType: "Free"
    }
];

const POPULAR = [
    {
        id: 1,
        title: "Carbonara Trufado",
        restaurant: "Trattoria Bella",
        location: "Paulista",
        price: 78,
        originalPrice: 98,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
        id: 2,
        title: "Combo Almoço",
        restaurant: "Bistrô da Esquina",
        location: "Paulista",
        price: 49.90,
        originalPrice: 65.00,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
        id: 3,
        title: "Picanha Angus",
        restaurant: "Boi de Ouro",
        location: "Batel",
        price: 145,
        image: "https://images.unsplash.com/photo-1544025162-d76690b67f11?auto=format&fit=crop&q=80&w=800&h=1000"
    },
    {
        id: 4,
        title: "Espresso Duplo",
        restaurant: "Café do Centro",
        location: "Paulista",
        price: 12,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800&h=800"
    }
];

export default function Home() {
    // State
    const [location, setLocation] = useState("Curitiba");
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const [rotatingIndex, setRotatingIndex] = useState(0);

    // Suggestions without emojis
    const suggestions = [
        "Jantar Italiano",
        "Sushi Fresquinho",
        "Hamburguer Artesanal",
        "Café Especial",
        "Drink Refrescante",
        "Jantar Italiano" // Duplicate first for infinite loop illusion if needed, but simple cycle works too
    ];

    const navigate = useNavigate();

    const [greeting] = useState(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bom dia";
        if (hour < 18) return "Boa tarde";
        return "Boa noite";
    });
    // Time-based greeting & rotating text
    useEffect(() => {
        const interval = setInterval(() => {
            setRotatingIndex((prev) => (prev + 1) % suggestions.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Mock Data for "Descubra Restaurantes" with Discounts
    const DISCOVER_RESTAURANTS = [
        { id: 101, name: "Outback Steakhouse", type: "Australiana", image: "https://images.unsplash.com/photo-1544252890-a1fe4e95fc37?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.8, discount: "30%" },
        { id: 102, name: "Madero Steakhouse", type: "Hambúrguer", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.7 },
        { id: 103, name: "Coco Bambu", type: "Frutos do Mar", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.9, discount: "15%" },
        { id: 104, name: "Taj Pharmacy", type: "Asiática", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.5, discount: "50%" },
        { id: 105, name: "Barolo Trattoria", type: "Italiana", image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.8, discount: "20%" },
        { id: 106, name: "Jardim Secreto", type: "Contemporânea", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300", rating: 4.6 },
    ];

    // Curitiba Neighborhoods
    const LOCATIONS = ["Batel", "Bigorrilho", "Centro", "Água Verde", "Ecoville", "Juvevê", "Cabral"];

    // Notifications List (Admin driven)
    const NOTIFICATIONS = [
        { id: 1, title: "Cupom de R$ 20", msg: "Use o código MESA20 no seu próximo jantar!", time: "2h atrás", unread: true },
        { id: 2, title: "Novidade na área", msg: "O Outback agora está no Mesa! Confira as ofertas.", time: "1d atrás", unread: false },
    ];

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <header className="pt-6 px-6 pb-4 bg-background sticky top-0 z-30 shadow-sm border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden border border-border">
                            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Localização</p>
                            <div
                                className="flex items-center gap-1 text-primary cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setIsLocationModalOpen(true)}
                            >
                                <MapPin className="w-4 h-4 text-mesa-orange" />
                                <span className="font-bold text-sm truncate max-w-[150px]">{location}</span>
                                <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                    <button
                        className="relative p-2.5 rounded-full border border-border bg-white hover:bg-secondary transition-colors shadow-sm"
                        onClick={() => setIsNotifOpen(true)}
                    >
                        <Bell className="w-5 h-5 text-foreground" />
                        <span className="absolute top-2.5 right-3 w-2 h-2 bg-mesa-orange rounded-full border-2 border-white"></span>
                    </button>
                </div>
                {/* REMOVED: Avatar, Location, Bell as per user request to simplify header */}

                {/* Search & Filter Row */}
                {/* Search Row */}
                <div className="relative shadow-sm rounded-2xl w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar restaurantes..."
                        className="w-full h-12 pl-12 pr-4 bg-secondary rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 text-foreground border-none"
                    />
                </div>
            </header>

            {/* Dynamic Greeting (Moved out of sticky header) */}
            <div className="px-6 mt-6 mb-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2 md:mb-4">
                    {greeting}, User!
                </h1>

                {/* Single Line Layout on Mobile - Adjusted Sizes */}
                <div className="flex items-center gap-2 overflow-hidden w-full h-8 md:h-14">
                    <span className="text-muted-foreground text-sm md:text-3xl font-medium whitespace-nowrap flex-shrink-0 pt-0.5">
                        Que tal um
                    </span>

                    {/* Scroll Container */}
                    <div className="h-full overflow-hidden relative flex-1 w-full">
                        <div
                            className="transition-transform duration-500 ease-out flex flex-col absolute top-0 left-0 w-full"
                            style={{ transform: `translateY(-${rotatingIndex * (window.innerWidth >= 768 ? 56 : 32)}px)` }} // h-14 (56px) md, h-8 (32px) mobile match
                        >
                            {suggestions.map((text, i) => (
                                <span key={i} className="h-8 md:h-14 flex items-center text-lg md:text-5xl font-extrabold text-mesa-orange whitespace-nowrap tracking-tight truncate w-full">
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Carousel */}
            <section className="mt-4 pl-6 overflow-hidden">
                <div className="flex justify-between items-end pr-6 mb-4">
                    <h2 className="text-lg font-bold text-foreground">Super Descontos 🔥</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-8 pr-6 no-scrollbar snap-x snap-mandatory">
                    {FEATURED.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/restaurant/${item.id}`)}
                            className="relative min-w-[260px] w-[80vw] md:w-[300px] aspect-[4/5] rounded-[2rem] overflow-hidden snap-center shadow-lg group cursor-pointer border border-border/50"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-5 text-white">

                                {/* Top Badges */}
                                <div className="flex justify-between items-start">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/20">
                                        {item.type}
                                    </span>
                                    <span className="bg-white text-foreground text-[10px] font-bold px-2 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                        <span className="text-yellow-500 text-xs">★</span> {item.rating}
                                    </span>
                                </div>

                                {/* Bottom Info & Big Discount */}
                                <div>
                                    <div className="mb-2">
                                        <span className="text-4xl font-extrabold text-white leading-none tracking-tight block">
                                            {item.discount}
                                        </span>
                                        <span className="text-lg font-bold text-white/90 uppercase tracking-widest leading-none">
                                            {item.discountType}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold leading-tight mb-1">{item.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-white/80">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="px-6 -mt-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Categorias</h2>
                    <button className="text-primary text-sm font-semibold hover:underline">Ver todas</button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {CATEGORIES.map((cat, index) => (
                        <button
                            key={cat.id}
                            // Only show first 4 items on mobile (hidden if index >= 4). Show all on md+ (flex).
                            className={`group flex-col items-center gap-3 w-full ${index >= 4 ? 'hidden md:flex' : 'flex'}`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center transition-all group-hover:border-primary group-hover:scale-105 group-active:scale-95 group-hover:shadow-md">
                                <cat.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* UPDATED: Discover Restaurants Section (2-Column Grid with Discounts) */}
            <section className="mt-8 px-6 pb-20">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Descubra Restaurantes</h2>
                </div>
                {/* 2-Column Grid Layout */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Simulated Infinite Scroll by repeating data */}
                    {[...DISCOVER_RESTAURANTS, ...DISCOVER_RESTAURANTS, ...DISCOVER_RESTAURANTS].map((rest, idx) => (
                        <div
                            key={`${rest.id}-${idx}`}
                            onClick={() => navigate(`/restaurant/${rest.id}`)}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all active:scale-95"
                        >
                            <div className="h-32 overflow-hidden relative">
                                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                {/* Discount Badge if available */}
                                {rest.discount && (
                                    <span className="absolute top-2 right-2 bg-mesa-orange text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                        {rest.discount} OFF
                                    </span>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-gray-900 truncate text-sm">{rest.name}</h3>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-gray-500 truncate max-w-[60%]">{rest.type}</span>
                                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-gray-700">
                                        <span className="text-yellow-400">★</span> {rest.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <BottomNav />

            {/* Location Dialog Modal */}
            {isLocationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsLocationModalOpen(false)}>
                    <div className="bg-white w-full sm:max-w-md p-6 rounded-t-3xl sm:rounded-3xl shadow-xl animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Selecione sua Localização em Curitiba</h3>
                            <button onClick={() => setIsLocationModalOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                                <ChevronDown size={20} />
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {LOCATIONS.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => {
                                        setLocation(loc);
                                        setIsLocationModalOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${location === loc ? 'border-mesa-green bg-green-50 text-mesa-green font-bold shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-white hover:border-gray-200'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <MapPin size={18} className={location === loc ? 'fill-current' : ''} />
                                        <span>{loc}</span>
                                    </div>
                                    {location === loc && <div className="w-3 h-3 bg-mesa-green rounded-full"></div>}
                                </button>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                            <MapPin size={18} />
                            Usar minha localização atual
                        </button>
                    </div>
                </div>
            )}

            {/* Notifications Modal */}
            {isNotifOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6" onClick={() => setIsNotifOpen(false)}>
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden mt-16 animate-in fade-in slide-in-from-top-10 duration-300 border border-gray-100" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Notificações</h3>
                            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">2 novas</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {NOTIFICATIONS.map(notif => (
                                <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{notif.title}</h4>
                                        <span className="text-[10px] text-gray-400">{notif.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">{notif.msg}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 bg-gray-50 text-center">
                            <button className="text-xs font-semibold text-primary hover:underline">Marcar todas como lidas</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
