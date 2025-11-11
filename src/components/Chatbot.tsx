import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: '¡Hola! Soy el asistente inteligente de VisualNet Solutions. Puedo ayudarte con información sobre nuestros servicios de cableado estructurado, proyectos y cotizaciones. ¿En qué puedo ayudarte?',
            sender: 'bot',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const API_URL = 'http://localhost:3001'; // Ajusta según tu configuración

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = async (userMessage: string) => {
        try {
            //const response = await fetch(`${API_URL}/api/chat`, { **local**
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: messages.slice(1) // Excluir mensaje de bienvenida
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.success && data.response) {
                return data.response;
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al obtener respuesta:', error);

            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                return 'No puedo conectarme al servidor. Por favor, verifica que el backend esté funcionando o contáctanos directamente.';
            }

            return 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contáctanos directamente.';
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        setInputValue('');
        setError(null);

        // Agregar mensaje del usuario
        const userMsg: Message = {
            id: Date.now(),
            text: userMessage,
            sender: 'user',
        };
        setMessages((prev) => [...prev, userMsg]);

        // Mostrar indicador de carga
        setIsLoading(true);

        try {
            // Obtener respuesta del backend
            const aiResponse = await getAIResponse(userMessage);

            // Agregar respuesta del bot
            const botMsg: Message = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'bot',
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setError('Error al enviar el mensaje');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Botón flotante */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110 z-50 animate-pulse"
                    aria-label="Abrir chat"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {/* Ventana del chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">Asistente IA</h3>
                                <p className="text-xs text-white/80 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Powered by OpenAI
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-2 rounded-full transition-colors"
                            aria-label="Cerrar chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-2 ${
                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.sender === 'bot' && (
                                    <div className="bg-primary text-white p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${
                                        message.sender === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                                </div>
                                {message.sender === 'user' && (
                                    <div className="bg-gray-300 text-gray-700 p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Indicador de carga */}
                        {isLoading && (
                            <div className="flex gap-2 justify-start">
                                <div className="bg-primary text-white p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                    <Loader className="w-5 h-5 animate-spin text-primary" />
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="text-center text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Pregúntame lo que necesites..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Enviar mensaje"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Respuestas generadas por IA • VisualNet Solutions
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;