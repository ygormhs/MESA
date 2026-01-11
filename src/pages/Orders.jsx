import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Receipt, CheckCircle2, ChevronRight, DollarSign, Calendar } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function History() {
    const { user } = useAuth();
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ visits: 0, saved: 0 });

    useEffect(() => {
        async function fetchHistory() {
            try {
                const { data, error } = await supabase
                    .from('validations')
                    .select(`
                        id,
                        created_at,
                        total_bill_amount,
                        final_paid_amount,
                        discount_amount,
                        restaurants (id, name, logo_url)
                    `)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setHistoryItems(data);

                // Calculate stats
                const totalVisits = data.length;
                const totalSaved = data.reduce((acc, item) => acc + (item.discount_amount || 0), 0);
                setStats({ visits: totalVisits, saved: totalSaved });

            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        }

        if (user) fetchHistory();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 pb-28">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="w-full px-6 h-16 flex items-center justify-between max-w-lg mx-auto">
                    <h1 className="text-lg font-bold text-gray-900">Histórico de Pedidos</h1>
                    <button className="p-2 -mr-2 text-gray-500 hover:text-mesa-green transition-colors">
                        <Receipt className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16" />

            {/* Content */}
            <div className="w-full px-4 py-6 space-y-6 max-w-lg mx-auto">

                {/* Stats */}
                <div className="flex gap-4 mb-2">
                    <div className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 block flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Total Visitas
                        </span>
                        <span className="text-2xl font-bold text-gray-900">{stats.visits}</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-mesa-green to-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-green-200 relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-3 opacity-20">
                            <DollarSign className="w-12 h-12 text-white" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-green-100 tracking-wider mb-2 block flex items-center gap-1 relative z-10">
                            <DollarSign className="w-3 h-3" /> Economia Total
                        </span>
                        <span className="text-2xl font-extrabold text-white relative z-10">
                            R$ {stats.saved.toFixed(2)}
                        </span>
                    </div>
                </div>

                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Visitas Recentes</h2>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-10 text-gray-400">Carregando histórico...</div>
                    ) : historyItems.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-400 mb-2">Nenhuma visita ainda.</p>
                            <button className="text-mesa-green font-bold text-sm">Explorar Restaurantes</button>
                        </div>
                    ) : (
                        historyItems.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex gap-4">
                                    {/* Image Placeholder */}
                                    <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center text-gray-300 font-bold text-xl uppercase">
                                        {item.restaurants?.name?.charAt(0) || 'R'}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-gray-900 truncate">{item.restaurants?.name || 'Restaurante'}</h3>
                                            <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
                                                {format(new Date(item.created_at), "dd MMM, HH:mm", { locale: ptBR })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Pago</span>
                                                <span className="text-sm font-bold text-gray-900">R$ {item.final_paid_amount.toFixed(2)}</span>
                                            </div>

                                            {item.discount_amount > 0 && (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] text-mesa-green font-bold uppercase tracking-wide">Economia</span>
                                                    <span className="text-sm font-bold text-mesa-green">R$ {item.discount_amount.toFixed(2)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
