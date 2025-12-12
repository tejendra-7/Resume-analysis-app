import React from 'react';
import { Upload, FileText, BarChart3, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: Upload,
            title: "Upload Resume",
            description: "Upload your existing resume in PDF or DOCX format. We'll parse it instantly.",
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
            borderColor: "border-blue-400/20"
        },
        {
            icon: FileText,
            title: "Add Job Description",
            description: "Paste the job description you're applying for. We'll identify key requirements.",
            color: "text-purple-400",
            bgColor: "bg-purple-400/10",
            borderColor: "border-purple-400/20"
        },
        {
            icon: BarChart3,
            title: "Get AI Analysis",
            description: "Receive a detailed compatibility score and actionable tips to improve your match.",
            color: "text-emerald-400",
            bgColor: "bg-emerald-400/10",
            borderColor: "border-emerald-400/20"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-primary-900/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6 tracking-tight">
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">ResumeAI</span> Works
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Optimize your job application in three simple steps. Our AI analyzes your potential instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-800 via-primary-900/50 to-gray-800 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 group">
                            <div className={`
                                bg-gray-800 rounded-2xl p-8 border ${step.borderColor} 
                                hover:border-opacity-50 transition-all duration-300 
                                hover:-translate-y-2 hover:shadow-xl
                                flex flex-col items-center text-center h-full
                            `}>
                                <div className={`
                                    w-16 h-16 rounded-2xl ${step.bgColor} ${step.color} 
                                    flex items-center justify-center mb-6 shadow-inner
                                    group-hover:scale-110 transition-transform duration-300
                                `}>
                                    <step.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Step Number Badge */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 shadow-sm">
                                    {index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group cursor-pointer">
                        Start Analyzing Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
