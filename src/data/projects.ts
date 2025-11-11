export interface Project {
    id: string; // ⬅️ Cambiar de number a string
    title: string;
    client: string;
    category: string;
    year: string;
    description: string;
    image: string;
    specs: {
        points: number;
        floors: number;
        racks: number;
        cable: string;
    };
    features: string[];
}

// Puedes eliminar o comentar el array de proyectos hardcodeados
// ya que ahora vienen de Supabase
export const projects: Project[] = [];

export const categories = ['Todos', 'Residencial', 'Comercial', 'Hotelería', 'Educación'];