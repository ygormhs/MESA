import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, Mail, Shield } from 'lucide-react';

export default function Profile() {
    const { user, userRole, signOut } = useAuth();

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <UserIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">{user?.user_metadata?.full_name || 'Usuário'}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="text-sm font-medium">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Tipo de Conta</p>
                                <p className="text-sm font-medium capitalize">
                                    {userRole === 'restaurant_owner' ? 'Restaurante' : 'Cliente'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={signOut}
                    className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-bold bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                </button>
            </div>
        </Layout>
    );
}
