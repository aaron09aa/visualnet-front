import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/servicios', label: 'Servicios' },
        { to: '/portafolio', label: 'Portafolio' },
        { to: '/tour-virtual', label: 'Tour Virtual' },
        { to: '/contacto', label: 'Contacto' },
    ];

    // --- Detectar long press en logo ---
    const handleLogoTouchStart = () => {
        const timer = setTimeout(() => {
            navigate('/secret-admin-login-2025');
        }, 2000); // 2 segundos de presión continua
        setPressTimer(timer);
    };

    const handleLogoTouchEnd = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
        }
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50 transition-colors">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo con detección de long press */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3"
                        onTouchStart={handleLogoTouchStart}
                        onTouchEnd={handleLogoTouchEnd}
                        onMouseDown={handleLogoTouchStart}
                        onMouseUp={handleLogoTouchEnd}
                        onMouseLeave={handleLogoTouchEnd}
                    >
                        <img
                            src="https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/logo.png"
                            alt="VisualNet Solutions"
                            className="h-10 w-auto"
                        />
                        <div className="hidden md:flex flex-col">
                            <span className="text-lg font-bold text-dark dark:text-white leading-tight">
                                VisualNet Solutions
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Infraestructura de Red
                            </span>
                        </div>
                    </Link>

                    {/* Navegación Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Botón de cambio de tema */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Cambiar tema"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Botón menú móvil (animado) */}
                    <motion.button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{ rotate: isMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </motion.div>
                    </motion.button>
                </div>

                {/* Navegación Móvil (animada) */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        height: isMenuOpen ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="mt-4 pb-4 dark:border-t dark:border-gray-800">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Botón de tema en menú móvil */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors w-full"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
                        </button>
                    </div>
                </motion.div>
            </nav>
        </header>
    );
};

export default Header;
