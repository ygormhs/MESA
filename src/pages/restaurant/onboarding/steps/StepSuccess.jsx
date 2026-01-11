import { Download, CheckCircle, ChevronRight, QrCode } from 'lucide-react';

export default function StepSuccess({ data }) {

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mesa.app/restaurant/${data.name}`;

    return (
        <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 text-mesa-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} strokeWidth={3} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tudo pronto! 🎉</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                O <strong>{data.name || 'Seu Restaurante'}</strong> já está cadastrado no Mesa.
                Sua promoção de <strong>{data.promo?.value} {data.promo?.type === 'percent' ? '%' : ''} OFF</strong> já está configurada.
            </p>

            {/* QR Code Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-xs mx-auto mb-8">
                <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group">
                    {/* QR Code Image */}
                    <img
                        src={qrUrl}
                        alt="QR Code"
                        className="w-full h-full object-contain p-4 mix-blend-multiply"
                    />
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                    <Download size={18} />
                    Baixar QR Code
                </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl text-left max-w-lg mx-auto mb-8">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="bg-blue-200 w-5 h-5 rounded-full flex items-center justify-center text-xs">i</span>
                    Próximos passos
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-blue-500" />
                        Imprima o QR Code e coloque em local visível
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-blue-300 rounded-full"></span>
                        Complete o cadastro do cardápio (opcional)
                    </li>
                </ul>
            </div>
        </div>
    );
}
