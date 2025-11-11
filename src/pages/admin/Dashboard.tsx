import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.ts';
import { MessageSquare, FolderOpen, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalMessages: 0,
        totalProjects: 0,
        recentMessages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Total de mensajes
            const { count: messagesCount } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true });

            // Total de proyectos
            const { count: projectsCount } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true });

            // Mensajes recientes (últimos 7 días)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const { count: recentCount } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', sevenDaysAgo.toISOString());

            setStats({
                totalMessages: messagesCount || 0,
                totalProjects: projectsCount || 0,
                recentMessages: recentCount || 0,
            });
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Mensajes',
            value: stats.totalMessages,
            icon: MessageSquare,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Proyectos',
            value: stats.totalProjects,
            icon: FolderOpen,
            color: 'bg-green-500',
        },
        {
            title: 'Mensajes (7 días)',
            value: stats.recentMessages,
            icon: TrendingUp,
            color: 'bg-purple-500',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

            {/* Grid de estadísticas actualizado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-600 font-medium">{card.title}</h3>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-dark">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Accesos Rápidos</h3>

                {/* Accesos rápidos actualizado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/admin/mensajes"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                        <MessageSquare className="w-8 h-8 text-primary mb-2" />
                        <h4 className="font-semibold mb-1">Ver Mensajes</h4>
                        <p className="text-sm text-gray-600">Revisa los mensajes de contacto</p>
                    </a>
                    <a
                        href="/admin/proyectos"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors"
                    >
                        <FolderOpen className="w-8 h-8 text-primary mb-2" />
                        <h4 className="font-semibold mb-1">Gestionar Proyectos</h4>
                        <p className="text-sm text-gray-600">Agregar o editar proyectos del portafolio</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
