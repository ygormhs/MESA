import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, DollarSign, Tag, Info } from 'lucide-react';
import { DualRangeSlider } from '../../components/DualRangeSlider';

const DAYS_OF_WEEK = [
    { id: 'Seg', label: 'Segunda' },
    { id: 'Ter', label: 'Terça' },
    { id: 'Qua', label: 'Quarta' },
    { id: 'Qui', label: 'Quinta' },
    { id: 'Sex', label: 'Sexta' },
    { id: 'Sab', label: 'Sábado' },
    { id: 'Dom', label: 'Domingo' },
];

const PROMO_TYPES = [
    { id: 'percentage', label: 'Porcentagem (%)' },
    { id: 'fixed', label: 'Valor Fixo (R$)' },
    { id: 'gift', label: 'Brinde / Item Grátis' },
];

export default function PromotionForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'percentage',
        value: '',
        days: [],
        timeRange: [18, 22], // 18:00 - 22:00 default
        status: 'active',
        conditions: ''
    });

    useEffect(() => {
        if (isEditing) {
            // Simulate fetching data
            // In a real app, fetch from ID
            /*
            if (id === '1') {
                setFormData({
                    title: 'Happy Hour 50% OFF',
                    description: 'Desconto em todas as bebidas e porções.',
                    type: 'percentage',
                    value: '50',
                    days: ['Seg', 'Ter', 'Qua'],
                    timeRange: [18, 20],
                    status: 'active',
                    conditions: 'Válido apenas para consumo no local.'
                });
            }
            */
        }
    }, [isEditing, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleDay = (dayId) => {
        setFormData(prev => {
            const days = prev.days.includes(dayId)
                ? prev.days.filter(d => d !== dayId)
                : [...prev.days, dayId];
            return { ...prev, days };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Promotion:', formData);
        // Add save logic here
        navigate('/restaurant/promotions');
    };

    const formatTime = (hour) => {
        return `${hour.toString().padStart(2, '0')}:00`;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/restaurant/promotions')}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Editar Promoção' : 'Nova Promoção'}
                    </h1>
                    <p className="text-gray-500">
                        {isEditing ? 'Atualize os detalhes da sua oferta.' : 'Crie uma nova oferta para atrair clientes.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Basic Info */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Info size={20} className="text-mesa-green" />
                            Informações Básicas
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Promoção</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ex: Happy Hour, Jantar a Dois..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Descreva o que está incluso..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none min-h-[100px]"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Discount Rules */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Tag size={20} className="text-mesa-green" />
                            Regras do Desconto
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Desconto</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none bg-white"
                                >
                                    {PROMO_TYPES.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {formData.type === 'percentage' ? 'Porcentagem de Desconto' :
                                        formData.type === 'fixed' ? 'Valor do Desconto (R$)' : 'Item Oferecido'}
                                </label>
                                <div className="relative">
                                    {formData.type === 'fixed' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">R$</span>}
                                    <input
                                        type={formData.type === 'gift' ? 'text' : 'number'}
                                        name="value"
                                        value={formData.value}
                                        onChange={handleChange}
                                        placeholder={formData.type === 'percentage' ? 'Ex: 20' : formData.type === 'fixed' ? '0,00' : 'Ex: Sobremesa'}
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none ${formData.type === 'fixed' ? 'pl-10' : ''}`}
                                        required
                                    />
                                    {formData.type === 'percentage' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Condições / Regras (Opcional)</label>
                            <input
                                type="text"
                                name="conditions"
                                value={formData.conditions}
                                onChange={handleChange}
                                placeholder="Ex: Válido para consumo acima de R$ 100"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none text-sm"
                            />
                        </div>
                    </section>

                </div>

                {/* Sidebar Config (Schedule & Status) */}
                <div className="space-y-6">

                    {/* Schedule */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Clock size={20} className="text-mesa-green" />
                            Dias e Horários
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Dias da Semana</label>
                            <div className="flex flex-wrap gap-2">
                                {DAYS_OF_WEEK.map(day => (
                                    <button
                                        key={day.id}
                                        type="button"
                                        onClick={() => toggleDay(day.id)}
                                        className={`
                                            px-3 py-1.5 rounded-lg text-sm font-semibold transition-all
                                            ${formData.days.includes(day.id)
                                                ? 'bg-mesa-green text-white shadow-md shadow-green-200 scale-105'
                                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                                        `}
                                    >
                                        {day.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Horário: {formatTime(formData.timeRange[0])} às {formatTime(formData.timeRange[1])}
                            </label>
                            <div className="px-2 pb-4 pt-2">
                                <DualRangeSlider
                                    min={0}
                                    max={24}
                                    step={1}
                                    value={formData.timeRange}
                                    onChange={(val) => setFormData(courses => ({ ...courses, timeRange: val }))}
                                />
                            </div>
                            <p className="text-xs text-gray-400 text-center">Arraste para ajustar o período válido.</p>
                        </div>
                    </section>

                    {/* Status Publish */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 sticky top-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Status</h2>
                            <div className={`
                                px-3 py-1 rounded-full text-xs font-bold uppercase
                                ${formData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                             `}>
                                {formData.status === 'active' ? 'Ativa' : 'Pausada'}
                            </div>
                        </div>

                        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, status: 'active' }))}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.status === 'active' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                            >
                                Ativar
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, status: 'paused' }))}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.status === 'paused' ? 'bg-white shadow-sm text-yellow-700' : 'text-gray-500'}`}
                            >
                                Pausar
                            </button>
                        </div>

                        <hr className="border-gray-100" />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            <Save size={20} />
                            Salvar Alterações
                        </button>
                    </section>

                </div>
            </form>
        </div>
    );
}
