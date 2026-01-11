import { CheckCircle2, Clock } from 'lucide-react';

export function DiscountCard({ discount, description, schedule, status = 'active' }) {
    return (
        <div className="bg-green-50/50 border border-green-100 rounded-2xl p-5 relative overflow-hidden">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 animate-in fade-in">
                {status === 'active' ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Ativo agora
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-full">
                        <Clock size={10} />
                        Disponível às 18h
                    </div>
                )}
            </div>

            <p className="text-[10px] font-bold text-green-700 tracking-wider uppercase mb-1">Desconto Disponível</p>

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-mesa-orange tracking-tight">{discount}</span>
                <span className="text-sm font-bold text-green-800 opacity-80 uppercase">{description}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white/60 px-3 py-1.5 rounded-lg inline-flex">
                <Clock size={14} className="text-green-600" />
                {schedule}
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-100/50 rounded-full blur-2xl"></div>
        </div>
    );
}
