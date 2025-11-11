import { motion } from 'framer-motion';
import { Building2, Users, Award, Briefcase } from 'lucide-react';

const stats = [
    {
        icon: Building2,
        value: '50+',
        label: 'Edificios Conectados',
    },
    {
        icon: Users,
        value: '2,500+',
        label: 'Puntos de Red Instalados',
    },
    {
        icon: Award,
        value: '100%',
        label: 'Certificación TIA/EIA',
    },
    {
        icon: Briefcase,
        value: '5+',
        label: 'Años de Experiencia',
    },
];

const Stats = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-secondary" />
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;