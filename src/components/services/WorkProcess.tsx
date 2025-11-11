import { motion } from 'framer-motion';
import { ClipboardCheck, Ruler, Hammer, CheckCircle, FileText } from 'lucide-react';

const steps = [
    {
        icon: ClipboardCheck,
        title: 'Levantamiento Técnico',
        description: 'Visita al sitio, análisis de necesidades y evaluación de espacios.',
        duration: '2-3 días',
    },
    {
        icon: Ruler,
        title: 'Diseño y Planificación',
        description: 'Elaboración de planos, selección de materiales y presupuesto.',
        duration: '3-5 días',
    },
    {
        icon: Hammer,
        title: 'Instalación',
        description: 'Tendido de cables, canalización, terminaciones y montaje de racks.',
        duration: '7-14 días',
    },
    {
        icon: CheckCircle,
        title: 'Certificación y Pruebas',
        description: 'Verificación con Fluke, etiquetado y corrección de fallas.',
        duration: '3-4 días',
    },
    {
        icon: FileText,
        title: 'Entrega y Documentación',
        description: 'Informe técnico completo, planos actualizados y capacitación.',
        duration: '1-2 días',
    },
];

const WorkProcess = () => {
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
                        Nuestro Proceso de Trabajo
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Metodología probada que garantiza proyectos exitosos y clientes
                        satisfechos
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                                        {index + 1}
                                    </div>
                                    <h3 className="font-bold text-dark mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {step.description}
                                    </p>
                                    <span className="text-xs text-secondary font-semibold">
                    {step.duration}
                  </span>
                                </div>
                                {/* Flecha conectora (oculta en el último elemento) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-12 -right-3 text-primary">
                                        →
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-lg text-gray-700 font-semibold">
                        Duración total promedio: <span className="text-primary">3-4 semanas</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkProcess;