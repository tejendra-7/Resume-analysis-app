import React from 'react';
import { ArrowRight, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern tech office"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
                    Land Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Dream Tech Job</span>
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Stop getting rejected by ATS bots. Upload your resume, match it with your target job description, and get AI-powered insights to boost your interview chances by 3x.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-primary-600 hover:bg-primary-500 transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1"
                    >
                        Analyze My Resume
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <Link to="/sample-report" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white border-2 border-gray-700 hover:bg-gray-800 transition-all">
                        View Sample Report
                    </Link>
                </div>

                <div className="mt-16 overflow-hidden">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Trusted by candidates at</p>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                        <div className="flex animate-scroll-fast hover:pause gap-12 w-max">
                            {[...Array(2)].map((_, groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Google</span>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Meta</span>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Amazon</span>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Netflix</span>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Apple</span>
                                    <span className="font-bold text-2xl text-gray-500 hover:text-primary-400 transition-colors">Microsoft</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
