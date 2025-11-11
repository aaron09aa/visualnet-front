import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../Chatbot';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header/>
            <main className="flex-grow mt-16">
                <Outlet/>
            </main>
            <Footer/>
            <Chatbot/>
        </div>
    );
};

export default Layout;