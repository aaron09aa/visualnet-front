export interface InteractivePoint {
    id: string;
    x: number; // Posición X en %
    y: number; // Posición Y en %
    label: string;
    category: 'cuarto' | 'oficina' | 'cable' | 'equipo' | 'vehiculo' | 'area';
}

export interface ProjectArea {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    puntos: InteractivePoint[];
}

export interface DetailedInfo {
    nombre: string;
    tipo: string;
    imagen?: string;
    especificaciones?: Record<string, string | string[]>;
    descripcion: string;
}

// Áreas navegables del edificio
export const areas: ProjectArea[] = [
    {
        id: 'fachada',
        nombre: 'Vista Frontal del Edificio',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/1.png',
        descripcion: 'Edificio corporativo de 4 pisos con infraestructura de red completa',
        puntos: [
            { id: 'pb-izq', x: 25, y: 60, label: 'Planta Baja - Ala Izquierda', category: 'area' },
            { id: 'pb-principal', x: 70, y: 70, label: 'Entrada principal', category: 'area' },
            { id: 'unidad-movil', x: 93.47, y: 80, label: 'Vehículo de Servicio', category: 'vehiculo' },
        ],
    },
    {
        id: 'pb-izq',
        nombre: 'Planta Baja - Ala Izquierda',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/6.png',
        descripcion: 'Oficinas administrativas con cableado estructurado Cat6A',
        puntos: [
            { id: 'oficina-101', x: 32, y: 60, label: 'Oficina 101', category: 'oficina' },
            { id: 'oficina-102', x: 73, y: 60, label: 'Oficina 102', category: 'oficina' },
            { id: 'mdf', x: 90, y: 60, label: 'MDF Principal', category: 'cuarto' },
            { id: 'cable-horiz-pb', x: 50, y: 53, label: 'Cableado Horizontal', category: 'cable' },
            { id: 'pb-principal', x: 95, y: 70, label: 'Entrada principal', category: 'area' },
            { id: 'fachada', x: 1, y: 50, label: 'Vista Frontal', category: 'area' },
        ],
    },
    {
        id: 'pb-principal',
        nombre: 'Entrada principal',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/5.png',
        descripcion: 'Cuarto de telecomunicaciones principal',
        puntos: [
            { id: 'idf-p3', x: 50, y: 10, label: 'IDF Piso 3', category: 'cuarto' },
            { id: 'unidad-movil', x: 60, y: 96, label: 'Vehículo de Servicio', category: 'area' },
            { id: 'cable-backbone', x: 50, y: 45, label: 'Backbone Fibra Óptica', category: 'cable' },
            { id: 'sala-reunion', x: 20, y: 20, label: 'Sala de Reuniones', category: 'oficina' },
            { id: 'mdf', x: 55, y: 60, label: 'MDF Principal', category: 'cuarto' },
            { id: 'pb-izq', x: 1, y: 40, label: 'Planta Baja - Ala Izquierda', category: 'area' },
            { id: 'frontal-der', x:97, y: 40, label: 'Planta Baja - Ala Izquierda', category: 'area' },

        ],
    },
    {
        id: 'unidad-movil',
        nombre: 'Unidad Móvil de Servicio Técnico',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/2.png',
        descripcion: 'Vehículo especialmente equipado para operaciones de instalación, mantenimiento y certificación de cableado estructurado en campo.',
        puntos: [
            { id: 'pb-principal', x: 20, y: 40, label: 'Entrada principal', category: 'area' },
            { id: 'vehiculo', x: 60, y: 60, label: 'Vehículo de Servicio', category: 'vehiculo' },
            { id: 'frontal-der', x: 80, y: 50, label: 'Vista fronta a la derecha', category: 'area' },
        ],
    },
    {
        id: 'frontal-der',
        nombre: 'Planta baja a la derecha',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/4.png',
        descripcion: 'Vista frontal derecha de la entrada principal',
        puntos: [
            { id: 'pb-principal', x: 65, y: 40, label: 'Entrada principal', category: 'area' },
            { id: 'vehiculo', x: 40, y: 60, label: 'Vehículo de Servicio', category: 'vehiculo' },
            { id: 'unidad-movil', x: 10, y: 46, label: 'Vehículo de Servicio', category: 'area' },
        ],
    },
];

// Información detallada de cada punto
export const detalles: Record<string, DetailedInfo> = {
    'oficina-101': {
        nombre: 'Oficina 101 - Administración',
        tipo: 'Espacio de Trabajo',
        imagen: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
        especificaciones: {
            'Área': '25 m²',
            'Capacidad': '4 estaciones de trabajo',
            'Equipamiento': [
                '4 Puntos de red Cat6A',
                '2 Teléfonos IP',
                '1 Impresora de red',
                'Cobertura WiFi desde AP-PB-01',
            ],
            'Cableado': 'Cable horizontal Cat6A (18m) desde Patch Panel Principal',
            'VLAN': 'VLAN 10 - Administrativo',
        },
        descripcion: 'Oficina administrativa principal. Conexión directa al switch de distribución 1 en MDF. Incluye puntos de red certificados y cobertura WiFi empresarial.',
    },
    'oficina-102': {
        nombre: 'Oficina 102 - Contabilidad',
        tipo: 'Espacio de Trabajo',
        imagen: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600',
        especificaciones: {
            'Área': '20 m²',
            'Capacidad': '3 estaciones de trabajo',
            'Equipamiento': [
                '3 Puntos de red Cat6A',
                '1 Teléfono IP',
                'Cobertura WiFi desde AP-PB-01',
            ],
            'Cableado': 'Cable horizontal Cat6A (22m) desde Patch Panel Principal',
            'VLAN': 'VLAN 10 - Administrativo',
        },
        descripcion: 'Oficina del departamento de contabilidad con conexiones redundantes para equipos críticos.',
    },
    'mdf': {
        nombre: 'Cuarto de Telecomunicaciones Principal (MDF)',
        tipo: 'Main Distribution Frame',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/2a.png',
        especificaciones: {
            'Ubicación': 'Planta Baja - Centro',
            'Área': '15 m²',
            'Temperatura': '20-22°C controlada 24/7',
            'Equipamiento': [
                'Rack 42U con equipos core',
                'Switch Core L3 48 puertos 10G',
                'Router empresarial dual WAN',
                'Firewall de próxima generación',
                'Patch Panels Cat6A (96 puertos)',
                'UPS 3000VA (2h autonomía)',
                'Sistema de climatización redundante',
                'Detección de incendios',
                'Control de acceso biométrico',
            ],
            'Conectividad': 'Fibra óptica OM4 24 hilos hacia IDF',
            'Normas': 'Cumple ANSI/TIA-942 Rated-3',
        },
        descripcion: 'Cuarto principal que aloja toda la infraestructura crítica. Incluye sistemas de respaldo, climatización y seguridad física. Punto central de toda la red del edificio.',
    },
    'idf-p3': {
        nombre: 'Cuarto de Telecomunicaciones Intermedio (IDF) - Piso 3',
        tipo: 'Intermediate Distribution Frame',
        imagen: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600',
        especificaciones: {
            'Ubicación': 'Piso 3 - Centro',
            'Área': '8 m²',
            'Equipamiento': [
                'Mini Rack 12U de pared',
                'Switch de acceso 24 puertos PoE+',
                'Patch Panel Cat6A (48 puertos)',
                'UPS 1500VA (1h autonomía)',
                'Ventilación forzada',
                'Iluminación LED',
            ],
            'Conectividad': 'Enlace 10G por fibra óptica desde MDF',
            'Normas': 'Cumple ANSI/TIA-568-C',
        },
        descripcion: 'Cuarto intermedio para distribución del piso 3. Conectado al MDF mediante fibra óptica 10G con redundancia.',
    },
    'cable-horiz-pb': {
        nombre: 'Cableado Horizontal Planta Baja',
        tipo: 'Cable UTP Cat6A',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/1a.png',
        especificaciones: {
            'Categoría': 'Cat6A UTP',
            'Especificaciones': '23 AWG, 550 MHz',
            'Velocidad': '10 Gbps (hasta 100m)',
            'Longitud promedio': '18-25 metros por punto',
            'Ruta': 'Desde Patch Panel Principal hacia oficinas 101-102',
            'Instalación': [
                'Tendido en bandeja porta cables',
                'Separación mínima 30cm de líneas eléctricas',
                'Radio de curvatura mínimo 4x diámetro',
                'Terminado en jacks RJ45 keystone',
                'Etiquetado según TIA-606-B',
            ],
            'Certificación': 'Certificado Fluke DSX-5000 - Cat6A aprobada',
        },
        descripcion: 'Cableado horizontal que conecta el patch panel del MDF con todos los puntos de red de planta baja. Instalado según normas TIA/EIA-568-C con certificación completa.',
    },
    'cable-backbone': {
        nombre: 'Backbone Principal - Fibra Óptica',
        tipo: 'Fibra Óptica Multimodo OM4',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/backbone.png',
        especificaciones: {
            'Tipo': 'Fibra Multimodo OM4',
            'Configuración': '24 hilos, conectores LC',
            'Velocidad': '10 Gbps',
            'Longitud': '45 metros',
            'Ruta': 'Desde MDF (PB) hasta IDF (Piso 3)',
            'Instalación': [
                'Tendido vertical en ducto metálico exclusivo',
                'Dos rutas físicas independientes (redundancia)',
                'Protección mecánica adicional',
                'Paneles de terminación en ambos extremos',
                'Organización de fibras con código de colores',
            ],
            'Certificación': 'Certificado OTDR - Atenuación: 0.8 dB',
        },
        descripcion: 'Cable backbone que conecta MDF con IDF. Proporciona conectividad de 10G entre pisos con redundancia física completa.',
    },
    'sala-reunion': {
        nombre: 'Sala de Reuniones Ejecutiva',
        tipo: 'Espacio Colaborativo',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/4a.png',
        especificaciones: {
            'Área': '30 m²',
            'Capacidad': '12 personas',
            'Equipamiento': [
                '4 Puntos de red Cat6A',
                'Pantalla interactiva 75" con conexión HDMI sobre IP',
                'Sistema de videoconferencia empresarial',
                'Access Point WiFi 6 dedicado',
                '2 Micrófonos de techo PoE',
            ],
            'Cableado': 'Cable Cat6A desde IDF Piso 3',
            'VLAN': 'VLAN 20 - Salas de Conferencia',
        },
        descripcion: 'Sala de reuniones con tecnología de videoconferencia empresarial. Incluye conectividad redundante y WiFi dedicado de alta velocidad.',
    },
    'vehiculo': {
        nombre: 'Unidad Móvil de Servicio Técnico',
        tipo: 'Vehículo Equipado',
        imagen: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/3.png',
        especificaciones: {
            'Personal': 'Técnicos certificados TIA/EIA',
            'Equipamiento': [
                'Certificador Fluke DSX-5000',
                'OTDR para fibra óptica',
                'Ponchadora profesional',
                'Multímetro y probadores de cable',
                'Herramientas de instalación',
                'Escalera telescópica',
                'EPPs certificados',
                'Material de emergencia',
            ],
            'Certificaciones del equipo': [
                'TIA/EIA-568 Instalador Certificado',
                'ISO/IEC 11801 Especialista',
                'Fluke Networks CCTT',
            ],
        },
        descripcion: 'Nuestro equipo técnico cuenta con vehículos equipados con herramientas de última generación. Certificadores Fluke, equipos de medición y todas las herramientas necesarias para instalación, certificación y soporte en sitio.',
    },
};