import { useState } from 'react';

// Common keywords to look for to enhance matching logic
const COMMON_TECH_STACK = [
    'React', 'Angular', 'Vue', 'Node.js', 'Python', 'Java', 'C++', 'AWS', 'Azure',
    'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
    'Git', 'CI/CD', 'Agile', 'Scrum', 'Leadership', 'Communication', 'Problem Solving',
    'Machine Learning', 'AI', 'Data Analysis', 'Project Management', 'Rest API', 'GraphQL',
    'Tailwind', 'Sass', 'Redux', 'Context API', 'MongoDB', 'PostgreSQL', 'Firebase', 'Next.js'
];

const useResumeAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    // Helper to read file content as text
    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsText(file);
        });
    };

    // Helper to extract relevant keywords from Job Description
    const extractKeywords = (text) => {
        if (!text) return [];

        // 1. Find words from our known tech stack list
        const techMatches = COMMON_TECH_STACK.filter(tech =>
            text.toLowerCase().includes(tech.toLowerCase())
        );

        // 2. Find other potential capitalized keywords (simple heuristic for proper nouns)
        // This regex looks for words starting with capital letters, excluding common stop words
        // We match words with at least 3 letters to avoid noise
        const potentialKeywords = text.match(/\b[A-Z][a-zA-Z]{2,}\b/g) || [];

        // Combine and dedup
        const uniqueKeywords = [...new Set([...techMatches, ...potentialKeywords])];

        return uniqueKeywords;
    };

    const analyzeResume = async (file, jobDescription) => {
        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            if (!file || !jobDescription) {
                throw new Error("Please provide both a resume and a job description.");
            }

            // Simulate partial network delay for realism/loading state
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 1. Read files
            // Note: FileReader works well for .txt, .md. 
            // For .pdf, reading as text yields limited results but often contains raw keyword strings if uncompressed.
            // A full production app would use a server-side parser or pdf.js.
            let resumeText = "";
            try {
                resumeText = await readFileAsText(file);
            } catch (e) {
                console.warn("Could not read file text directly", e);
                resumeText = "";
            }

            // 2. Core Analysis Logic
            const jdKeywords = extractKeywords(jobDescription);
            const totalKeywords = jdKeywords.length || 1;

            // Check how many JD keywords exist in the Resume
            const matchedKeywords = jdKeywords.filter(keyword =>
                resumeText.toLowerCase().includes(keyword.toLowerCase())
            );

            const missingKeywords = jdKeywords.filter(keyword =>
                !resumeText.toLowerCase().includes(keyword.toLowerCase())
            );

            // 3. Calculate Score
            // Base score algorithm:
            // 40 points base for submitting
            // + up to 60 points based on keyword coverage
            const matchRatio = matchedKeywords.length / totalKeywords;
            let calculatedScore = Math.floor(40 + (matchRatio * 60));

            // Random jitter (+/- 5) to make it feel less robotic on re-runs of same text
            calculatedScore += Math.floor(Math.random() * 10) - 5;

            // Cap score
            calculatedScore = Math.min(Math.max(calculatedScore, 0), 100);

            // Handle edge case where file is unreadable (often happens with binary PDFs in FileReader)
            // If we found NO matches but JD had keywords, it's suspicious.
            if (matchedKeywords.length === 0 && totalKeywords > 0) {
                // Check if it's a binary file issue
                if (file.type === "application/pdf") {
                    // Fallback logic: "We detected a PDF but couldn't parse text in-browser perfectly."
                    // For this demo, we'll suggest using .txt or assume a baseline score.
                    calculatedScore = 50;
                }
            }

            // 4. Determine Match Level
            let matchLevel = 'Low';
            if (calculatedScore >= 80) matchLevel = 'High';
            else if (calculatedScore >= 60) matchLevel = 'Medium';

            // 5. Generate Dynamic Improvements
            const improvements = [];

            if (missingKeywords.length > 0) {
                // Determine context-aware missing fields
                const techMissing = missingKeywords.filter(k => COMMON_TECH_STACK.includes(k));
                const generalMissing = missingKeywords.filter(k => !COMMON_TECH_STACK.includes(k));

                if (techMissing.length > 0) {
                    improvements.push(`Missing Critical Skills: ${techMissing.slice(0, 5).join(", ")}. Add these if you possess them.`);
                }

                if (generalMissing.length > 0) {
                    improvements.push(`Consider adding these keywords from the description: ${generalMissing.slice(0, 3).join(", ")}.`);
                }
            } else {
                improvements.push("Excellent keyword coverage! Your resume reflects the job description well.");
            }

            if (resumeText.length < 200 && file.type === 'text/plain') {
                improvements.push("Your resume seems very short. Ensure you elaborate on your experience.");
            }

            // 6. ATS Tips (Static + Dynamic)
            const atsTips = [
                "Use standard headings (Experience, Education, Skills).",
                "Avoid using tables or columns which can confuse some ATS parsers.",
                missingKeywords.length > 0 ? `Incorporate exact keywords: "${missingKeywords[0]}" matches the JD exactly.` : "Keep your keyword density natural.",
                "Ensure the file is text-selectable (not an image scan)."
            ];

            const analysisResults = {
                score: calculatedScore,
                matchLevel,
                improvements,
                atsTips
            };

            setResults(analysisResults);

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
