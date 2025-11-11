import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const features = [
    'Certificación bajo estándares internacionales TIA/EIA-568 e ISO/IEC 11801',
    'Equipo técnico altamente capacitado y certificado',
    'Documentación completa y etiquetado profesional',
    'Garantía de calidad en todos nuestros proyectos',
    'Soporte técnico y mantenimiento continuo',
    'Equipos de medición y certificación de última generación',
];

const WhyUs = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                            ¿Por qué elegir VisualNet Solutions?
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Somos especialistas en diseño, instalación y certificación de
                            cableado estructurado. Nuestro compromiso es entregar
                            infraestructura de red de la más alta calidad, respaldada por
                            certificaciones internacionales.
                        </p>
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                                    <p className="text-gray-700">{feature}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">
                                Misión
                            </h3>
                            <p className="mb-6">
                                Proveer soluciones profesionales de infraestructura de red que
                                garanticen conectividad confiable, escalable y de alto
                                rendimiento para nuestros clientes.
                            </p>
                            <h3 className="text-2xl font-bold mb-4">
                                Visión
                            </h3>
                            <p>
                                Ser referentes en innovación y calidad en el sector de
                                infraestructura de telecomunicaciones a nivel nacional e
                                internacional.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;