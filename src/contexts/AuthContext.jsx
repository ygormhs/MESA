import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [configError, setConfigError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase) {
            console.error("AuthContext: Supabase client is missing.");
            setConfigError(true);
            setLoading(false);
            return;
        }

        // Initial Session Check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                fetchProfile(session.user);
            } else {
                setLoading(false);
            }
        }).catch((err) => {
            console.error("Session check failed", err);
            setLoading(false);
        });

        // Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                fetchProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (authUser) => {
        if (!supabase) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.warn('Error fetching profile:', error);
            }

            const fullUser = {
                ...authUser,
                ...data,
            };

            setUser(fullUser);
        } catch (error) {
            console.error('Profile fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        if (!supabase) throw new Error("Supabase não configurado.");
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const register = async ({ email, password, name, role = 'client' }) => {
        if (!supabase) throw new Error("Supabase não configurado.");
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    role: role,
                },
            },
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        navigate('/login');
    };

    if (configError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-red-50 text-red-800 text-center">
                <div className="max-w-md space-y-4">
                    <AlertTriangle className="w-12 h-12 mx-auto" />
                    <h2 className="text-xl font-bold">Erro de Configuração</h2>
                    <p>O aplicativo não conseguiu conectar ao banco de dados.</p>
                    <p className="text-sm bg-white p-3 rounded border border-red-200 font-mono">
                        Missing environment variables: VITE_SUPABASE_URL
                    </p>
                </div>
            </div>
        );
    }

    const value = {
        user,
        session,
        loading,
        userRole: user?.role,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
