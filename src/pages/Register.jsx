import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Utensils } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';
import { BackgroundGradientAnimation } from '../components/ui/BackgroundGradientAnimation';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth(); // We'll auto-login after register

    // Role selection
    const [role, setRole] = useState('client'); // 'client' | 'restaurant'

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register({ email, password, name, role });
            if (role === 'restaurant') {
                navigate('/onboarding');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar conta. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BackgroundGradientAnimation className="flex items-center justify-center p-6 bg-[#E8E8E8]">
            {/* Glass Card */}
            <div className="relative w-full max-w-sm bg-white/30 backdrop-blur-2xl border border-white/50 shadow-xl rounded-3xl p-8 z-10">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-2">Criar Conta</h1>
                    <p className="text-gray-600 font-medium text-sm">Junte-se ao Mesa e descubra experiências.</p>
                </div>

                {/* Role Toggle */}
                <div className="bg-white/40 p-1 rounded-xl flex mb-6 border border-white/50">
                    <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={clsx(
                            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                            role === 'client' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <User className="w-4 h-4" />
                        Cliente
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('restaurant')}
                        className={clsx(
                            "flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2",
                            role === 'restaurant' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Utensils className="w-4 h-4" />
                        Restaurante
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Name Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nome Completo</label>
                        <div className="relative group">
                            <User className="absolute left-0 top-3 w-5 h-5 text-gray-400 group-focus-within:text-mesa-green transition-colors" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                className="w-full bg-transparent border-b-2 border-gray-300 py-2.5 pl-8 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-mesa-green transition-all font-medium"
                                required
                            />
                        </div>
                    </div>

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
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Senha</label>
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

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-mesa-green hover:bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Criar Conta
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-mesa-green font-bold hover:underline">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
}
