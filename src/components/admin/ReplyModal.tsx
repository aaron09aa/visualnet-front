import { useState } from 'react';
import { X, Send, Upload, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ReplyModalProps {
    message: {
        id: string;
        name: string;
        email: string;
        project_type: string;
        message: string;
    };
    onClose: () => void;
    onSuccess: () => void;
}

const ReplyModal = ({ message, onClose, onSuccess }: ReplyModalProps) => {
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const { user } = useAuth();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("El archivo no debe superar 10MB");
                return;
            }
            const allowedTypes = [
                'application/pdf',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if (!allowedTypes.includes(selectedFile.type)) {
                setError("Solo se permiten archivos PDF o Excel");
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const uploadFile = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `respuesta_${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('cotizaciones')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('cotizaciones')
                .getPublicUrl(fileName);

            return publicUrl;
        } catch (err) {
            console.error('Error al subir archivo:', err);
            return null;
        }
    };

    const handleSend = async () => {
        if (!replyText.trim()) {
            setError('Por favor escribe una respuesta');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let attachmentUrl = '';

            if (file) {
                const url = await uploadFile(file);
                if (!url) throw new Error('Error al subir archivo');
                attachmentUrl = url;
            }

            // Enviar email
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID,
                {
                    to_email: message.email,
                    to_name: message.name,
                    reply_message: replyText,
                    project_type: message.project_type || 'No especificado',
                    original_message: message.message,
                    attachment_link: attachmentUrl ? `Archivo adjunto: ${attachmentUrl}` : '',
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Marcar como respondido
            const { error: supabaseError } = await supabase
                .from('contact_messages')
                .update({
                    replied: true,
                    replied_at: new Date().toISOString(),
                    replied_by: user?.email || 'Admin',
                })
                .eq('id', message.id);

            if (supabaseError) throw supabaseError;

            alert('Respuesta enviada exitosamente');
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error:', err);
            setError('Error al enviar la respuesta. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-2xl font-bold dark:text-white">Responder a {message.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold mb-2 dark:text-white">Mensaje original:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            <strong>Email:</strong> {message.email}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            <strong>Tipo:</strong> {message.project_type || 'No especificado'}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Mensaje:</strong> {message.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Tu respuesta:
                        </label>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Escribe tu respuesta aquí..."
                        />
                    </div>

                    {/* Adjuntar archivo */}
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Adjuntar cotización (opcional)
                        </label>
                        {!file ? (
                            <label className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-primary">
                                <div className="text-center">
                                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">PDF o Excel (máx. 10MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept=".pdf,.xls,.xlsx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <span className="text-sm dark:text-white">{file.name}</span>
                                </div>
                                <button onClick={() => setFile(null)} className="text-red-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                            {loading ? 'Enviando...' : 'Enviar Respuesta'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;