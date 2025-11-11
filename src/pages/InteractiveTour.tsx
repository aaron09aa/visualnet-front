import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { areas, detalles, ProjectArea } from '../data/interactiveProject';
import InteractivePoint from '../components/interactive/InteractivePoint';
import DetailModal from '../components/interactive/DetailModal';

const InteractiveTour = () => {
    const [currentArea, setCurrentArea] = useState<ProjectArea>(areas[0]);
    const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handlePointClick = (pointId: string) => {
        const targetArea = areas.find((a) => a.id === pointId);
        if (targetArea) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentArea(targetArea);
                setIsTransitioning(false);
            }, 500);
        } else {
            setSelectedDetail(pointId);
        }
    };

    const handleBack = () => {
        if (currentArea.id !== 'fachada') {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentArea(areas[0]);
                setIsTransitioning(false);
            }, 500);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-950 text-white">
            {/* Fondo degradado SOLO detrás del tour */}
            <div className="relative flex-grow pt-16 overflow-hidden">
                {/* Fondo borroso del área actual */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`bg-${currentArea.id}`}
                            src={currentArea.imagen}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{filter: 'blur(30px) brightness(0.6)', transform: 'scale(1.2)'}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.8}}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-gray-950/80"></div>
                </div>

                {/* Contenido del tour */}
                <div className="relative z-10 container mx-auto px-4 py-10">
                    {/* Encabezado */}
                    <div
                        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Tour Virtual Interactivo</h1>
                            <p className="text-white/80">Explora nuestro proyecto de cableado estructurado</p>
                        </div>
                        {currentArea.id !== 'fachada' && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Volver
                            </button>
                        )}
                    </div>

                    {/* Área principal */}
                    <div className="relative aspect-video bg-black/30 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentArea.id}
                                src={currentArea.imagen}
                                alt={currentArea.nombre}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>

                        {isTransitioning && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                            </div>
                        )}

                        {!isTransitioning &&
                            currentArea.puntos.map((punto) => (
                                <InteractivePoint
                                    key={punto.id}
                                    x={punto.x}
                                    y={punto.y}
                                    label={punto.label}
                                    category={punto.category}
                                    onClick={() => handlePointClick(punto.id)}
                                />
                            ))}
                    </div>

                    {/* Leyenda */}
                    <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg">
                        <p className="text-sm text-white/80 mb-4">
                            Haz clic en los puntos de colores para explorar diferentes elementos del proyecto
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span className="text-sm">Cuartos Técnicos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-sm">Oficinas/Áreas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm">Cableado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                <span className="text-sm">Equipos/Vehículos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de detalles */}
                <DetailModal
                    isOpen={selectedDetail !== null}
                    onClose={() => setSelectedDetail(null)}
                    info={selectedDetail ? detalles[selectedDetail] : null}
                />
            </div>

            {/* Footer separado, sin degradado detrás */}
            <footer className="bg-black text-white/90 py-10 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" /> <span>+507 6000-1234</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" /> <span>contacto@redtechsolutions.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> <span>Ciudad de Panamá, Panamá</span>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-white/60 mt-4">
                        © {new Date().getFullYear()} RedTech Solutions S.A. — Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default InteractiveTour;
