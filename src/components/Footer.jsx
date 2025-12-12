import React from 'react';
import { FileText, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">ResumeAI</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Elevate your career with AI-powered resume analysis. Get detailed insights and match your profile with your dream job.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Product</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Features</a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Live Demo</a>
                            </li>
                            <li>
                                <Link to="/sample-report" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Sample Report</Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">API</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Community</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Newsletter Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and career tips.</p>
                        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm shadow-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ResumeAI. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
