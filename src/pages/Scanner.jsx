import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'react-camera-pro';
import { X, Zap, QrCode } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Scanner() {
    const navigate = useNavigate();
    const camera = useRef(null);
    const [flashlight, setFlashlight] = useState(false);

    const handleMockScan = () => {
        // Simulate a successful scan of restaurant ID '1'
        navigate('/validation/1');
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-between relative overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <X className="w-6 h-6" />
                </button>
                <h1 className="text-white font-bold text-lg tracking-wide">Escanear QR Code</h1>
                <button onClick={() => setFlashlight(!flashlight)} className={`p-2 rounded-full transition-all ${flashlight ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}>
                    <Zap className="w-6 h-6" fill={flashlight ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <Camera
                        ref={camera}
                        aspectRatio={16 / 9}
                        facingMode="environment"
                        errorMessages={{
                            noCameraAccessible: 'Nenhuma câmera encontrada',
                            permissionDenied: 'Permissão para usar a câmera negada',
                            switchCamera: 'Não é possível trocar de câmera',
                            canvas: 'Canvas não suportado'
                        }}
                    />
                </div>

                {/* Scannner Overlay Frame */}
                <div className="relative z-10 w-64 h-64 border-2 border-white/50 rounded-3xl flex flex-col items-center justify-center pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-mesa-green rounded-tl-xl -mt-1 -ml-1"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-mesa-green rounded-tr-xl -mt-1 -mr-1"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-mesa-green rounded-bl-xl -mb-1 -ml-1"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-mesa-green rounded-br-xl -mb-1 -mr-1"></div>

                    <div className="animate-pulse bg-mesa-green/20 w-full h-1 absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
                </div>

                <p className="absolute bottom-32 z-20 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none">
                    Aponte para o QR Code do restaurante
                </p>
            </div>

            {/* Bottom Controls */}
            <div className="w-full bg-black p-8 pb-32 z-20 rounded-t-3xl -mt-6">
                <div className="flex justify-center items-center gap-8">
                    {/* Mock Trigger for Dev/Demo */}
                    <button
                        onClick={handleMockScan}
                        className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        <QrCode className="w-8 h-8 text-black" />
                    </button>
                    <p className="absolute bottom-12 text-white/30 text-xs">Simular Scan</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
