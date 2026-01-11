import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import clsx from 'clsx';
import { BottomNav } from '../components/BottomNav';

export default function Validation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0); // 0-5 stars
    const [comment, setComment] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    // Mock Data for the scanned restaurant validation
    const validationData = {
        restaurantName: "Trattoria Bella",
        date: "Hoje, 20:30",
        originalBill: 156.00,
        paidAmount: 78.00,
        savedAmount: 78.00,
        isFirstVisit: true,
    };

    const handleValidation = () => {
        if (rating === 0) {
            alert("Por favor, avalie sua experiência com estrelas.");
            return;
        }

        setIsValidating(true);
        // Simulate API call
        setTimeout(() => {
            setIsValidating(false);
            // Navigate to History page (Orders tab)
            navigate('/orders');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">

            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-8 h-8 text-mesa-green" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Validação com Sucesso!</h1>
                <p className="text-muted-foreground text-sm">Mostre esta tela para o garçom</p>
            </div>

            <div className="flex-1 px-6 py-6 space-y-6">

                {/* Validation Ticket Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle2 className="w-32 h-32 text-mesa-green" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{validationData.restaurantName}</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                                <span className="text-gray-500 text-sm">Conta Original</span>
                                <span className="text-gray-900 font-medium line-through">R$ {validationData.originalBill.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                                <span className="text-gray-500 text-sm">Valor Pago</span>
                                <span className="text-xl font-bold text-gray-900">R$ {validationData.paidAmount.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-mesa-green" />
                                    <span className="text-mesa-green font-bold text-sm">Você economizou</span>
                                </div>
                                <span className="text-2xl font-extrabold text-mesa-green">R$ {validationData.savedAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        {validationData.isFirstVisit && (
                            <div className="mt-4 flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 py-2 rounded-lg text-xs font-bold uppercase tracking-wide">
                                <Star className="w-3 h-3 fill-current" /> Primeira Visita
                            </div>
                        )}
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Como foi sua experiência?</h3>

                    {/* Stars */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-95 hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    className={clsx(
                                        "w-8 h-8 transition-colors",
                                        star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-100"
                                    )}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Optional Comment */}
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Escreva um comentário (opcional)..."
                            className="w-full h-24 bg-gray-50 rounded-xl p-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none border-none"
                        />
                        <span className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium">OPCIONAL</span>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-t border-gray-100 pb-8 z-30">
                <button
                    onClick={handleValidation}
                    disabled={isValidating}
                    className="w-full bg-primary text-white h-14 rounded-xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isValidating ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Confirmar & Finalizar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
