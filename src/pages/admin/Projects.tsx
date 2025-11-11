import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    title: string;
    client: string;
    category: string;
    year: string;
    description: string;
    image_url: string;
    points: number;
    floors: number;
    racks: number;
    cable_type: string;
    features: string[];
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);

            if (error) throw error;
            setProjects(projects.filter((p) => p.id !== id));
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            alert('Error al eliminar el proyecto');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Gestión de Proyectos</h2>
                <Link
                    to="/admin/proyectos/nuevo"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Proyecto
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No hay proyectos aún</p>
                    <Link
                        to="/admin/proyectos/nuevo"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Crear primer proyecto
                    </Link>
                </div>
            ) : (
                // 🟩 Aquí se reemplazó el grid anterior por el nuevo layout adaptable
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">{project.title}</h3>
                                        <p className="text-sm text-gray-600">{project.client}</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                                </div>

                                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{project.description}</p>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                                    <div>📍 {project.points} puntos</div>
                                    <div>🏢 {project.floors} pisos</div>
                                    <div>🗄️ {project.racks} racks</div>
                                    <div>📅 {project.year}</div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/admin/proyectos/editar/${project.id}`}
                                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                // 🟩 Fin del bloque modificado
            )}
        </div>
    );
};

export default Projects;
