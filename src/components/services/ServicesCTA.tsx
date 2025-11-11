import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServicesCTA = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        ¿Listo para mejorar tu infraestructura de red?
                    </h2>
                    <p className="text-xl text-gray-100 mb-8">
                        Solicita una cotización sin compromiso y descubre cómo podemos
                        ayudarte a tener una red de clase mundial.
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
                    >
                        Solicitar Cotización
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesCTA;