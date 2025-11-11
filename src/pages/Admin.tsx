import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
                    <p className="text-gray-600 mb-4">
                        Bienvenido, <strong>{user?.email}</strong>
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                            ✅ Autenticación funcionando correctamente
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                            El dashboard completo se creará en el Paso 12
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;