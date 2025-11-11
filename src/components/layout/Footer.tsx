import {Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Network} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark dark:bg-gray-950 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo en footer */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src="https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/logo.png"
                                alt="VisualNet Solutions"
                                className="h-8 w-auto"
                            />
                            <span className="text-xl font-bold">VisualNet Solutions</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Expertos en cableado estructurado certificado bajo estándares internacionales.
                        </p>
                    </div>


                    {/* Contacto */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-5 h-5 text-secondary"/>
                                <span>+507 6433-0634</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-5 h-5 text-secondary"/>
                                <span>info@visualnetsolutions.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-secondary"/>
                                <span>Panamá, Panamá</span>
                            </div>
                        </div>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li><a href="/servicios" className="hover:text-secondary transition-colors">Servicios</a>
                            </li>
                            <li><a href="/portafolio" className="hover:text-secondary transition-colors">Portafolio</a>
                            </li>
                            <li><a href="/contacto" className="hover:text-secondary transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-secondary transition-colors">
                                <Facebook className="w-6 h-6"/>
                            </a>
                            <a href="#" className="hover:text-secondary transition-colors">
                                <Instagram className="w-6 h-6"/>
                            </a>
                            <a href="#" className="hover:text-secondary transition-colors">
                                <Linkedin className="w-6 h-6"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>&copy; 2025 VisualNet Solutions S.A. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;