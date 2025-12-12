import React, { useState } from 'react';
import Layout from './Layout';
import ResumeUpload from './ResumeUpload';
import JobDescriptionInput from './JobDescriptionInput';
import AnalysisResults from './AnalysisResults';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import useResumeAnalysis from '../hooks/useResumeAnalysis';
import { ArrowRight, Loader2 } from 'lucide-react';

function Home() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const { analyzeResume, isAnalyzing, results, error } = useResumeAnalysis();

    const handleAnalyze = () => {
        analyzeResume(file, jobDescription);
    };

    return (
        <Layout>
            <Hero />

            <div id="upload-section" className="max-w-4xl mx-auto space-y-8 py-20 px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                        Check Your <span className="text-primary-400">Compatibility</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Upload your resume and the job description below to get started.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-700">
                            <ResumeUpload
                                selectedFile={file}
                                onFileSelect={setFile}
                            />
                        </div>

                        <div className="bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-700 h-[300px] flex flex-col">
                            <JobDescriptionInput
                                value={jobDescription}
                                onChange={setJobDescription}
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={!file || !jobDescription || isAnalyzing}
                            className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2
                ${!file || !jobDescription || isAnalyzing
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-primary-500/30 hover:-translate-y-1'
                                }
              `}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    Analyze Match
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Results or Placeholder */}
                    <div className="space-y-6">
                        {results ? (
                            <AnalysisResults results={results} />
                        ) : (
                            <div className="h-full min-h-[400px] bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-700 rounded-full mb-4 animate-pulse"></div>
                                <p className="font-medium text-gray-400">Results will appear here</p>
                                <p className="text-sm mt-2">Upload a resume and job description to start the analysis.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <HowItWorks />

            <Testimonials />

            <Pricing />
        </Layout>
    );
}

export default Home;
