import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const DATA = [
    { name: 'Seg', value: 400 },
    { name: 'Ter', value: 300 },
    { name: 'Qua', value: 550 },
    { name: 'Qui', value: 450 },
    { name: 'Sex', value: 850 },
    { name: 'Sab', value: 1200 },
    { name: 'Dom', value: 900 },
];

const RECENT_VALIDATIONS = [
    { id: 1, user: 'Maria Silva', code: '#VALID-8842', time: '12:30', amount: 'R$ 145,00', status: 'success' },
    { id: 2, user: 'João Santos', code: '#VALID-9211', time: '13:15', amount: 'R$ 89,90', status: 'success' },
    { id: 3, user: 'Ana Costa', code: '#VALID-3321', time: '13:42', amount: 'R$ 210,50', status: 'success' },
    { id: 4, user: 'Pedro Oliveira', code: '#VALID-1122', time: '14:05', amount: 'R$ 65,00', status: 'pending' },
];

export default function RestaurantDashboard() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
                <p className="text-gray-500">Acompanhe o desempenho do seu restaurante hoje.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Faturamento Hoje"
                    value="R$ 1.245,00"
                    trend="+12%"
                    icon={DollarSign}
                    trendUp={true}
                />
                <MetricCard
                    title="Validações"
                    value="32"
                    trend="+5"
                    icon={Users}
                    trendUp={true}
                />
                <MetricCard
                    title="Ticket Médio"
                    value="R$ 85,40"
                    trend="-2%"
                    icon={TrendingUp}
                    trendUp={false}
                />
                <MetricCard
                    title="Visualizações"
                    value="1.4k"
                    trend="+18%"
                    icon={BarChart3}
                    trendUp={true}
                />
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Movimento Semanal</h3>
                        <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1 outline-none">
                            <option>Esta Semana</option>
                            <option>Semana Passada</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Validations */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Validações Recentes</h3>
                        <button className="text-sm text-mesa-green font-semibold hover:underline">Ver todas</button>
                    </div>
                    <div className="space-y-4">
                        {RECENT_VALIDATIONS.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                        {item.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{item.user}</p>
                                        <p className="text-xs text-gray-500">{item.time} • {item.code}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${item.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {item.status === 'success' ? 'Confirmado' : 'Pendente'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-mesa-green hover:text-mesa-green transition-colors flex items-center justify-center gap-2">
                        <span className="text-xl">+</span> Validar Novo Código
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, icon: Icon, trendUp }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <Icon size={20} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                </button>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                        {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {trend}
                    </div>
                </div>
            </div>
        </div>
    );
}
