import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Award } from 'lucide-react';

const AnalysisResults = ({ results }) => {
    if (!results) return null;

    const { score, matchLevel, improvements, atsTips } = results;

    const getScoreColor = (s) => {
        if (s >= 80) return 'text-green-400 bg-green-900/30 border-green-800';
        if (s >= 60) return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
        return 'text-red-400 bg-red-900/30 border-red-800';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Card */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Match Analysis</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(score)}`}>
                        {matchLevel}
                    </span>
                </div>

                <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-100">{score}</span>
                    <span className="text-gray-400 mb-2">/ 100</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-primary-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Improvements */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                        <h3 className="text-lg font-semibold text-gray-100">Improvements Needed</h3>
                    </div>
                    <ul className="space-y-3">
                        {improvements.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ATS Tips */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-gray-100">ATS Optimization</h3>
                    </div>
                    <ul className="space-y-3">
                        {atsTips.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action Plan */}
            <div className="bg-indigo-900/20 rounded-xl border border-indigo-800 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-indigo-100">Recommended Next Steps</h3>
                </div>
                <p className="text-indigo-200 text-sm">
                    Based on your score, we recommend rewriting your summary to include more keywords from the job description and quantifying your achievements in the experience section.
                </p>
            </div>
        </div>
    );
};

export default AnalysisResults;
