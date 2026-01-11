import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center font-sans">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Ops! Ocorreu um erro.</h1>
                    <p className="text-gray-600 mb-6 max-w-md">
                        O aplicativo encontrou um problema inesperado. Tente recarregar a página.
                    </p>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm max-w-lg w-full overflow-auto text-left">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Detalhes do Erro:</p>
                        <code className="text-xs text-red-500 font-mono block break-words">
                            {this.state.error?.message || "Erro desconhecido"}
                        </code>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                    >
                        Recarregar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
