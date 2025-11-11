import { useState } from "react";
import { supabase } from "../../lib/supabase";
import emailjs from '@emailjs/browser';
import { Upload, X, FileText } from 'lucide-react';

const ContactForm = () => {
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        project_type: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validar tamaño (máximo 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("El archivo no debe superar 5MB");
                return;
            }
            // Validar tipo
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
            setError("");
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const uploadFile = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('cotizaciones')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('cotizaciones')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error al subir archivo:', err);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let attachmentUrl = null;
            let attachmentName = null;
            let attachmentType = null;

            // 1. Subir archivo si existe
            if (file) {
                attachmentUrl = await uploadFile(file);
                if (!attachmentUrl) {
                    throw new Error("Error al subir el archivo");
                }
                attachmentName = file.name;
                attachmentType = file.type;
            }

            // 2. Guardar en Supabase
            const { error: supabaseError } = await supabase
                .from('contact_messages')
                .insert([{
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    company: data.company,
                    project_type: data.project_type,
                    message: data.message,
                    attachment_url: attachmentUrl,
                    attachment_name: attachmentName,
                    attachment_type: attachmentType,
                }]);

            if (supabaseError) throw supabaseError;

            // 3. Enviar email con EmailJS
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone || 'No proporcionado',
                    company: data.company || 'No proporcionada',
                    project_type: data.project_type || 'No especificado',
                    message: data.message,
                    attachment: attachmentUrl ? `Archivo adjunto: ${attachmentName}` : 'Sin adjuntos',
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            console.log("Mensaje enviado exitosamente");
            setSent(true);
            setTimeout(() => setSent(false), 5000);
            setData({ name: "", email: "", phone: "", company: "", project_type: "", message: "" });
            setFile(null);
        } catch (err: any) {
            console.error("Error:", err);
            setError("Hubo un error al enviar el mensaje. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Contacto</h2>

                {sent && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        ¡Mensaje enviado con éxito! Recibirás una respuesta pronto.
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre *</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                        <input
                            type="tel"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Empresa</label>
                        <input
                            type="text"
                            name="company"
                            value={data.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Tipo de Proyecto</label>
                        <select
                            name="project_type"
                            value={data.project_type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Residencial">Residencial</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Hotelería">Hotelería</option>
                            <option value="Educación">Educación</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje *</label>
                        <textarea
                            name="message"
                            value={data.message}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg"
                            rows={4}
                        />
                    </div>

                    {/* Adjuntar archivo */}
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Adjuntar archivo (PDF o Excel) - Opcional
                        </label>

                        {!file ? (
                            <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:border-primary dark:hover:border-secondary transition-colors">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Clic para seleccionar archivo
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        PDF o Excel (máx. 5MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept=".pdf,.xls,.xlsx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium dark:text-white">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;