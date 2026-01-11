import { useState, useEffect } from 'react';
import { Download, Printer, Share2, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function QRCode() {
    const { user } = useAuth();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                const { data, error } = await supabase
                    .from('restaurants')
                    .select('*')
                    .eq('profile_id', user.id)
                    .single();

                if (error) throw error;
                setRestaurant(data);
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            } finally {
                setLoading(false);
            }
        }

        if (user) fetchRestaurant();
    }, [user]);

    if (loading) return <div>Carregando...</div>;
    if (!restaurant) return <div>Restaurante não encontrado.</div>;

    const qrData = `${window.location.origin}/validation/${restaurant.id}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">QR Code e Materiais</h1>
                <p className="text-gray-500">Baixe o código para seus clientes escanearem e ganharem descontos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main QR Display */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-64 h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}`}
                                alt="QR Code"
                                className="w-56 h-56"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
                        <p className="text-gray-500 max-w-md mb-6">
                            Este é o seu QR Code exclusivo. Imprima-o e coloque-o nas mesas ou no balcão para que seus clientes acumulem pontos.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-mesa-green text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                                <Download size={20} />
                                Baixar PNG
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                <Printer size={20} />
                                Imprimir PDF
                            </button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                        <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm">
                            <Info size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 mb-1">Como usar?</h3>
                            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                                <li>Imprima o QR Code em alta qualidade.</li>
                                <li>Coloque em acrílicos nas mesas ou próximo ao caixa.</li>
                                <li>Incentive os clientes a escanear para ver o cardápio e promoções.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Materials Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Materiais de Apoio</h3>
                        <div className="space-y-3">
                            <MaterialItem
                                title="Plaquinha de Mesa (A6)"
                                size="1.2 MB"
                                type="PDF"
                            />
                            <MaterialItem
                                title="Adesivo para Vitrine"
                                size="2.4 MB"
                                type="PDF"
                            />
                            <MaterialItem
                                title="Post para Instagram"
                                size="850 KB"
                                type="PNG"
                            />
                            <MaterialItem
                                title="Story Promocional"
                                size="1.5 MB"
                                type="PNG"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MaterialItem({ title, size, type }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                    {type}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-400">{size}</p>
                </div>
            </div>
            <button className="text-gray-400 hover:text-mesa-green">
                <Download size={18} />
            </button>
        </div>
    );
}
