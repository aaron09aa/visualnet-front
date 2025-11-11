import { motion } from 'framer-motion';
import { ArrowRight, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section
            className="relative bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800 text-white py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Texto */}
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Infraestructura de Red de Clase Mundial
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-gray-100">
                            Diseño, instalación y certificación de cableado estructurado bajo
                            estándares internacionales TIA/EIA-568 e ISO/IEC 11801.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/contacto"
                                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                Solicitar Cotización
                                <ArrowRight className="w-5 h-5"/>
                            </Link>
                            <Link
                                to="/portafolio"
                                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center"
                            >
                                Ver Proyectos
                            </Link>
                        </div>
                    </motion.div>

                    {/* Ilustración */}
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="hidden md:flex justify-center"
                    >
                        <Network className="w-64 h-64 text-white opacity-20"/>
                    </motion.div>
                </div>
            </div>

            {/* Onda decorativa */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;