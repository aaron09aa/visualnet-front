import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailedInfo } from '../../data/interactiveProject';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    info: DetailedInfo | null;
}

const DetailModal = ({ isOpen, onClose, info }: DetailModalProps) => {
    if (!info) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header con imagen */}
                        {info.imagen && (
                            <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                <img
                                    src={info.imagen}
                                    alt={info.nombre}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-3xl font-bold mb-2">{info.nombre}</h2>
                                    <p className="text-lg opacity-90">{info.tipo}</p>
                                </div>
                            </div>
                        )}

                        <div className="p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Descripción */}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed">{info.descripcion}</p>
                            </div>

                            {/* Especificaciones */}
                            {info.especificaciones && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-dark mb-4">Especificaciones Técnicas</h3>
                                    {Object.entries(info.especificaciones).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-primary mb-2">{key}</h4>
                                            {Array.isArray(value) ? (
                                                <ul className="space-y-1">
                                                    {value.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                            <span className="text-secondary mt-1">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-700">{value}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DetailModal;