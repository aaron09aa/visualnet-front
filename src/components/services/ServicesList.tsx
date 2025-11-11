import { motion } from 'framer-motion';
import {
    Cable,
    Shield,
    Wrench,
    FileCheck,
    Network,
    Wifi,
    Camera,
    Zap,
} from 'lucide-react';

const services = [
    {
        icon: Cable,
        title: 'Cableado Estructurado Cat6A',
        description:
            'Diseño e instalación de redes de datos de alto rendimiento con cableado UTP categoría 6A, soportando velocidades de hasta 10Gbps. Incluye terminaciones, patch panels y certificación completa.',
        features: [
            'Certificación TIA/EIA-568-C',
            'Garantía de 25 años',
            'Soporte 10Gbps',
            'Documentación completa',
        ],
    },
    {
        icon: Network,
        title: 'Infraestructura de Racks',
        description:
            'Instalación y configuración de racks principales (MDF) y secundarios (IDF) con todos los accesorios necesarios: organizadores, bandejas, ventilación y sistema de etiquetado profesional.',
        features: [
            'Racks de 12U a 42U',
            'Organizadores horizontales y verticales',
            'Sistema de ventilación',
            'Puesta a tierra certificada',
        ],
    },
    {
        icon: Shield,
        title: 'Certificación y Pruebas',
        description:
            'Verificación exhaustiva de cada punto de red con equipos Fluke DSX-5000. Entregamos reportes detallados de certificación que garantizan el cumplimiento de normas internacionales.',
        features: [
            'Equipos Fluke certificados',
            'Reportes digitales detallados',
            'Verificación de NEXT, FEXT, RL',
            'Corrección de fallas incluida',
        ],
    },
    {
        icon: FileCheck,
        title: 'Documentación Técnica',
        description:
            'Etiquetado profesional según norma TIA/EIA-606-B y entrega de planos actualizados. Incluye identificación de cada punto de red, patch panel, rack y canalización.',
        features: [
            'Etiquetas térmicas durables',
            'Planos AutoCAD actualizados',
            'Código de colores normalizado',
            'Manual de usuario',
        ],
    },
    {
        icon: Wifi,
        title: 'Redes Wi-Fi Empresariales',
        description:
            'Diseño e implementación de redes inalámbricas de alta densidad con puntos de acceso empresariales. Incluye estudio de cobertura, instalación PoE y configuración centralizada.',
        features: [
            'Access Points Ubiquiti/Cisco',
            'Controlador centralizado',
            'Estudio de site survey',
            'Configuración de VLANs',
        ],
    },
    {
        icon: Camera,
        title: 'CCTV IP',
        description:
            'Instalación de sistemas de videovigilancia IP con cámaras de alta resolución conectadas mediante infraestructura de red estructurada. Incluye NVR, almacenamiento y acceso remoto.',
        features: [
            'Cámaras IP 4K',
            'NVR con IA',
            'Alimentación PoE',
            'Acceso móvil seguro',
        ],
    },
    {
        icon: Wrench,
        title: 'Mantenimiento Preventivo',
        description:
            'Planes de mantenimiento trimestral o semestral que incluyen revisión de conexiones, limpieza de equipos, actualización de documentación y verificación de certificaciones.',
        features: [
            'Inspección completa',
            'Limpieza de racks',
            'Reporte de estado',
            'Atención prioritaria',
        ],
    },
    {
        icon: Zap,
        title: 'Sistema de Puesta a Tierra',
        description:
            'Instalación de sistema de puesta a tierra y enlace equipotencial según norma ANSI/TIA-607. Protección contra descargas eléctricas y transitorios que puedan dañar equipos.',
        features: [
            'Barra equipotencial certificada',
            'Cables AWG especificados',
            'Medición de resistencia',
            'Cumplimiento ANSI/TIA-607',
        ],
    },
];

const ServicesList = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-dark mb-2">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesList;