import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, MessageSquare, FolderOpen, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
    const { user, signOut } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare },
        { to: '/admin/proyectos', label: 'Proyectos', icon: FolderOpen },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Mobile & Desktop */}
            <header className="bg-white shadow-sm fixed w-full top-0 z-20">
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Botón menú móvil */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h1 className="text-lg lg:text-xl font-bold text-dark">
                            Panel de Administración
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4">
            <span className="text-xs lg:text-sm text-gray-600 truncate max-w-[150px] lg:max-w-none">
              {user?.email}
            </span>
                        <button
                            onClick={async () => {
                                await signOut();
                                window.location.href = '/';
                            }}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm lg:text-base"
                        >
                            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="hidden sm:inline">Salir</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar Desktop & Mobile */}
                <aside
                    className={`
            fixed lg:static inset-y-0 left-0 z-10 
            w-64 bg-white shadow-lg lg:shadow-sm
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:h-screen mt-16
          `}
                >
                    <nav className="p-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                                        isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Overlay para cerrar sidebar en móvil */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-0 lg:hidden mt-16"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8 lg:ml-0 w-full overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;