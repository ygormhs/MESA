import { useState, useRef } from 'react';
import { Search as SearchIcon, SlidersHorizontal, MapPin, Star, Car, Baby, Dog, Utensils, Coffee, Heart } from 'lucide-react';
import clsx from 'clsx';
import { BottomNav } from '../components/BottomNav';
import { DualRangeSlider } from '../components/DualRangeSlider';

const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const CUISINES = [
    // Internacionais
    { id: 'italiana', label: 'Italiana', icon: '🍝' },
    { id: 'japonesa', label: 'Japonesa', icon: '🍣' },
    { id: 'brasileira', label: 'Brasileira', icon: '🇧🇷' },
    { id: 'arabe', label: 'Árabe', icon: '🧆' },
    { id: 'mexicana', label: 'Mexicana', icon: '🌮' },
    { id: 'chinesa', label: 'Chinesa', icon: '🥡' },
    { id: 'americana', label: 'Americana', icon: '🇺🇸' },
    { id: 'francesa', label: 'Francesa', icon: '🥐' },
    { id: 'peruana', label: 'Peruana', icon: '🇵🇪' },
    { id: 'indiana', label: 'Indiana', icon: '🍛' },
    { id: 'tailandesa', label: 'Tailandesa', icon: '🍜' },
    { id: 'coreana', label: 'Coreana', icon: '🇰🇷' },
    { id: 'portuguesa', label: 'Portuguesa', icon: '🇵🇹' },
    { id: 'espanhola', label: 'Espanhola', icon: '🇪🇸' },
    { id: 'grega', label: 'Grega', icon: '🇬🇷' },
    { id: 'alema', label: 'Alemã', icon: '🇩🇪' },

    // Brasileiras específicas
    { id: 'churrascaria', label: 'Churrascaria', icon: '🥩' },
    { id: 'caseira', label: 'Comida Caseira', icon: '🍚' },
    { id: 'mineira', label: 'Mineira', icon: '🫘' },
    { id: 'nordestina', label: 'Nordestina', icon: '🌵' },
    { id: 'baiana', label: 'Baiana', icon: '🥥' },
    { id: 'frutos_do_mar', label: 'Frutos do Mar', icon: '🦐' },

    // Por tipo
    { id: 'pizzaria', label: 'Pizzaria', icon: '🍕' },
    { id: 'hamburgueria', label: 'Hamburgueria', icon: '🍔' },
    { id: 'sushi', label: 'Sushi', icon: '🍣' },
    { id: 'massas', label: 'Massas', icon: '🍝' },
    { id: 'saladas', label: 'Saladas', icon: '🥗' },
    { id: 'acai', label: 'Açaí', icon: '🫐' },
    { id: 'padaria', label: 'Padaria', icon: '🥖' },
    { id: 'confeitaria', label: 'Confeitaria', icon: '🎂' },
    { id: 'cafeteria', label: 'Cafeteria', icon: '☕' },
    { id: 'sorveteria', label: 'Sorveteria', icon: '🍦' },
    { id: 'food_truck', label: 'Food Truck', icon: '🚚' },

    // Bares
    { id: 'bar', label: 'Bar', icon: '🍺' },
    { id: 'pub', label: 'Pub', icon: '🍻' },
    { id: 'wine_bar', label: 'Wine Bar', icon: '🍷' },
    { id: 'boteco', label: 'Boteco', icon: '🥃' },
    { id: 'cervejaria', label: 'Cervejaria', icon: '🍺' },

    // Especiais
    { id: 'vegetariano', label: 'Vegetariano', icon: '🥬' },
    { id: 'vegano', label: 'Vegano', icon: '🌱' },
    { id: 'fit', label: 'Fit', icon: '💪' },
    { id: 'sem_gluten', label: 'Sem Glúten', icon: '🌾' },

    // Momentos
    { id: 'brunch', label: 'Brunch', icon: '🥞' },
    { id: 'executivo', label: 'Almoço Executivo', icon: '👔' },
    { id: 'happy_hour', label: 'Happy Hour', icon: '🍻' },
    { id: 'romantico', label: 'Romântico', icon: '💑' },
];

const REGIONS = [
    'Batel', 'Centro', 'Bigorrilho', 'Água Verde', 'Juvevê', 'Cabral', 'Santa Felicidade'
];

const FEATURES = [
    { id: 'fav', label: 'Meus Favoritos', icon: Star },
    { id: 'kids', label: 'Espaço Kids', icon: Baby },
    { id: 'pet', label: 'Pet Friendly', icon: Dog },
    { id: 'site', label: 'Consumo no local', icon: Utensils },
    { id: 'takeaway', label: 'Aceita Take Away', icon: Coffee },
    { id: 'parking', label: 'Estacionamento', icon: Car },
    { id: 'free_parking', label: 'Estacionamento gratuito', icon: Car },
    { id: 'vegan', label: 'Opções veganas', icon: Utensils },
    { id: 'gluten_free', label: 'Opções sem-glúten', icon: Utensils },
];

export default function Search() {
    const [activeTab, setActiveTab] = useState('geral');
    const [selectedDays, setSelectedDays] = useState([5, 6]);
    const [timeRange, setTimeRange] = useState([18, 23]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [minDiscount, setMinDiscount] = useState(0);
    const [selectedHolidays, setSelectedHolidays] = useState(false);

    const toggleDay = (index) => {
        if (selectedDays.includes(index)) {
            setSelectedDays(selectedDays.filter(d => d !== index));
        } else {
            setSelectedDays([...selectedDays, index].sort());
        }
    };

    const toggleFeature = (id) => {
        if (selectedFeatures.includes(id)) {
            setSelectedFeatures(selectedFeatures.filter(f => f !== id));
        } else {
            setSelectedFeatures([...selectedFeatures, id]);
        }
    };

    return (
        <div className="fixed inset-0 bg-background flex justify-center z-0">
            {/* Constrained Container - Desktop Friendly */}
            <div className="w-full max-w-md h-full flex flex-col relative bg-background shadow-2xl">

                {/* 1. Header (Sticky Top) */}
                <div className="z-20 bg-background/80 backdrop-blur-md px-6 pt-12 pb-2 border-b border-border/50 shrink-0">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar restaurantes..."
                            className="w-full h-12 pl-12 pr-12 bg-secondary rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Top Tabs */}
                    <div className="flex w-full mt-4 bg-muted/50 p-1 rounded-xl">
                        {['Geral', 'Culinária'].map((tab) => {
                            const id = tab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            const isActive = activeTab === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={clsx(
                                        "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                                        isActive ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* 2. Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 pb-6 space-y-6 scroll-smooth">
                    {activeTab === 'geral' && (
                        <>
                            <section>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Dia da Semana</h3>
                                <div className="flex justify-between">
                                    {DAYS.map((day, idx) => {
                                        const isSelected = selectedDays.includes(idx);
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => toggleDay(idx)}
                                                className={clsx(
                                                    "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                                                    isSelected
                                                        ? "bg-primary text-white border-primary shadow-md scale-105"
                                                        : "bg-white text-muted-foreground border-border hover:border-primary/50"
                                                )}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Horários</h3>
                                    <span className="text-xs font-mono font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">
                                        {timeRange[0]}:00 - {timeRange[1] === 24 ? '24:00' : `${timeRange[1]}:00`}
                                    </span>
                                </div>

                                {/* Custom Dual Range Slider */}
                                <div className="px-1">
                                    <DualRangeSlider
                                        min={0}
                                        max={24}
                                        step={1}
                                        value={timeRange}
                                        onChange={setTimeRange}
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Desconto Mínimo</h3>
                                    {minDiscount > 0 && (
                                        <span className="text-xs font-bold text-mesa-orange">{minDiscount}% OFF</span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => (
                                        <button
                                            key={percent}
                                            onClick={() => setMinDiscount(minDiscount === percent ? 0 : percent)}
                                            className={clsx(
                                                "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                                                minDiscount === percent
                                                    ? "bg-mesa-orange text-white border-mesa-orange shadow-sm"
                                                    : minDiscount > percent
                                                        ? "bg-orange-50 text-mesa-orange border-orange-200"
                                                        : "bg-white text-muted-foreground border-border/60 hover:border-mesa-orange/50 hover:text-foreground"
                                            )}
                                        >
                                            {percent}%
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <hr className="border-border/50" />

                            <section>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Aceita em</h3>
                                <div className="flex gap-2">
                                    <button
                                        className={clsx(
                                            "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                                            selectedHolidays
                                                ? "bg-primary text-white border-primary"
                                                : "bg-white text-foreground border-border hover:border-primary"
                                        )}
                                        onClick={() => setSelectedHolidays(!selectedHolidays)}
                                    >
                                        Feriados
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                                        Datas comemorativas
                                    </button>
                                </div>
                            </section>

                            <hr className="border-border/50" />

                            <section>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Características</h3>
                                <div className="flex flex-wrap gap-2">
                                    {FEATURES.map((feature) => {
                                        const isSelected = selectedFeatures.includes(feature.id);
                                        return (
                                            <button
                                                key={feature.id}
                                                onClick={() => toggleFeature(feature.id)}
                                                className={clsx(
                                                    "px-3 py-2 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all border",
                                                    isSelected
                                                        ? "bg-primary text-white border-primary shadow-sm"
                                                        : "bg-white text-muted-foreground border-border/60 hover:border-primary/50 hover:bg-secondary"
                                                )}
                                            >
                                                {feature.icon && <feature.icon className="w-3 h-3" />}
                                                {feature.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        </>
                    )}

                    {activeTab === 'culinaria' && (
                        <section className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Tipos de Cozinha</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {CUISINES.map((cuisine) => (
                                    <div key={cuisine.id} className="relative group">
                                        <button className="w-full p-3 bg-white border border-border rounded-xl flex items-center gap-2 hover:border-primary transition-all text-left">
                                            <span className="text-xl">{cuisine.icon}</span>
                                            <span className="text-sm font-medium text-foreground">{cuisine.label}</span>
                                        </button>
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-muted-foreground/50 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle favorite logic
                                            }}
                                        >
                                            <Heart className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'regiao' && (
                        <section className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Regiões de Curitiba</h3>
                            <div className="space-y-1.5">
                                {REGIONS.map((region) => (
                                    <button key={region} className="w-full p-3 bg-white border border-border rounded-xl flex items-center justify-between hover:border-primary transition-all group">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <span className="text-sm font-medium text-foreground">{region}</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-mesa-green/0 group-hover:bg-mesa-green transition-all" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Footer Buttons - MOVED INSIDE SCROLLABLE AREA */}
                    <div className="pt-6 pb-24 flex flex-col gap-3">
                        <button className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]">
                            Aplicar Filtros
                        </button>

                        <button
                            className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors underline decoration-muted-foreground/30"
                            onClick={() => {
                                setSelectedDays([]);
                                setSelectedFeatures([]);
                                setMinDiscount(0);
                                setTimeRange([18, 23]);
                                setSelectedHolidays(false);
                            }}
                        >
                            Limpar filtros
                        </button>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
