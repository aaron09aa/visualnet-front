import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, Building2, Calendar, Trash2, Reply, CheckCircle } from 'lucide-react';
import ReplyModal from '../../components/admin/ReplyModal';
import { Paperclip, Download } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    project_type: string;
    message: string;
    created_at: string;
    replied: boolean;
    replied_at: string;
    replied_by: string;
    attachment_url: string | null;
    attachment_name: string | null;
}

const Messages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error al cargar mensajes:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

        try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);

            if (error) throw error;
            setMessages(messages.filter((m) => m.id !== id));
        } catch (error) {
            console.error('Error al eliminar mensaje:', error);
            alert('Error al eliminar el mensaje');
        }
    };

    const markAsReplied = async (id: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({
                    replied: true,
                    replied_at: new Date().toISOString(),
                })
                .eq('id', id);

            if (error) throw error;
            fetchMessages();
        } catch (error) {
            console.error('Error al marcar como respondido:', error);
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
            {/* Header con totales y respondidos */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold">Mensajes de Contacto</h2>
                <div className="flex gap-2 lg:gap-4">
          <span className="bg-green-100 text-green-800 px-3 lg:px-4 py-2 rounded-lg font-semibold text-sm">
            {messages.filter((m) => m.replied).length} respondidos
          </span>
                    <span className="bg-primary text-white px-3 lg:px-4 py-2 rounded-lg font-semibold text-sm">
            {messages.length} total
          </span>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No hay mensajes aún</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`bg-white rounded-xl shadow-md p-6 ${
                                message.replied ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-dark">{message.name}</h3>
                                        {message.replied && (
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Respondido
                      </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                        {message.email}
                    </span>
                                        {message.phone && (
                                            <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                                                {message.phone}
                      </span>
                                        )}
                                        {message.company && (
                                            <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                                                {message.company}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {message.project_type && (
                                <div className="mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {message.project_type}
                  </span>
                                </div>
                            )}

                            <p className="text-gray-700 mb-4">{message.message}</p>

                            {message.attachment_url && (
                                <div className="mt-3 flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <Paperclip className="w-5 h-5 text-blue-600" />
                                    <a
                                        href={message.attachment_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        {message.attachment_name || 'Archivo adjunto'}
                                    </a>
                                </div>
                            )}

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(message.created_at).toLocaleString('es-ES')}
                                    {message.replied_at && (
                                        <span className="text-green-600 ml-4">
                      • Respondido el {new Date(message.replied_at).toLocaleString('es-ES')}
                                            {message.replied_by && ` por ${message.replied_by}`}
                    </span>
                                    )}
                                </div>

                                {/* Botones mejorados */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => setReplyingTo(message)}
                                        className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Reply className="w-4 h-4" />
                                        Responder
                                    </button>
                                    <button
                                        onClick={() => deleteMessage(message.id)}
                                        className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de respuesta */}
            {replyingTo && (
                <ReplyModal
                    message={replyingTo}
                    onClose={() => setReplyingTo(null)}
                    onSuccess={() => markAsReplied(replyingTo.id)}
                />
            )}
        </div>
    );
};

export default Messages;
