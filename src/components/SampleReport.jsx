import React, { useState } from 'react';
import Layout from './Layout';
import { ArrowRight, ChevronDown, ChevronUp, User, Briefcase, TrendingUp, DollarSign } from 'lucide-react';

const SampleReport = () => {
    const caseStudies = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Marketing Manager",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
            before: {
                role: "Marketing Associate",
                company: "Retail Corp",
                salary: "$55,000",
                score: 62,
                issues: [
                    "Generic objective statement",
                    "Lack of quantifiable metrics",
                    "Poor keyword optimization for digital marketing",
                    "Dense, hard-to-read formatting"
                ]
            },
            after: {
                role: "Senior Marketing Manager",
                company: "TechFlow Solutions",
                salary: "$92,000",
                score: 94,
                improvements: [
                    "Results-oriented professional summary",
                    "Added specific metrics (e.g., 'Increased ROI by 40%')",
                    "Tailored skills section for SEO/SEM roles",
                    "Clean, ATS-friendly modern layout"
                ],
                hike: "67%"
            },
            story: "Sarah was stuck in a junior role for 3 years despite leading major campaigns. ResumeAI identified that her impact was buried in dense text. By extracting key metrics and optimizing for ATS, she landed a senior role at a top tech firm."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Engineer",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
            before: {
                role: "Junior Developer",
                company: "StartUp Inc",
                salary: "$70,000",
                score: 58,
                issues: [
                    "Listed outdated technologies",
                    "Vague project descriptions",
                    "Missing GitHub/Portfolio links",
                    "No focus on system design skills"
                ]
            },
            after: {
                role: "Senior Full Stack Engineer",
                company: "Global FinTech",
                salary: "$145,000",
                score: 96,
                improvements: [
                    "Highlighted modern stack (React, Node, AWS)",
                    "Detailed technical problem-solving examples",
                    "Integrated project portfolio links",
                    "Emphasized scalable architecture experience"
                ],
                hike: "107%"
            },
            story: "Michael had strong coding skills but his resume didn't reflect his architectural knowledge. Our analysis suggested highlighting complex system migrations. This shift in focus helped him double his salary."
        },
        {
            id: 3,
            name: "Priya Patel",
            role: "Product Owner",
            photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
            before: {
                role: "Business Analyst",
                company: "Consulting Grp",
                salary: "$85,000",
                score: 65,
                issues: [
                    "Task-based bullet points",
                    "Mixed methodologies (Agile/Waterfall)",
                    "Weak leadership signals"
                ]
            },
            after: {
                role: "Lead Product Owner",
                company: "Innovate Health",
                salary: "$130,000",
                score: 92,
                improvements: [
                    "Outcome-based achievements",
                    "Clear Agile/Scrum certification & application",
                    "Strong stakeholder management examples"
                ],
                hike: "53%"
            },
            story: "Priya wanted to transition from analysis to product leadership. ResumeAI recommended restructuring her experience to showcase ownership and strategic decision-making, leading to a significant promotion."
        }
    ];

    const [expandedId, setExpandedId] = useState(1);

    return (
        <Layout>
            <div className="bg-gray-900 min-h-screen py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block p-2 px-4 rounded-full bg-primary-900/30 border border-primary-700/50 text-primary-300 text-sm font-medium mb-4">
                            Real Success Stories
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">
                            See How We Transform Careers
                        </h1>
                        <p className="text-lg text-gray-400">
                            Explore detailed analyses of real candidates who used ResumeAI to optimize their profiles, land better roles, and significantly increase their income.
                        </p>
                    </div>

                    {/* Case Studies */}
                    <div className="space-y-8">
                        {caseStudies.map((study) => (
                            <div
                                key={study.id}
                                className={`bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden transition-all duration-300 ${expandedId === study.id ? 'shadow-2xl ring-1 ring-primary-500/30' : 'hover:border-gray-600'}`}
                            >
                                {/* Summary Header (Always Visible) */}
                                <div
                                    className="p-6 cursor-pointer flex items-center justify-between"
                                    onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={study.photo} alt={study.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-500" />
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{study.name}</h3>
                                            <p className="text-primary-400 font-medium">{study.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:block text-right">
                                            <div className="text-sm text-gray-400">Salary Hike</div>
                                            <div className="text-xl font-bold text-green-400 flex items-center gap-1 justify-end">
                                                <TrendingUp className="w-4 h-4" />
                                                {study.after.hike}
                                            </div>
                                        </div>
                                        {expandedId === study.id ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedId === study.id && (
                                    <div className="border-t border-gray-700 p-8 bg-gray-800/50">
                                        <div className="grid md:grid-cols-2 gap-12">
                                            {/* BEFORE Section */}
                                            <div className="space-y-6 relative">
                                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/20 to-transparent"></div>
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-bold text-red-400 uppercase tracking-wider text-sm">Before Optimization</h4>
                                                    <span className="px-3 py-1 bg-red-900/20 text-red-400 rounded-full text-sm font-bold border border-red-900/30">
                                                        Score: {study.before.score}
                                                    </span>
                                                </div>

                                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                                                    <div className="flex items-center gap-2 mb-4 text-gray-300">
                                                        <Briefcase className="w-4 h-4" />
                                                        <span>{study.before.role} at {study.before.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-6 text-gray-300">
                                                        <DollarSign className="w-4 h-4" />
                                                        <span>{study.before.salary}</span>
                                                    </div>

                                                    <h5 className="font-semibold text-gray-200 mb-3 text-sm">Key Issues Identified:</h5>
                                                    <ul className="space-y-2">
                                                        {study.before.issues.map((issue, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                                                {issue}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* AFTER Section */}
                                            <div className="space-y-6 relative">
                                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/20 to-transparent hidden md:block"></div>
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-bold text-green-400 uppercase tracking-wider text-sm">After Optimization</h4>
                                                    <span className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-sm font-bold border border-green-900/30">
                                                        Score: {study.after.score}
                                                    </span>
                                                </div>

                                                <div className="bg-gray-900/50 p-6 rounded-xl border border-green-900/30 shadow-[0_0_15px_rgba(74,222,128,0.05)]">
                                                    <div className="flex items-center gap-2 mb-4 text-gray-100 font-medium">
                                                        <Briefcase className="w-4 h-4 text-green-400" />
                                                        <span>{study.after.role} at {study.after.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-6 text-gray-100 font-medium">
                                                        <DollarSign className="w-4 h-4 text-green-400" />
                                                        <span>{study.after.salary}</span>
                                                    </div>

                                                    <h5 className="font-semibold text-gray-200 mb-3 text-sm">Improvements Made:</h5>
                                                    <ul className="space-y-2">
                                                        {study.after.improvements.map((imp, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                                                {imp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-8 border-t border-gray-700">
                                            <h4 className="font-semibold text-white mb-2">The Transformation</h4>
                                            <p className="text-gray-400 leading-relaxed italic border-l-4 border-primary-500 pl-4">
                                                "{study.story}"
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button onClick={() => window.location.href = '/#upload-section'} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 active:scale-95 inline-flex items-center gap-2">
                            Transform Your Resume Now <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SampleReport;
