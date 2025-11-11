import { motion } from 'framer-motion';

const PortfolioHero = () => {
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
                        Nuestros Proyectos
                    </h1>
                    <p className="text-xl text-gray-100">
                        Casos de éxito en infraestructura de red para edificios residenciales
                        y comerciales
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioHero;