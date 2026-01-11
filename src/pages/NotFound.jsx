import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">Ops! 404</h1>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                Não conseguimos encontrar a página que você está procurando. Ela pode ter sido removida ou o link está quebrado.
            </p>

            <button
                onClick={() => navigate('/')}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <Home className="w-5 h-5" />
                Voltar para o Início
            </button>
        </div>
    );
}
