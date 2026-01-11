import {
    CreditCard,
    Download,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Calendar
} from 'lucide-react';

const TRANSACTIONS = [
    { id: 1, date: '10 Jan 2024', desc: 'Assinatura Plano Pro', amount: '-R$ 149,90', type: 'debit', status: 'paid' },
    { id: 2, date: '08 Jan 2024', desc: 'Repasse Semanal (Mesa)', amount: '+R$ 1.250,00', type: 'credit', status: 'completed' },
    { id: 3, date: '01 Jan 2024', desc: 'Repasse Semanal (Mesa)', amount: '+R$ 980,50', type: 'credit', status: 'completed' },
    { id: 4, date: '10 Dez 2023', desc: 'Assinatura Plano Pro', amount: '-R$ 149,90', type: 'debit', status: 'paid' },
];

export default function Finance() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
                <p className="text-gray-500">Acompanhe seus repasses e faturas.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FinanceCard
                    title="Saldo Disponível"
                    value="R$ 352,00"
                    desc="Próximo repasse em 15 Jan"
                    icon={DollarSign}
                    color="text-green-600"
                    bg="bg-green-50"
                />
                <FinanceCard
                    title="Próxima Fatura"
                    value="R$ 149,90"
                    desc="Vence em 10 Fev"
                    icon={CreditCard}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <FinanceCard
                    title="Total Repassado (Mês)"
                    value="R$ 4.230,00"
                    desc="+12% que mês passado"
                    icon={TrendingUp}
                    color="text-purple-600"
                    bg="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Transaction History */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Histórico de Transações</h3>
                        <button className="text-sm font-semibold text-mesa-green hover:underline">Baixar Extrato</button>
                    </div>

                    <div className="space-y-4">
                        {TRANSACTIONS.map(tx => (
                            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center
                                        ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                                     `}>
                                        {tx.type === 'credit' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{tx.desc}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Calendar size={12} />
                                            {tx.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                        {tx.amount}
                                    </p>
                                    <span className="text-xs text-gray-500 capitalize">{tx.status === 'paid' ? 'Pago' : 'Recebido'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account & Payment Method */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Dados Bancários</h3>
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Banco</span>
                                <span className="font-semibold text-gray-900">Nubank (260)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Agência</span>
                                <span className="font-semibold text-gray-900">0001</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Conta</span>
                                <span className="font-semibold text-gray-900">123456-7</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Titular</span>
                                <span className="font-semibold text-gray-900">Trattoria Bella LTDA</span>
                            </div>
                        </div>
                        <button className="w-full py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            Alterar Conta
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Forma de Pagamento</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xs">
                                VISA
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">•••• 4242</p>
                                <p className="text-xs text-gray-500">Expira em 12/28</p>
                            </div>
                        </div>
                        <button className="text-sm text-mesa-green font-semibold hover:underline">
                            Gerenciar Cartões
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FinanceCard({ title, value, desc, icon: Icon, color, bg }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${bg} ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="text-gray-500 font-medium text-sm">{title}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-xs text-gray-400">{desc}</p>
        </div>
    );
}
