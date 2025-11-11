import { motion } from 'framer-motion';
import { Building2, Calendar, Network, Server } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
            {/* Imagen */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Especificaciones */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Network className="w-4 h-4 text-secondary" />
                        <span>{project.specs.points} puntos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 className="w-4 h-4 text-secondary" />
                        <span>{project.specs.floors} pisos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Server className="w-4 h-4 text-secondary" />
                        <span>{project.specs.racks} racks</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>{project.year}</span>
                    </div>
                </div>

                {/* Features */}
                <div className="border-t pt-4">
                    <ul className="space-y-2">
                        {project.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;