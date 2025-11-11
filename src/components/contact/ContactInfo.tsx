import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
    {
        icon: Phone,
        title: 'Teléfono',
        details: ['+507 6XXX-XXXX', '+507 3XXX-XXXX'],
    },
    {
        icon: Mail,
        title: 'Email',
        details: ['info@visualnetsolutions.com', 'ventas@visualnetsolutions.com'],    },
    {
        icon: MapPin,
        title: 'Ubicación',
        details: ['Ciudad de Panamá', 'Panamá'],
    },
    {
        icon: Clock,
        title: 'Horario',
        details: ['Lunes - Viernes: 8:00 AM - 6:00 PM', 'Sábados: 9:00 AM - 1:00 PM'],
    },
];

const ContactInfo = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                        Información de Contacto
                    </h2>
                    <p className="text-gray-600">
                        Estamos disponibles para responder todas tus consultas
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-dark mb-3">{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600 text-sm">
                                        {detail}
                                    </p>
                                ))}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;