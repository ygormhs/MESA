import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { BackgroundGradientAnimation } from '../components/ui/BackgroundGradientAnimation';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { user } = await login({ email, password });

            // Check role to redirect correctly
            // We can check the metadata first as it's faster and usually sufficient
            // But for safety, let's fetch the profile if needed, or rely on AuthContext if it updated fast enough.
            // Since AuthContext updates asynchronously, we'll manually fetch the role here for immediate redirect.

            // Try enabling metadata first
            // const role = user.user_metadata?.role; 

            // Or better, since we have the session:
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role === 'restaurant') {
                navigate('/restaurant');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error(error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundGradientAnimation
            className="flex items-center justify-center p-6"
        // Default Mesa colors are already set in the component defaults, but we can explicit them if needed.
        // Using component defaults which are tuned for Mesa.
        >
            {/* Glass Card */}
            <div className="relative w-full max-w-sm bg-white/30 backdrop-blur-2xl border border-white/50 shadow-xl rounded-3xl p-8 z-10">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Bem-vindo(a)</h1>
                    <p className="text-gray-600 font-medium text-sm">Faça login na sua conta Mesa</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">E-mail</label>
                        <div className="relative group">
                            <Mail className="absolute left-0 top-3 w-5 h-5 text-gray-400 group-focus-within:text-mesa-green transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-transparent border-b-2 border-gray-300 py-2.5 pl-8 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-mesa-green transition-all font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Senha</label>
                            <Link to="/forgot-password" className="text-xs font-medium text-mesa-green hover:underline">Esqueceu?</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-0 top-3 w-5 h-5 text-gray-400 group-focus-within:text-mesa-green transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent border-b-2 border-gray-300 py-2.5 pl-8 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-mesa-green transition-all font-medium"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 rounded border-gray-300 text-mesa-green focus:ring-mesa-green/20"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600 font-medium cursor-pointer select-none">Lembrar de mim</label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Entrar
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Não tem uma conta?{' '}
                        <Link to="/register" className="text-mesa-green font-bold hover:underline">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}
