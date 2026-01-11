import { useState } from 'react';
import { X, Search } from 'lucide-react';

const MENU_CATEGORIES = [
    { id: 'starters', label: 'Entradas' },
    { id: 'mains', label: 'Pratos Principais' },
    { id: 'drinks', label: 'Bebidas' },
    { id: 'desserts', label: 'Sobremesas' },
];

const MENU_ITEMS = [
    { id: 1, category: 'mains', name: 'Carbonara Trufado', description: 'Spaghetti com molho carbonara cremoso, pancetta crocante e azeite trufado.', price: 78.00, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, category: 'mains', name: 'Risoto de Fungi', description: 'Arroz arbóreo, mix de cogumelos selvagens, queijo parmesão e vinho branco.', price: 65.00, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, category: 'starters', name: 'Burrata ao Pesto', description: 'Burrata fresca servida com tomates cereja confitados, molho pesto e torradas.', price: 52.00, image: 'https://images.unsplash.com/photo-1577960368140-5ace056f4d2f?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, category: 'desserts', name: 'Tiramisu Clássico', description: 'Camadas de biscoito champagne embebido em café, creme de mascarpone e cacau.', price: 32.00, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=200&h=200' },
];

export function MenuModal({ isOpen, onClose, restaurantName }) {
    const [activeCategory, setActiveCategory] = useState('mains');

    if (!isOpen) return null;

    const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                </button>
                <div className="flex-1 text-center">
                    <h2 className="font-bold text-gray-900">Menu</h2>
                    <p className="text-xs text-gray-500">{restaurantName}</p>
                </div>
                <button className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Search size={22} />
                </button>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto p-4 gap-2 no-scrollbar bg-white border-b border-gray-50">
                {MENU_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors
                            ${activeCategory === cat.id
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{MENU_CATEGORIES.find(c => c.id === activeCategory)?.label}</h3>

                {filteredItems.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex-1 space-y-1">
                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                            <span className="block mt-2 font-bold text-gray-900">R$ {item.price.toFixed(2)}</span>
                        </div>
                        {item.image && (
                            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-gray-200" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
