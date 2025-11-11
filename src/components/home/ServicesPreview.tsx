import { motion } from 'framer-motion';
import { Cable, Shield, Wrench, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: Cable,
        title: 'Cableado Estructurado',
        description:
            'Instalación profesional de redes Cat6A certificadas bajo normas TIA/EIA-568.',
    },
    {
        icon: Shield,
        title: 'Certificación y Pruebas',
        description:
            'Verificación completa con equipos Fluke para garantizar el rendimiento óptimo.',
    },
    {
        icon: Wrench,
        title: 'Mantenimiento',
        description:
            'Servicios preventivos y correctivos para mantener tu infraestructura funcionando.',
    },
    {
        icon: FileCheck,
        title: 'Documentación Técnica',
        description:
            'Etiquetado profesional y planos actualizados según TIA/EIA-606.',
    },
];

const ServicesPreview = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                        Nuestros Servicios
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Soluciones integrales de infraestructura de telecomunicaciones para
                        edificios residenciales y comerciales.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            >
                                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-dark">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">{service.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/servicios"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Ver Todos los Servicios
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesPreview;