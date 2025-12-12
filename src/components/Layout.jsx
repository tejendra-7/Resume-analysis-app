import React from 'react';
import { FileText } from 'lucide-react';
import Footer from './Footer';

import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-900 text-gray-100">
            <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">ResumeAI</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="/#how-it-works" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">How it Works</a>
                        <a href="/#pricing" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Pricing</a>
                        <Link to="/login" className="text-gray-300 hover:text-primary-400 font-medium transition-colors">Login</Link>
                        <Link to="/signup" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm">
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow bg-gray-900">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
