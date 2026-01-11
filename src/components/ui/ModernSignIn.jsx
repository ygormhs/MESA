import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, ArrowRight, UserPlus } from "lucide-react";

export function ModernSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Por favor, preencha email e senha.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Por favor, insira um email válido.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const { error } = await signIn({ email, password });
            if (error) throw error;
        } catch (err) {
            setError("Falha no login: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden w-full">

            {/* Background Ambience - Light Mode */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-mesa-green/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-mesa-orange/10 rounded-full blur-[100px] opacity-40 animate-pulse delay-1000"></div>
            </div>

            {/* Centered glass card - Light Glass */}
            <div className="relative z-10 w-full max-w-sm rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-primary/5 p-8 flex flex-col items-center">

                {/* Logo */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 mb-6 shadow-soft text-primary">
                    <ChefHat className="w-8 h-8" />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-foreground mb-2 text-center tracking-tight">
                    Mesa
                </h2>
                <p className="text-muted-foreground text-sm mb-8 text-center font-medium">
                    Acesse sua conta para continuar
                </p>

                {/* Form */}
                <div className="flex flex-col w-full gap-4">
                    <div className="w-full flex flex-col gap-3">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-200 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all hover:border-gray-300"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                        />
                        <input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            className="w-full px-5 py-3.5 rounded-xl bg-white border border-gray-200 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all hover:border-gray-300"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                        />
                        {error && (
                            <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg text-left font-medium">{error}</div>
                        )}
                    </div>

                    <div className="w-full mt-2">
                        <button
                            onClick={handleSignIn}
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold px-5 py-4 rounded-xl shadow-lg hover:bg-primary-hover hover:scale-[1.02] transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : (
                                <>
                                    Entrar <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        <div className="w-full text-center mt-6">
                            <span className="text-xs text-muted-foreground block mb-3">
                                Não tem uma conta?
                            </span>
                            <Link
                                to="/register"
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-foreground hover:bg-gray-50 transition-all text-sm font-medium bg-white"
                            >
                                <UserPlus className="w-4 h-4 text-primary" />
                                Criar conta gratuita
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Description */}
            <div className="relative z-10 mt-12 flex flex-col items-center text-center max-w-xs">
                <p className="text-muted-foreground text-xs leading-relaxed">
                    Gerencie seus pedidos, descubra novos sabores e vivencie a experiência <span className="font-bold text-foreground">Mesa</span>.
                </p>
            </div>
        </div>
    );
}
