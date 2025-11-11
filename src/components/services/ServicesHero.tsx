import { motion } from 'framer-motion';

const ServicesHero = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Nuestros Servicios
                    </h1>
                    <p className="text-xl text-gray-100">
                        Soluciones integrales de cableado estructurado certificadas bajo
                        estándares internacionales TIA/EIA-568 e ISO/IEC 11801
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesHero;