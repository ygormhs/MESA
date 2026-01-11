import { Image, Upload, X } from 'lucide-react';

export default function StepPhotos({ data, updateData }) {

    // Simulate upload by just adding a placeholder string
    const handleUpload = () => {
        const newPhoto = `https://source.unsplash.com/random/800x600?restaurant&sig=${data.photos.length}`;
        updateData('photos', [...data.photos, newPhoto]);
    };

    const removePhoto = (index) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);
        updateData('photos', newPhotos);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Fotos do Restaurante</h2>
                <p className="text-gray-500">Boas fotos atraem muito mais clientes!</p>
            </div>

            {/* Dropzone Area */}
            <div
                className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={handleUpload}
            >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Upload className="text-mesa-green" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Clique para adicionar fotos</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                    JPG ou PNG. Recomendamos fotos do ambiente e dos pratos principais.
                </p>
            </div>

            {/* Photo Grid */}
            {data.photos.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 block">Fotos Adicionadas ({data.photos.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {data.photos.map((photo, index) => (
                            <div key={index} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                <img src={photo} alt={`Photo ${index}`} className="w-full h-full object-cover" />

                                <button
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>

                                {index === 0 && (
                                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                        Capa
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
