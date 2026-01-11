import { Ticket, Percent, DollarSign, Gift, Calendar } from 'lucide-react';

const DISCOUNT_TYPES = [
    { id: 'percent', label: 'Porcentagem', icon: Percent },
    { id: 'fixed', label: 'Valor Fixo', icon: DollarSign },
    { id: 'gift', label: 'Item Grátis', icon: Gift },
];

const DAYS = [
    { id: 'seg', label: 'S' },
    { id: 'ter', label: 'T' },
    { id: 'qua', label: 'Q' },
    { id: 'qui', label: 'Q' },
    { id: 'sex', label: 'S' },
    { id: 'sab', label: 'S' },
    { id: 'dom', label: 'D' }
];

export default function StepPromo({ data, updateData }) {

    // Ensure promo object exists
    const promo = data.promo || { type: 'percent', value: '', days: [], timeStart: '18:00', timeEnd: '23:00' };

    const updatePromo = (field, value) => {
        updateData('promo', { ...promo, [field]: value });
    };

    const toggleDay = (dayId) => {
        const currentDays = promo.days || [];
        if (currentDays.includes(dayId)) {
            updatePromo('days', currentDays.filter(d => d !== dayId));
        } else {
            updatePromo('days', [...currentDays, dayId]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Crie sua primeira promoção</h2>
                <p className="text-gray-500">Atraia clientes com um desconto especial</p>
            </div>

            {/* Type Selector */}
            <div className="grid grid-cols-3 gap-3">
                {DISCOUNT_TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => updatePromo('type', type.id)}
                        className={`
                            flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                            ${promo.type === type.id
                                ? 'bg-green-50 border-mesa-green text-mesa-green ring-1 ring-mesa-green'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}
                        `}
                    >
                        <type.icon size={24} />
                        <span className="text-sm font-semibold">{type.label}</span>
                    </button>
                ))}
            </div>

            {/* Value Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {promo.type === 'percent' ? 'Porcentagem de Desconto' :
                        promo.type === 'fixed' ? 'Valor do Desconto (R$)' : 'Qual item é grátis?'}
                </label>
                <div className="relative">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type={promo.type === 'gift' ? 'text' : 'number'}
                        value={promo.value}
                        onChange={(e) => updatePromo('value', e.target.value)}
                        placeholder={promo.type === 'percent' ? '20' : promo.type === 'fixed' ? '15,00' : 'Ex: Sobremesa'}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all font-bold text-lg"
                    />
                    {promo.type === 'percent' && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição / Regras</label>
                <textarea
                    value={promo.description}
                    onChange={(e) => updatePromo('description', e.target.value)}
                    placeholder="Ex: Válido para mesas acima de 2 pessoas..."
                    rows={2}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all resize-none"
                />
            </div>

            <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Dias Válidos</label>
                <div className="flex justify-between gap-2">
                    {DAYS.map((day) => {
                        const isSelected = (promo.days || []).includes(day.id);
                        return (
                            <button
                                key={day.id}
                                onClick={() => toggleDay(day.id)}
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${isSelected
                                        ? 'bg-mesa-green text-white shadow-md'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                                `}
                            >
                                {day.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário Início</label>
                    <input
                        type="time"
                        value={promo.timeStart}
                        onChange={(e) => updatePromo('timeStart', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário Fim</label>
                    <input
                        type="time"
                        value={promo.timeEnd}
                        onChange={(e) => updatePromo('timeEnd', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
