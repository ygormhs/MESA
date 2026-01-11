import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { X, Zap, QrCode } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Scanner() {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [flashlight, setFlashlight] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    const videoConstraints = {
        facingMode: "environment"
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // Create an image object to draw onto a canvas
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    console.log("Found QR code", code.data);
                    handleScan(code.data);
                }
            };
        }
    }, [webcamRef]);

    // Loop for scanning
    useEffect(() => {
        const interval = setInterval(() => {
            if (!scannedData) {
                capture();
            }
        }, 500); // Scan every 500ms
        return () => clearInterval(interval);
    }, [capture, scannedData]);

    const handleScan = (data) => {
        if (data && !scannedData) {
            // Check if it matches our expected URL format
            // Expected: https://mesa.app/validation/:id or just mesa.app/validation/:id
            // Flexible check: Look for "validation/" segment regardless of domain
            if (data.includes('/validation/')) {
                setScannedData(data);

                // robust split to handle different url structures
                const parts = data.split('/validation/');
                const restaurantId = parts[1];

                if (restaurantId) {
                    // Small vibrate for feedback
                    if (navigator.vibrate) navigator.vibrate(200);
                    navigate(`/validation/${restaurantId}`);
                }
            } else {
                console.log("Ignored QR Code:", data);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-between relative overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <X className="w-6 h-6" />
                </button>
                <h1 className="text-white font-bold text-lg tracking-wide">Escanear QR Code</h1>
                <button
                    onClick={() => setFlashlight(!flashlight)}
                    className={`p-2 rounded-full transition-all ${flashlight ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}
                >
                    <Zap className="w-6 h-6" fill={flashlight ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Camera Viewfinder Area */}
            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="w-full h-full object-cover"
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
            <div className="w-full bg-black p-8 pb-32 z-20 rounded-t-3xl -mt-6 text-center">
                <p className="text-gray-500 text-sm">O código será lido automaticamente</p>
            </div>

            <BottomNav />
        </div>
    );
}
