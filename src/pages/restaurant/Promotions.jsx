import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Tag,
    Plus,
    Search,
    MoreVertical,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle2,
    PauseCircle
} from 'lucide-react';

const MOCK_PROMOTIONS = [
    {
        id: 1,
        title: 'Happy Hour 50% OFF',
        type: 'Desconto',
        value: '50%',
        status: 'active',
        days: ['Seg', 'Ter', 'Qua'],
        time: '18:00 - 20:00',
        analytics: { views: 1250, uses: 45 }
    },
    {
        id: 2,
        title: 'Sobremesa Grátis',
        type: 'Brinde',
        value: 'Item',
        status: 'active',
        days: ['Sex', 'Sab', 'Dom'],
        time: '12:00 - 15:00',
        analytics: { views: 890, uses: 32 }
    },
    {
        id: 3,
        title: 'Jantar Romântico',
        type: 'Desconto',
        value: '20%',
        status: 'paused',
        days: ['Qui'],
        time: '19:00 - 23:00',
        analytics: { views: 400, uses: 12 }
    },
    {
        id: 4,
        title: 'Almoço Executivo',
        type: 'Valor Fixo',
        value: 'R$ 15',
        status: 'expired',
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        time: '11:30 - 14:30',
        analytics: { views: 3500, uses: 420 }
    }
];

export default function Promotions() {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Promoções</h1>
                    <p className="text-gray-500">Gerencie suas ofertas e atraia mais clientes.</p>
                </div>
                <button
                    onClick={() => navigate('/restaurant/promotions/new')}
                    className="flex items-center gap-2 px-4 py-2 bg-mesa-green text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                >
                    <Plus size={20} />
                    Nova Promoção
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar promoção..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green outline-none"
                    />
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    {['all', 'active', 'paused', 'expired'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`
                                px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize
                                ${filter === tab
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'}
                            `}
                        >
                            {tab === 'all' ? 'Todas' : tab === 'active' ? 'Ativas' : tab === 'paused' ? 'Pausadas' : 'Expiradas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PROMOTIONS.filter(promo => filter === 'all' || promo.status === filter).map((promo) => (
                    <div key={promo.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className={`
                                    inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide mb-2
                                    ${promo.status === 'active' ? 'bg-green-100 text-green-700' :
                                        promo.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}
                                `}>
                                    {promo.status === 'active' ? <CheckCircle2 size={12} /> :
                                        promo.status === 'paused' ? <PauseCircle size={12} /> : <AlertCircle size={12} />}
                                    {promo.status === 'active' ? 'Ativa' : promo.status === 'paused' ? 'Pausada' : 'Expirada'}
                                </span>
                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{promo.title}</h3>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                <Tag size={16} className="text-gray-400" />
                                <span>{promo.type}: <strong>{promo.value}</strong></span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="truncate">{promo.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 gap-2">
                                <Clock size={16} className="text-gray-400" />
                                <span>{promo.time}</span>
                            </div>
                        </div>

                        {/* Footer / Analytics */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-500">
                                <strong className="text-gray-900 text-sm">{promo.analytics.uses}</strong> usos
                            </div>
                            <div className="text-xs text-gray-500">
                                <strong className="text-gray-900 text-sm">{promo.analytics.views}</strong> views
                            </div>
                            <button
                                onClick={() => navigate(`/restaurant/promotions/edit/${promo.id}`)}
                                className="text-sm font-semibold text-mesa-green hover:underline"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Card (Empty State-ish) */}
                <button
                    onClick={() => navigate('/restaurant/promotions/new')}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-mesa-green hover:text-mesa-green hover:bg-green-50/50 transition-all min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Plus size={24} />
                    </div>
                    <span className="font-semibold">Criar Nova Promoção</span>
                </button>
            </div>
        </div>
    );
}
