import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle2, DollarSign, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
// import { BottomNav } from '../components/BottomNav'; // Not needed if full screen flow

export default function Validation() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Inputs
    const [originalBill, setOriginalBill] = useState('');
    const [paidAmount, setPaidAmount] = useState('');

    // Feedback
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // Loading State
    const [isValidating, setIsValidating] = useState(false);

    // Derived State
    const savings = useMemo(() => {
        const bill = parseFloat(originalBill) || 0;
        const paid = parseFloat(paidAmount) || 0;
        return Math.max(0, bill - paid);
    }, [originalBill, paidAmount]);

    // Validation
    const isFormValid = rating > 0 && originalBill > 0 && paidAmount > 0;

    const handleValidation = () => {
        if (!isFormValid) return;

        setIsValidating(true);
        // Simulate API call to save validation
        setTimeout(() => {
            setIsValidating(false);
            navigate('/orders'); // Redirect to History
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">

            {/* Header / Brand Area */}
            <div className="bg-white px-6 pt-8 pb-4 border-b border-gray-100 text-center">
                <h1 className="text-xl font-bold text-gray-900">Validar Desconto</h1>
                <p className="text-sm text-gray-500">Insira os valores da conta para confirmar</p>
            </div>

            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">

                {/* Main Card: Values & Savings */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6 relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <div className="absolute -top-10 -right-10 pointer-events-none opacity-[0.03]">
                        <DollarSign className="w-64 h-64 text-mesa-green" />
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 relative z-10">
                        {/* Original Bill */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                                Valor Original da Conta
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

                        {/* Paid Amount */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
                                Valor Pago (Com Desconto)
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

                    {/* Savings Display (Auto-calculated) */}
                    {(savings > 0) && (
                        <div className="bg-gradient-to-br from-mesa-green to-emerald-600 text-white p-5 rounded-2xl shadow-green flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div>
                                <p className="text-green-100 text-xs font-medium uppercase tracking-wide">Você economizou</p>
                                <p className="text-3xl font-extrabold tracking-tight">R$ {savings.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Rating Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 text-center">Como foi sua experiência?</h3>
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-95 hover:scale-110 focus:outline-none"
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

                    {/* Optional Comment */}
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Deixe um elogio ou sugestão..."
                            className="w-full h-20 bg-gray-50 rounded-xl p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-mesa-green/20 resize-none"
                        />
                    </div>
                </div>

            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 w-full bg-white p-6 border-t border-gray-100 z-30 pb-safe">
                <button
                    onClick={handleValidation}
                    disabled={!isFormValid || isValidating}
                    className="w-full bg-gray-900 text-white h-14 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isValidating ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Confirmar Economia
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
