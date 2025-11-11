import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import Projects from './pages/admin/Projects';
import ProjectForm from './pages/admin/ProjectForm';
import InteractiveTour from './pages/InteractiveTour';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
    return (
        <ThemeProvider>
        <AuthProvider>
            <LoadingScreen />
            <BrowserRouter>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="servicios" element={<Services />} />
                        <Route path="portafolio" element={<Portfolio />} />
                        <Route path="contacto" element={<Contact />} />
                        <Route path="tour-virtual" element={<InteractiveTour />} />
                    </Route>

                    {/* Login */}
                    // ruta de /login
                    <Route path="/secret-admin-login-2025" element={<Login />} />

                    {/* Rutas de administración */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="mensajes" element={<Messages />} />
                        <Route path="proyectos" element={<Projects />} />
                        <Route path="proyectos/nuevo" element={<ProjectForm />} />
                        <Route path="proyectos/editar/:id" element={<ProjectForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
        </ThemeProvider>
    );
}

export default App;