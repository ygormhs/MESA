import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle2, DollarSign, Store } from 'lucide-react';
import clsx from 'clsx';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Validation() {
    const { id } = useParams(); // This is the Restaurant ID
    const navigate = useNavigate();
    const { user } = useAuth();

    // Data
    const [restaurant, setRestaurant] = useState(null);
    const [loadingRestaurant, setLoadingRestaurant] = useState(true);

    // Inputs
    const [originalBill, setOriginalBill] = useState('');
    const [paidAmount, setPaidAmount] = useState('');

    // Feedback
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Loading State
    const [isSaving, setIsSaving] = useState(false);

    // Fetch Restaurant Details
    useEffect(() => {
        async function fetchRestaurant() {
            try {
                if (!id) return;
                const { data, error } = await supabase
                    .from('restaurants')
                    .select('id, name')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setRestaurant(data);
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            } finally {
                setLoadingRestaurant(false);
            }
        }
        fetchRestaurant();
    }, [id]);

    // Derived State
    const savings = useMemo(() => {
        const bill = parseFloat(originalBill) || 0;
        const paid = parseFloat(paidAmount) || 0;
        return Math.max(0, bill - paid);
    }, [originalBill, paidAmount]);

    // Validation
    const isFormValid = rating > 0 && originalBill > 0 && paidAmount > 0;

    const handleValidation = async () => {
        if (!isFormValid || !user || !restaurant) return;

        setIsSaving(true);
        console.log("Saving validation...", {
            user_id: user.id,
            restaurant_id: restaurant.id,
            savings,
            rating
        });

        try {
            const { error } = await supabase.from('validations').insert({
                user_id: user.id,
                restaurant_id: restaurant.id,
                total_bill_amount: parseFloat(originalBill),
                final_paid_amount: parseFloat(paidAmount),
                discount_amount: savings,
                rating: rating,
                review_comment: comment,
                validated_at: new Date().toISOString()
            });

            if (error) {
                console.error("Supabase Error:", error);
                throw error;
            }

            console.log("Validation saved successfully!");

            // Short delay to show success state before redirecting
            setTimeout(() => {
                navigate('/orders');
            }, 1000);

        } catch (error) {
            console.error('Error saving validation details:', error);
            alert('Erro ao salvar validação. Verifique o console.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loadingRestaurant) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-mesa-green border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">

            {/* Header com Nome do Restaurante */}
            <div className="bg-mesa-green text-white px-6 pt-12 pb-24 rounded-b-[40px] shadow-lg mb-[-60px] relative z-0 text-center">
                <h1 className="text-2xl font-bold mb-1">Validar Desconto</h1>
                <p className="text-white/80 text-sm">Confirme os dados para garantir sua economia</p>
            </div>

            <div className="flex-1 px-6 relative z-10 w-full max-w-md mx-auto">
                {/* Single Main Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col gap-6">

                    {/* Restaurant Identity */}
                    <div className="text-center border-b border-gray-100 pb-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto mb-3 flex items-center justify-center border border-gray-100 shadow-sm">
                            <Store className="w-8 h-8 text-mesa-green" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Você está em</p>
                        <h2 className="text-xl font-extrabold text-gray-900">{restaurant?.name || "Restaurante"}</h2>
                    </div>

                    {/* Inputs Section */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                                Valor Original
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
                                <input
                                    type="number"
                                    value={originalBill}
                                    onChange={(e) => setOriginalBill(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-gray-50 rounded-xl py-3 pl-12 pr-4 text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-mesa-green/20 focus:bg-white transition-all"
                                    inputMode="decimal"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                                Valor Pago
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">R$</span>
                                <input
                                    type="number"
                                    value={paidAmount}
                                    onChange={(e) => setPaidAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-green-50 rounded-xl py-3 pl-12 pr-4 text-lg font-bold text-mesa-green placeholder:text-green-200 focus:outline-none focus:ring-2 focus:ring-mesa-green/20 focus:bg-white transition-all"
                                    inputMode="decimal"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Savings Highlight */}
                    {(savings > 0) && (
                        <div className="bg-gradient-to-br from-mesa-green to-emerald-600 text-white p-4 rounded-xl shadow-inner flex items-center justify-between animate-in fade-in zoom-in duration-300">
                            <div>
                                <p className="text-green-100 text-xs font-medium uppercase">Economia Total</p>
                                <p className="text-2xl font-extrabold">R$ {savings.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/20 p-2 rounded-full">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    )}

                    {/* Rating Section (Merged) */}
                    <div className="pt-2 text-center">
                        <p className="text-sm font-bold text-gray-900 mb-3">Avalie sua experiência</p>
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-95 focus:outline-none hover:scale-110"
                                >
                                    <Star
                                        className={clsx(
                                            "w-9 h-9 transition-colors",
                                            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-100"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Comentário opcional..."
                            className="w-full bg-gray-50 rounded-xl p-3 text-sm text-gray-700 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-mesa-green/20 resize-none placeholder:text-gray-400"
                        />
                    </div>

                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-t border-gray-100 z-30 pb-safe">
                <button
                    onClick={handleValidation}
                    disabled={!isFormValid || isSaving}
                    className="w-full bg-mesa-green text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-green-200 hover:shadow-xl hover:bg-green-600 hover:scale-[1.01] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSaving ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Confirmar Validação
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
