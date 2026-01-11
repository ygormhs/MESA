import { MapPin, Search, Navigation } from 'lucide-react';

export default function StepLocation({ data, updateData }) {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Onde fica seu restaurante?</h2>
                <p className="text-gray-500">Ajude os clientes a te encontrarem</p>
            </div>

            <div className="space-y-4">
                {/* CEP and Auto-Fill Row */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={data.cep}
                                onChange={(e) => updateData('cep', e.target.value)}
                                placeholder="00000-000"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 whitespace-nowrap">
                        Buscar
                    </button>
                </div>

                {/* Street and Number */}
                <div className="flex gap-4">
                    <div className="flex-[3]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Avenida</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => updateData('address', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                        <input
                            type="text"
                            value={data.number}
                            onChange={(e) => updateData('number', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Complement and Neighborhood */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                        <input
                            type="text"
                            value={data.complement}
                            onChange={(e) => updateData('complement', e.target.value)}
                            placeholder="Apto, Sala, etc"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                        <input
                            type="text"
                            value={data.neighborhood}
                            onChange={(e) => updateData('neighborhood', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* City and State */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => updateData('city', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <input
                            type="text"
                            value={data.state}
                            onChange={(e) => updateData('state', e.target.value)}
                            placeholder="UF"
                            maxLength={2}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mesa-green focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Map Preview */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localização no Mapa</label>
                    <div className="relative h-48 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center group">
                        {/* Placeholder Map Image */}
                        <div className="absolute inset-0 bg-gray-200"
                            style={{
                                backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin className="text-mesa-orange drop-shadow-md pb-6" size={48} fill="currentColor" />
                        </div>

                        <button className="absolute bottom-4 right-4 bg-white shadow-md text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <Navigation size={16} /> Adjust Pin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
