import { useState } from 'react';
import {
    Store,
    UtensilsCrossed,
    Image as ImageIcon,
    Save,
    Plus,
    Pencil,
    Trash2,
    Upload,
    MoreHorizontal
} from 'lucide-react';

export default function RestaurantProfile() {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Meu Restaurante</h1>
                <p className="text-gray-500">Gerencie as informações, cardápio e fotos do seu estabelecimento.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <TabButton
                    id="info"
                    label="Informações"
                    icon={Store}
                    active={activeTab === 'info'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="menu"
                    label="Cardápio Digital"
                    icon={UtensilsCrossed}
                    active={activeTab === 'menu'}
                    onClick={setActiveTab}
                />
                <TabButton
                    id="photos"
                    label="Galeria de Fotos"
                    icon={ImageIcon}
                    active={activeTab === 'photos'}
                    onClick={setActiveTab}
                />
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'info' && <InfoTab />}
                {activeTab === 'menu' && <MenuTab />}
                {activeTab === 'photos' && <PhotosTab />}
            </div>
        </div>
    );
}

function TabButton({ id, label, icon: Icon, active, onClick }) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
                flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors
                ${active
                    ? 'border-mesa-green text-mesa-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
        >
            <Icon size={18} />
            {label}
        </button>
    );
}

// --- TAB COMPONENTS ---

function InfoTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Dados Gerais</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Restaurante</label>
                        <input type="text" defaultValue="Trattoria Bella" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
                        <textarea defaultValue="Autêntica culinária italiana no coração da cidade." className="w-full px-4 py-2 border border-gray-200 rounded-xl min-h-[80px]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Culinária Principal</label>
                            <select className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white">
                                <option>Italiana</option>
                                <option>Japonesa</option>
                                <option>Brasileira</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Faixa de Preço</label>
                            <select className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white">
                                <option>$$ (Moderado)</option>
                                <option>$ (Econômico)</option>
                                <option>$$$ (Sofisticado)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Endereço & Contato</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                        <input type="text" defaultValue="Rua das Flores, 123 - Centro" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input type="text" defaultValue="(11) 99999-9999" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input type="text" defaultValue="@trattoriabella" className="w-full px-4 py-2 border border-gray-200 rounded-xl" />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                        <Save size={20} />
                        Salvar Informações
                    </button>
                </div>
            </div>
        </div>
    );
}

function MenuTab() {
    const MENU_CATEGORIES = [
        { id: 1, name: 'Entradas', items: 3 },
        { id: 2, name: 'Pratos Principais', items: 8 },
        { id: 3, name: 'Sobremesas', items: 4 },
        { id: 4, name: 'Bebidas', items: 6 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full text-green-600 shadow-sm">
                        <UtensilsCrossed size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-green-900">Seu Cardápio Digital</h3>
                        <p className="text-sm text-green-700">Organize seus pratos por categorias.</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-mesa-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-sm">
                    <Plus size={18} />
                    Nova Categoria
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MENU_CATEGORIES.map(cat => (
                    <div key={cat.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-mesa-green hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                                {cat.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{cat.name}</h4>
                                <p className="text-sm text-gray-500">{cat.items} itens cadastrados</p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                            <Pencil size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PhotosTab() {
    const PHOTOS = [1, 2, 3, 4, 5]; // Mock

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Galeria ({PHOTOS.length})</h3>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl font-medium text-gray-600 hover:border-mesa-green hover:text-mesa-green transition-colors">
                    <Upload size={18} />
                    Adicionar Fotos
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {PHOTOS.map(photo => (
                    <div key={photo} className="aspect-square bg-gray-100 rounded-xl relative group overflow-hidden">
                        <img
                            src={`https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3`}
                            alt="Restaurant Food"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
