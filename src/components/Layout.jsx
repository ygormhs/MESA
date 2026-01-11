import { BottomNav } from './BottomNav';

export function Layout({ children, showNav = true }) {
    return (
        <div className="min-h-screen bg-secondary/30 pb-20"> {/* pb-20 for BottomNav space */}
            <main className="max-w-md mx-auto min-h-screen bg-background shadow-2xl overflow-hidden relative">
                {children}
            </main>
            {showNav && <BottomNav />}
        </div>
    );
}
