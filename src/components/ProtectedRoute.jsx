import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }) {
    const { session, loading } = useAuth();

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-background text-primary">Carregando...</div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
