import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Star, MapPin, Phone, MessageCircle, Instagram, Utensils, Wifi, Car, CreditCard, Accessibility, Music, QrCode } from 'lucide-react';
import { DiscountCard } from '../components/DiscountCard';
import { MenuModal } from '../components/MenuModal';

const RESTAURANT = {
    id: 1,
    name: "Trattoria Bella",
    rating: 4.8,
    reviewCount: 234,
    cuisine: "Italiana",
    priceRange: "$$",
    distance: "1.2 km",
    description: "Uma autêntica experiência italiana no coração da cidade. Massas frescas feitas diariamente, molhos artesanais e uma carta de vinhos selecionada para harmonizar com cada prato.",
    images: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=600"
    ],
    address: {
        street: "Av. Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo, SP"
    },
    hours: [
        { day: "Segunda", hours: "11:30 - 15:00 • 18:00 - 23:00", active: true },
        { day: "Terça", hours: "11:30 - 15:00 • 18:00 - 23:00", active: false },
        { day: "Quarta", hours: "11:30 - 15:00 • 18:00 - 23:00", active: false },
    ],
    reviews: [
        { id: 1, user: "João S.", rating: 5, date: "há 2 dias", text: "Melhor carbonara que já comi! O atendimento também é impecável." },
        { id: 2, user: "Maria P.", rating: 4, date: "há 1 semana", text: "Lugar lindo, mas a fila de espera estava grande. Valeu a pena." },
        { id: 3, user: "Carlos A.", rating: 5, date: "há 2 semanas", text: "Experiência sensacional. O vinho da casa é surpreendente." },
    ]
};

export default function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    // Header scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll horizontal image detection
    const handleImageScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveImage(index);
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm pt-12 pb-4' : 'bg-transparent pt-6 pb-0'}`}>
                <div className="px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className={`p-2 rounded-full backdrop-blur-md transition-colors ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/30 text-white'}`}>
                        <ChevronLeft size={24} />
                    </button>

                    {isScrolled && (
                        <h1 className="font-bold text-gray-900 animate-in fade-in slide-in-from-bottom-2">{RESTAURANT.name}</h1>
                    )}

                    <div className="flex gap-3">
                        <button className={`p-2 rounded-full backdrop-blur-md transition-colors ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/30 text-white'}`}>
                            <Heart size={24} />
                        </button>
                        <button className={`p-2 rounded-full backdrop-blur-md transition-colors ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/30 text-white'}`}>
                            <Share2 size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Carousel */}
            <div className="relative h-[40vh] bg-gray-200">
                <div
                    className="flex overflow-x-auto w-full h-full snap-x snap-mandatory no-scrollbar"
                    onScroll={handleImageScroll}
                >
                    {RESTAURANT.images.map((img, i) => (
                        <div key={i} className="min-w-full h-full snap-center relative">
                            <img src={img} alt={`Foto ${i}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    ))}
                </div>
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {RESTAURANT.images.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === i ? 'bg-white w-4' : 'bg-white/50'}`}></div>
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="relative -mt-6 bg-white rounded-t-3xl min-h-screen px-6 pt-8 space-y-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]">

                {/* Main Info */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">{RESTAURANT.name}</h1>
                    <div className="flex items-center gap-2 mb-3 cursor-pointer">
                        <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                        <span className="font-bold text-gray-900">{RESTAURANT.rating}</span>
                        <span className="text-gray-500">({RESTAURANT.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <span>{RESTAURANT.cuisine}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{RESTAURANT.priceRange}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{RESTAURANT.distance}</span>
                    </div>
                </div>

                {/* Discount Card */}
                <DiscountCard
                    discount="20% OFF"
                    description="Em toda a conta"
                    schedule="Seg a Sex • 18h às 22h"
                    status="active"
                />

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex-1 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <Utensils size={18} />
                        Ver Menu
                    </button>
                    <button className="flex-1 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100 font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <MapPin size={18} />
                        Como Chegar
                    </button>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Horários</h3>
                        <div className="space-y-1">
                            {RESTAURANT.hours.map((h, i) => (
                                <div key={i} className={`flex justify-between text-sm ${h.active ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                    <span>{h.day}</span>
                                    <span>{h.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Endereço</h3>
                        <p className="text-gray-600 mb-1">{RESTAURANT.address.street}, {RESTAURANT.address.number}</p>
                        <p className="text-gray-600 mb-2">{RESTAURANT.address.neighborhood} - {RESTAURANT.address.city}</p>
                        <button className="text-mesa-green font-bold text-sm">Ver no mapa</button>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Contato</h3>
                        <div className="flex gap-4">
                            <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"><Phone size={20} /></button>
                            <button className="p-3 rounded-full bg-gray-50 text-green-600 hover:bg-green-50 border border-gray-100"><MessageCircle size={20} /></button>
                            <button className="p-3 rounded-full bg-gray-50 text-pink-600 hover:bg-pink-50 border border-gray-100"><Instagram size={20} /></button>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Sobre</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{RESTAURANT.description}</p>
                    <button className="text-gray-400 font-semibold text-sm mt-1">Ler mais</button>
                </div>

                {/* Facilities */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Comodidades</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { icon: Wifi, label: 'Wi-Fi' },
                            { icon: Car, label: 'Estacionamento' },
                            { icon: Accessibility, label: 'Acessível' },
                            { icon: CreditCard, label: 'Aceita Cartão' },
                            { icon: Music, label: 'Música ao vivo' }
                        ].map((item, i) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                                <item.icon size={12} />
                                {item.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div className="pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Avaliações ({RESTAURANT.reviewCount})</h3>
                        <button className="text-mesa-green text-sm font-bold">Ver todas</button>
                    </div>
                    <div className="space-y-4">
                        {RESTAURANT.reviews.map(review => (
                            <div key={review.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {review.user.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm text-gray-900">{review.user}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
                <button className="w-full py-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white rounded-2xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 text-lg">
                    <QrCode size={24} />
                    Validar Desconto - 20% OFF
                </button>
            </div>

            {/* Modals */}
            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} restaurantName={RESTAURANT.name} />

        </div>
    );
}
