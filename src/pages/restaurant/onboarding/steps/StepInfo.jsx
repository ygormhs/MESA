import {
    Store, FileText, DollarSign, Utensils
} from 'lucide-react';

const PRICE_RANGES = [
    { value: '$', label: 'Barato' },
    { value: '$$', label: 'Moderado' },
    { value: '$$$', label: 'Caro' },
    { value: '$$$$', label: 'Sofisticado' }
];

const CUISINES = [
    { id: 'italiana', label: 'Italiana', emoji: '🍝' },
    { id: 'japonesa', label: 'Japonesa', emoji: '🍣' },
    { id: 'brasileira', label: 'Brasileira', emoji: '🇧🇷' },
    { id: 'americana', label: 'Americana', emoji: '🍔' },
    { id: 'pizza', label: 'Pizza', emoji: '🍕' },
    { id: 'cafe', label: 'Café', emoji: '☕' },
    { id: 'saudavel', label: 'Saudável', emoji: '🥗' },
    { id: 'doces', label: 'Doces', emoji: '🍰' },
    { id: 'bar', label: 'Bar', emoji: '🍺' },
    { id: 'vegetariana', label: 'Vegetariana', emoji: '🥦' }
];

export default function StepInfo({ data, updateData }) {
    const toggleCuisine = (id) => {
        const current = data.cuisines || [];
        if (current.includes(id)) {
            updateData('cuisines', current.filter(c => c !== id));
        } else {
            if (current.length < 3) {
                updateData('cuisines', [...current, id]);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Sobre seu restaurante</h2>
                <p className="text-gray-500">Conte um pouco sobre o seu negócio</p>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-4">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Restaurante *</label>
                    <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => updateData('name', e.target.value)}
                            placeholder="Ex: Trattoria Bella"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* CNPJ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ (Opcional)</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={data.cnpj}
                            onChange={(e) => updateData('cnpj', e.target.value)}
                            placeholder="00.000.000/0000-00"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => updateData('description', e.target.value)}
                        placeholder="Ex: A melhor massa italiana da região..."
                        rows={3}
                        maxLength={200}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all resize-none"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                        {data.description.length}/200
                    </div>
                </div>

                {/* Faixa de Preço */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Preço</label>
                    <div className="grid grid-cols-4 gap-2">
                        {PRICE_RANGES.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => updateData('priceRange', range.value)}
                                className={`
                                    py-2 px-3 rounded-lg border text-sm font-semibold transition-all
                                    ${data.priceRange === range.value
                                        ? 'bg-mesa-green text-white border-mesa-green shadow-md'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-mesa-green hover:text-mesa-green'}
                                `}
                            >
                                {range.value}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cuisines */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipos de Cozinha <span className="text-gray-400 font-normal">(Selecione até 3)</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {CUISINES.map((cuisine) => {
                            const isSelected = (data.cuisines || []).includes(cuisine.id);
                            return (
                                <button
                                    key={cuisine.id}
                                    onClick={() => toggleCuisine(cuisine.id)}
                                    className={`
                                        flex items-center gap-2 p-3 rounded-xl border transition-all text-left
                                        ${isSelected
                                            ? 'bg-green-50 border-mesa-green text-mesa-green'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                                    `}
                                >
                                    <span className="text-xl">{cuisine.emoji}</span>
                                    <span className="text-sm font-medium">{cuisine.label}</span>
                                    {isSelected && <Utensils size={14} className="ml-auto" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
