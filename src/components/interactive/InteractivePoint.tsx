import { motion } from 'framer-motion';

interface InteractivePointProps {
    x: number;
    y: number;
    label: string;
    category: string;
    onClick: () => void;
}

const categoryColors = {
    cuarto: 'bg-red-500',
    oficina: 'bg-blue-500',
    cable: 'bg-yellow-500',
    equipo: 'bg-green-500',
    vehiculo: 'bg-purple-500',
    area: 'bg-gray-500',
};

const InteractivePoint = ({ x, y, label, category, onClick }: InteractivePointProps) => {
    const colorClass = categoryColors[category as keyof typeof categoryColors] || 'bg-primary';

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            className="absolute cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={onClick}
        >
            <div className={`${colorClass} w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {label}
            </div>
        </motion.div>
    );
};

export default InteractivePoint;