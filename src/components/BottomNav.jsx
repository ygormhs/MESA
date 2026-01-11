import { Home, Search, ShoppingBag, User, QrCode } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="max-w-md mx-auto relative flex items-end justify-center pointer-events-auto">

                {/* Navigation Bar Background */}
                <div className="w-full bg-white/90 backdrop-blur-xl border-t border-border/50 pb-safe pt-2 px-6 shadow-2xl rounded-t-3xl">
                    <div className="flex justify-between items-center h-16">

                        {/* Left Group */}
                        <NavLink to="/" className={({ isActive }) => clsx("flex flex-col items-center gap-1 p-2 w-12", isActive ? "text-primary" : "text-muted-foreground")}>
                            {({ isActive }) => (
                                <>
                                    <Home className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[10px] font-medium">Início</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink to="/search" className={({ isActive }) => clsx("flex flex-col items-center gap-1 p-2 w-12", isActive ? "text-primary" : "text-muted-foreground")}>
                            {({ isActive }) => (
                                <>
                                    <Search className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[10px] font-medium">Explorar</span>
                                </>
                            )}
                        </NavLink>

                        {/* Middle Spacer for Floating Button */}
                        <div className="w-12"></div>

                        {/* Right Group */}
                        <NavLink to="/orders" className={({ isActive }) => clsx("flex flex-col items-center gap-1 p-2 w-12", isActive ? "text-primary" : "text-muted-foreground")}>
                            {({ isActive }) => (
                                <>
                                    <ShoppingBag className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[10px] font-medium">Pedidos</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink to="/profile" className={({ isActive }) => clsx("flex flex-col items-center gap-1 p-2 w-12", isActive ? "text-primary" : "text-muted-foreground")}>
                            {({ isActive }) => (
                                <>
                                    <User className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[10px] font-medium">Perfil</span>
                                </>
                            )}
                        </NavLink>
                    </div>
                </div>

                {/* Floating Scan Button */}
                <div className="absolute bottom-[2rem] left-1/2 -translate-x-1/2">
                    <NavLink
                        to="/scan"
                        className="flex items-center justify-center w-14 h-14 bg-primary rounded-full shadow-float text-white hover:scale-105 transition-transform active:scale-95"
                    >
                        <QrCode className="w-6 h-6" />
                    </NavLink>
                </div>

            </div>
        </nav>
    );
}
