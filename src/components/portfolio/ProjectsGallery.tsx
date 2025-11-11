import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';

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

const ProjectsGallery = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState('Todos');
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

    const categories = ['Todos', ...new Set(projects.map(p => p.category))];

    const filteredProjects =
        activeCategory === 'Todos'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <ProjectFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={String(project.id)}
                            project={{
                                ...project,
                                image: project.image_url,
                                specs: {
                                    points: project.points,
                                    floors: project.floors,
                                    racks: project.racks,
                                    cable: project.cable_type
                                }
                            }}
                            index={index}
                        />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No hay proyectos en esta categoría
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsGallery;