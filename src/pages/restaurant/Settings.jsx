import { useState } from 'react';
import { Save, MapPin, Clock, DollarSign, UtensilsCrossed } from 'lucide-react';
import { DualRangeSlider } from '../../components/DualRangeSlider';

const DAYS_OF_WEEK = [
    { id: 'Seg', label: 'Seg' },
    { id: 'Ter', label: 'Ter' },
    { id: 'Qua', label: 'Qua' },
    { id: 'Qui', label: 'Qui' },
    { id: 'Sex', label: 'Sex' },
    { id: 'Sab', label: 'Sáb' },
    { id: 'Dom', label: 'Dom' },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');

    // General Info State
    const [info, setInfo] = useState({
        name: 'Trattoria Bella',
        description: 'Autêntica culinária italiana no coração da cidade.',
        cnpj: '12.345.678/0001-90',
        cuisine: 'Italiana',
        priceRange: '$$'
    });

    // Location State
    const [location, setLocation] = useState({
        cep: '01310-100',
        street: 'Av. Paulista',
        number: '1000',
        complement: 'Loja 42',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP'
    });

    // Hours State
    const [hours, setHours] = useState(
        DAYS_OF_WEEK.map(d => ({ ...d, isOpen: true, open: '18:00', close: '23:00' }))
    );

    const handleSave = () => {
        alert('Configurações salvas com sucesso!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                <p className="text-gray-500">Gerencie todos os dados do seu restaurante.</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                <TabButton id="general" label="Geral" icon={UtensilsCrossed} active={activeTab === 'general'} onClick={setActiveTab} />
                <TabButton id="location" label="Localização" icon={MapPin} active={activeTab === 'location'} onClick={setActiveTab} />
                <TabButton id="hours" label="Horários" icon={Clock} active={activeTab === 'hours'} onClick={setActiveTab} />
                <TabButton id="finance" label="Financeiro" icon={DollarSign} active={activeTab === 'finance'} onClick={setActiveTab} />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[500px]">
                {activeTab === 'general' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Informações do Restaurante</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
                                <input
                                    type="text"
                                    value={info.name}
                                    onChange={e => setInfo({ ...info, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                                <input
                                    type="text"
                                    value={info.cnpj}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    value={info.description}
                                    onChange={e => setInfo({ ...info, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Culinária</label>
                                <select
                                    value={info.cuisine}
                                    onChange={e => setInfo({ ...info, cuisine: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white"
                                >
                                    <option>Italiana</option>
                                    <option>Japonesa</option>
                                    <option>Brasileira</option>
                                    <option>Mexicana</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Faixa de Preço</label>
                                <select
                                    value={info.priceRange}
                                    onChange={e => setInfo({ ...info, priceRange: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white"
                                >
                                    <option value="$">Barato ($)</option>
                                    <option value="$$">Moderado ($$)</option>
                                    <option value="$$$">Caro ($$$)</option>
                                    <option value="$$$$">Luxo ($$$$)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Endereço e Localização</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                <input
                                    type="text"
                                    value={location.cep}
                                    onChange={e => setLocation({ ...location, cep: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                <input
                                    type="text"
                                    value={location.city}
                                    onChange={e => setLocation({ ...location, city: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                                <input
                                    type="text"
                                    value={location.street}
                                    onChange={e => setLocation({ ...location, street: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                <input
                                    type="text"
                                    value={location.number}
                                    onChange={e => setLocation({ ...location, number: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                <input
                                    type="text"
                                    value={location.neighborhood}
                                    onChange={e => setLocation({ ...location, neighborhood: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                                <input
                                    type="text"
                                    value={location.complement}
                                    onChange={e => setLocation({ ...location, complement: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'hours' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Horário de Funcionamento</h3>
                        <div className="space-y-3">
                            {hours.map((day, index) => (
                                <div key={day.id} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                                    <div className="w-16 font-semibold text-gray-700">{day.label}</div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={day.isOpen}
                                            onChange={() => {
                                                const newHours = [...hours];
                                                newHours[index].isOpen = !newHours[index].isOpen;
                                                setHours(newHours);
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mesa-green"></div>
                                    </label>

                                    {day.isOpen ? (
                                        <div className="flex items-center gap-2 text-sm">
                                            <input
                                                type="time"
                                                value={day.open}
                                                onChange={(e) => {
                                                    const newHours = [...hours];
                                                    newHours[index].open = e.target.value;
                                                    setHours(newHours);
                                                }}
                                                className="px-2 py-1 border border-gray-200 rounded-lg outline-none focus:border-mesa-green"
                                            />
                                            <span className="text-gray-400">até</span>
                                            <input
                                                type="time"
                                                value={day.close}
                                                onChange={(e) => {
                                                    const newHours = [...hours];
                                                    newHours[index].close = e.target.value;
                                                    setHours(newHours);
                                                }}
                                                className="px-2 py-1 border border-gray-200 rounded-lg outline-none focus:border-mesa-green"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400 font-medium italic px-2">Fechado</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'finance' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Dados Bancários e Faturamento</h3>
                        <p className="text-gray-500">Gerencie seus dados de recebimento na página dedicada de <a href="/restaurant/finance" className="text-mesa-green underline">Faturamento</a>.</p>
                    </div>
                )}

                <div className="pt-8 border-t border-gray-100 mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        <Save size={20} />
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}

function TabButton({ id, label, icon: Icon, active, onClick }) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                ${active
                    ? 'bg-mesa-green text-white shadow-md shadow-green-200'
                    : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-200'}
            `}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}
