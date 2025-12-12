import { useState } from 'react';

const useResumeAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const analyzeResume = async (file, jobDescription) => {
        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (!file || !jobDescription) {
                throw new Error("Please provide both a resume and a job description.");
            }

            // Generate a random score between 60 and 85
            const score = Math.floor(Math.random() * (85 - 60 + 1)) + 60;

            let matchLevel = 'Medium';
            if (score >= 80) matchLevel = 'High';
            else if (score < 60) matchLevel = 'Low';

            // Generic feedback that always applies
            const mockResults = {
                score: score,
                matchLevel,
                improvements: [
                    "Tailor your professional summary to highlight the specific skills mentioned in the job description.",
                    "Quantify your achievements in current and past roles (e.g., 'Improved performance by 20%').",
                    "Ensure your skills section includes relevant technical keywords from the job posting.",
                    "Check for any formatting inconsistencies in the Experience section."
                ],
                atsTips: [
                    "Use standard headings (Experience, Education, Skills) for better ATS parsing.",
                    "Avoid using tables, columns, or graphics which can confuse automated systems.",
                    "Stick to standard fonts like Arial, Calibri, or Helvetica.",
                    "Ensure your contact information is easy to find and not in the header/footer."
                ]
            };

            setResults(mockResults);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return {
        analyzeResume,
        isAnalyzing,
        results,
        error
    };
};

export default useResumeAnalysis;
