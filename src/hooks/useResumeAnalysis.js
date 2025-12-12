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

            // Mock Analysis Logic
            // In a real app, this would send data to a backend/LLM

            const mockScore = Math.floor(Math.random() * (95 - 60) + 60); // Random score between 60 and 95

            let matchLevel = 'Low';
            if (mockScore >= 80) matchLevel = 'High';
            else if (mockScore >= 60) matchLevel = 'Medium';

            const mockResults = {
                score: mockScore,
                matchLevel,
                improvements: [
                    "Missing key technical skills mentioned in JD (e.g., 'React', 'TypeScript').",
                    "Summary section is too generic; tailor it to the specific role.",
                    "Experience bullet points lack quantifiable metrics (e.g., 'Increased sales by 20%').",
                    "Formatting inconsistencies found in the Education section."
                ],
                atsTips: [
                    "Use standard headings (Experience, Education, Skills).",
                    "Avoid using tables or columns which can confuse some ATS parsers.",
                    "Ensure the file is text-selectable (not an image scan).",
                    "Incorporate exact keywords from the job description naturally."
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
