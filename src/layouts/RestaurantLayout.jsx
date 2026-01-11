import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    Store,
    Ticket,
    QrCode,
    BarChart3,
    Wallet,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronDown
} from 'lucide-react';

const MENU_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/restaurant/dashboard' },
    { label: 'Meu Restaurante', icon: Store, path: '/restaurant/profile' },
    { label: 'Promoções', icon: Ticket, path: '/restaurant/promotions' },
    { label: 'QR Code', icon: QrCode, path: '/restaurant/qrcode' },
    { label: 'Faturamento', icon: Wallet, path: '/restaurant/billing' },
    { label: 'Configurações', icon: Settings, path: '/restaurant/settings' },
];

export function RestaurantLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 
                    transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-mesa-green rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <span className="font-bold text-lg text-foreground">Mesa</span>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    <div className="mb-6 px-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Principal</p>
                        {MENU_ITEMS.slice(0, 4).map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
                                    ${isActive
                                        ? 'bg-mesa-green/10 text-mesa-green font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="mb-6 px-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gestão</p>
                        {MENU_ITEMS.slice(4).map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
                                    ${isActive
                                        ? 'bg-mesa-green/10 text-mesa-green font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* User Profile Snippet at Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=100&h=100"
                                alt="Restaurant"
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Trattoria Bella</p>
                                <p className="text-xs text-gray-500 truncate">Gerente</p>
                            </div>
                            <LogOut size={18} className="text-gray-400 hover:text-red-500" onClick={handleLogout} />
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-200">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
                        >
                            <span className={`w-2 h-2 rounded-full ${isRestaurantOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="text-sm font-medium text-gray-700">{isRestaurantOpen ? 'Aberto Agora' : 'Fechado Agora'}</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
