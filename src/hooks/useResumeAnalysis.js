import { useState } from 'react';

// Enhanced resume analysis hook
// Features:
// - Robust PDF text extraction using pdfjs (dynamic import, client-side)
// - Fuzzy keyword matching (Levenshtein distance) and synonym expansion
// - Section detection (Experience, Education, Skills, Projects)
// - Scoring breakdown: Keyword coverage, Section presence, Readability/length, ATS friendliness
// - Human-friendly analysis text + actionable improvement suggestions

const COMMON_TECH_STACK = [
    'React', 'Angular', 'Vue', 'Node.js', 'Node', 'Python', 'Java', 'C++', 'C#', 'AWS', 'Azure',
    'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'CI/CD',
    'Agile', 'Scrum', 'Leadership', 'Communication', 'Problem Solving', 'Machine Learning', 'AI',
    'Data Analysis', 'Project Management', 'REST', 'REST API', 'GraphQL', 'Tailwind', 'Sass', 'Redux',
    'Context API', 'MongoDB', 'PostgreSQL', 'Firebase', 'Next.js', 'Express', 'Spring', 'Hibernate'
];

// Small synonyms/aliases expansion to increase matching recall
const SYNONYMS = {
    'rest api': ['rest', 'restful', 'rest-api'],
    'node.js': ['node', 'nodejs'],
    'javascript': ['js'],
    'c++': ['cpp'],
    'aws': ['amazon web services'],
    'sql': ['structured query language']
};

// Utility: normalize text
const normalize = (s = '') => s.replace(/[\u2018\u2019\u201C\u201D]/g, '"').replace(/[\n\r\t]+/g, ' ').replace(/[^\w\s\/.+-]/g, ' ').toLowerCase();

// Utility: simple Levenshtein distance for fuzzy matching
const levenshtein = (a = '', b = '') => {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }
    return dp[m][n];
};

const fuzzyIncludes = (text, keyword, fuzzThreshold = 0.25) => {
    // Exact or substring match
    if (text.includes(keyword)) return true;
    // Fuzzy: compute levenshtein normalized by keyword length
    const windowSize = Math.max(keyword.length + 6, keyword.length * 2);
    for (let i = 0; i < Math.max(1, text.length - keyword.length + 1); i++) {
        const slice = text.slice(i, i + keyword.length + 6);
        const dist = levenshtein(slice.slice(0, keyword.length + 2), keyword.slice(0, Math.min(keyword.length + 2, slice.length)));
        if (dist / Math.max(keyword.length, 1) <= fuzzThreshold) return true;
    }
    return false;
};

// Try reading file as text including PDF via pdfjs
const readFile = async (file) => {
    const reader = new FileReader();
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
        return await new Promise((res, rej) => {
            reader.onload = () => res(String(reader.result || ''));
            reader.onerror = () => rej(new Error('Failed to read file as text'));
            reader.readAsText(file);
        });
    }

    // PDF path: attempt to use pdfjs-dist in-browser
    try {
        // dynamic import to avoid bundling requirement; caller environment (CRA/Vite) must support dynamic imports
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        // worker path hint — some bundlers need manual worker setup; we try a fallback if available
        try {
            // eslint-disable-next-line no-undef
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsLib.PDFWorker ? pdfjsLib.PDFWorker : '/pdf.worker.js';
        } catch (e) {
            // ignore worker setup errors — some environments handle it automatically
        }

        const arrayBuffer = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = () => rej(new Error('Failed to read PDF file'));
            r.readAsArrayBuffer(file);
        });

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let p = 1; p <= pdf.numPages; p++) {
            const page = await pdf.getPage(p);
            const content = await page.getTextContent();
            const pageText = content.items.map(i => i.str).join(' ');
            fullText += pageText + '\n';
        }
        return fullText;
    } catch (err) {
        // PDF library isn't available or failed — fallback to binary-to-text attempt
        console.warn('PDF parsing failed in browser, falling back to text read:', err);
        return await new Promise((resolve) => {
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => resolve('');
            reader.readAsText(file);
        });
    }
};

const expandKeywords = (keywords) => {
    const expanded = new Set();
    keywords.forEach(k => {
        const kLower = k.toLowerCase();
        expanded.add(kLower);
        if (SYNONYMS[kLower]) {
            SYNONYMS[kLower].forEach(s => expanded.add(s));
        }
    });
    return Array.from(expanded);
};

const extractKeywordsFromJD = (text) => {
    if (!text) return [];
    // Heuristic: find tech stack tokens + capitalized multiword phrases
    const normalized = normalize(text);
    const tokens = new Set();

    // From known stack
    COMMON_TECH_STACK.forEach(t => {
        if (normalized.includes(t.toLowerCase())) tokens.add(t);
    });

    // From phrases: pick common multi-word patterns (e.g., "machine learning", "rest api")
    const phraseMatches = normalized.match(/\b[a-z]{2,}(?:\s+[a-z]{2,}){0,3}\b/g) || [];
    phraseMatches.forEach(p => {
        if (p.length > 2 && p.split(' ').length <= 4) tokens.add(p);
    });

    return Array.from(tokens).slice(0, 80); // limit
};

const detectSections = (text) => {
    const headings = ['experience', 'work experience', 'professional experience', 'education', 'skills', 'projects', 'certifications', 'summary', 'objective'];
    const sections = {};
    const lower = text.toLowerCase();
    headings.forEach(h => {
        const idx = lower.indexOf(h);
        if (idx !== -1) sections[h] = true;
    });
    return sections;
};

const computeReadabilityScore = (text) => {
    // Very simple heuristic: length + average sentence length
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[\.\!\?]+/).filter(Boolean).length || 1;
    const avgSentence = words / sentences;
    // score 0-100: prefer 300-1000 words and avgSentence between 8-18
    const lengthScore = Math.max(0, Math.min(100, ((Math.min(words, 1000) / 1000) * 100)));
    const sentenceScore = Math.max(0, Math.min(100, (1 - Math.abs(avgSentence - 12) / 20) * 100));
    return Math.round((lengthScore * 0.6) + (sentenceScore * 0.4));
};

const useEnhancedResumeAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const analyzeResume = async (file, jobDescriptionText) => {
        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            if (!file || !jobDescriptionText) throw new Error('Please provide both a resume file and a job description.');

            const rawResumeText = String(await readFile(file) || '');
            const resumeText = normalize(rawResumeText);
            const jdText = normalize(jobDescriptionText);

            // Extract keywords from JD + expand synonyms
            const jdKeywords = extractKeywordsFromJD(jobDescriptionText);
            const jdKeywordsExpanded = expandKeywords(jdKeywords.map(k => k.toLowerCase()));

            // Match keywords with fuzzy logic
            const matched = [];
            const missing = [];
            jdKeywordsExpanded.forEach(k => {
                // direct substring or fuzzy
                const found = resumeText.includes(k) || fuzzyIncludes(resumeText, k, 0.22);
                if (found) matched.push(k);
                else missing.push(k);
            });

            // Also try to match known stack more generously
            const stackMatches = COMMON_TECH_STACK.filter(t => resumeText.includes(t.toLowerCase()) || fuzzyIncludes(resumeText, t.toLowerCase(), 0.18));

            // Section detection
            const sections = detectSections(rawResumeText);
            const sectionBonus = Math.min(20, Object.keys(sections).length * 5); // up to +20

            // Readability / length score
            const readability = computeReadabilityScore(rawResumeText);

            // Keyword coverage score (0-60)
            const coverageRatio = jdKeywordsExpanded.length ? (matched.length / jdKeywordsExpanded.length) : 1;
            const keywordScore = Math.round(Math.min(60, coverageRatio * 60));

            // Stack score (0-10)
            const stackScore = Math.round(Math.min(10, stackMatches.length / Math.max(1, COMMON_TECH_STACK.length) * 10));

            // ATS friendliness heuristics (0-10)
            let atsScore = 10;
            if (rawResumeText.length < 300) atsScore -= 5; // too short
            if (/\btable\b|<table>/i.test(rawResumeText)) atsScore -= 3; // likely tables
            if (!/experience|education|skills/i.test(rawResumeText)) atsScore -= 3; // missing headings
            atsScore = Math.max(0, Math.min(10, atsScore));

            // Compose final score (0-100)
            let finalScore = Math.round(keywordScore + sectionBonus + (readability * 0.1) + stackScore + atsScore);
            finalScore = Math.max(0, Math.min(100, finalScore));

            // Determine match level
            let matchLevel = 'Low';
            if (finalScore >= 80) matchLevel = 'High';
            else if (finalScore >= 60) matchLevel = 'Medium';

            // Build human-friendly feedback
            const topMatched = Array.from(new Set([...matched, ...stackMatches])).slice(0, 15);
            const topMissing = missing.slice(0, 12);

            const suggestions = [];
            if (topMissing.length > 0) {
                suggestions.push(`Keywords to add (if you have experience): ${topMissing.join(', ')}.`);
            } else {
                suggestions.push('Great — you include most of the JD keywords. Keep them naturally integrated.');
            }

            if (!sections['experience'] && !sections['work experience'] && !sections['professional experience']) {
                suggestions.push('Add a clear "Experience" or "Work Experience" section with bullet points listing achievements and metrics.');
            }

            if (rawResumeText.length < 400) suggestions.push('Your resume is short — expand on projects, responsibilities and measurable outcomes. Aim for 600–900 words for mid-senior roles.');

            if (/picture|photo/.test(rawResumeText.toLowerCase())) {
                suggestions.push('Remove profile photos to improve ATS parsing (unless specifically requested).');
            }

            suggestions.push('Use exact job-title phrasing from the JD once if it matches your role (e.g., "Frontend Engineer" vs "Front-end Developer").');
            suggestions.push('Prefer bullet points with metrics (e.g., "Improved X by 30%"), and avoid dense paragraphs.');

            const analysisText = `Your resume scored ${finalScore}/100 (${matchLevel}).\n` +
                `Keyword coverage: ${Math.round(coverageRatio * 100)}%. Found ${matched.length} of ${jdKeywordsExpanded.length} JD keywords.\n` +
                `Detected sections: ${Object.keys(sections).length ? Object.keys(sections).join(', ') : 'None obvious'}.\n` +
                `Readability score: ${readability}/100.\n\nSuggestions:\n- ${suggestions.join('\n- ')}`;

            // 6. ATS Tips (Dynamic based on specific checks)
            const atsTips = [];
            if (rawResumeText.length < 300) atsTips.push("Increase content length to at least 400-600 words.");
            if (/\btable\b|<table>/i.test(rawResumeText)) atsTips.push("Detected tables which may confuse ATS parsers. Use standard formatting.");
            if (/picture|photo|image/i.test(rawResumeText)) atsTips.push("Avoid embedding images or photos; they are often ignored by ATS.");
            if (missing.length > 0) atsTips.push("Incorporate keywords from the job description naturally into your bullet points.");
            if (!sections['education']) atsTips.push("Ensure you have a clearly labeled 'Education' section.");
            if (atsTips.length < 3) atsTips.push("Use standard system fonts like Arial, Calibri, or Roboto.");
            if (atsTips.length < 4) atsTips.push("Save your resume as a .docx or .pdf (text-optimized, not image-based).");

            const output = {
                score: finalScore,
                matchLevel,
                breakdown: {
                    keywordScore,
                    sectionBonus,
                    readability,
                    stackScore,
                    atsScore
                },
                matched: Array.from(new Set(topMatched)),
                missing: topMissing,
                improvements: suggestions,
                atsTips,
                analysisText,
                parsedText: rawResumeText.slice(0, 12000),
                sections
            };

            setResults(output);

        } catch (err) {
            console.error(err);
            setError(err.message || 'Analysis failed');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return { analyzeResume, isAnalyzing, results, error };
};

export default useEnhancedResumeAnalysis;
