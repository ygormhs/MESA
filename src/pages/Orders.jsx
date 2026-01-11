import { Receipt, CheckCircle2, ChevronRight, DollarSign, Calendar } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { clsx } from 'clsx';

// Mock History Data
const HISTORY_ITEMS = [
    {
        id: '1234',
        restaurant: 'Fogão a Lenha',
        date: 'Ontem, 20:30',
        paid: 'R$ 78,00',
        saved: 'R$ 78,00',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '5678',
        restaurant: 'Sushi Arte',
        date: '05 Out, 19:15',
        paid: 'R$ 105,00',
        saved: 'R$ 105,00',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '9012',
        restaurant: 'Madero',
        date: '28 Set, 12:45',
        paid: 'R$ 98,50',
        saved: 'R$ 0,00',
        rating: null,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=1000'
    }
];

export default function History() {
    return (
        <div className="min-h-screen bg-background pb-28">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-lg font-bold">Histórico</h1>
                    <button className="p-2 -mr-2 text-muted-foreground hover:text-primary transition-colors">
                        <Receipt className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16" />

            {/* Content */}
            <div className="max-w-md mx-auto px-6 py-6 space-y-6">

                {/* Stats */}
                <div className="flex gap-4 mb-2">
                    <div className="flex-1 bg-white border border-border p-4 rounded-2xl shadow-sm">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2 block flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Total Visitas
                        </span>
                        <span className="text-2xl font-bold text-gray-900">24</span>
                    </div>
                    <div className="flex-1 bg-green-50 border border-green-100 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-3 opacity-10">
                            <DollarSign className="w-12 h-12 text-mesa-green" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-mesa-green tracking-wider mb-2 block flex items-center gap-1 relative z-10">
                            <DollarSign className="w-3 h-3" /> Economia Total
                        </span>
                        <span className="text-2xl font-extrabold text-mesa-green relative z-10">R$ 485,90</span>
                    </div>
                </div>

                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 pl-1">Visitas Recentes</h2>

                <div className="space-y-4">
                    {HISTORY_ITEMS.map((item) => (
                        <div key={item.id} className="bg-white border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex gap-4">
                                {/* Image */}
                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.restaurant} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-foreground truncate">{item.restaurant}</h3>
                                        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full whitespace-nowrap">
                                            {item.date}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Valor Pago</span>
                                            <span className="text-sm font-bold text-gray-900">{item.paid}</span>
                                        </div>

                                        {item.saved !== 'R$ 0,00' && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-mesa-green/80 font-bold uppercase tracking-wide">Economia</span>
                                                <span className="text-sm font-bold text-mesa-green">{item.saved}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Older / Load More */}
                <button className="w-full py-4 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mt-4">
                    Carregar mais antigo
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
