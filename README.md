# 🚀 ResumeAI - AI-Powered Resume Analyzer

![ResumeAI Hero](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop) 

ResumeAI is a modern, fast, and intelligent web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). By analyzing the resume against a specific job description, it provides a compatibility score, detailed improvement suggestions, and keyword optimization tips to significantly increase interview chances.

## ✨ Key Features

- **📄 Resume Parsing**: Upload resumes (PDF/DOCX) and extract key information instantly.
- **🤖 AI Compatibility Scoring**: Get a real-time score (0-100) based on how well your resume matches the job description.
- **🎯 ATS Optimization**: Identify missing keywords and formatting issues that might get your resume rejected by bots.
- **📊 Detailed Insights**: 
  - **Match Analysis**: Visual score breakdown.
  - **Improvement Tips**: Actionable advice to fix specific sections.
  - **ATS Tips**: Technical recommendations for better parsing.
- **💡 Real Success Stories**: View detailed "Before & After" case studies of successful candidates.
- **🎨 Premium UI/UX**: Built with a "Neo-Professional" dark theme, glassmorphism effects, and smooth animations using Tailwind CSS.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Vercel ready

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resume-analysis-app.git
   cd resume-analysis-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to see the app in action.

## 📂 Project Structure

```bash
src/
├── components/       # Reusable UI components
│   ├── Hero.jsx      # Landing page hero section with animations
│   ├── ResumeUpload.jsx # File upload functionality
│   ├── AnalysisResults.jsx # Score display and feedback
│   └── SampleReport.jsx # Interactive case studies page
├── hooks/            # Custom React hooks (logic layer)
│   └── useResumeAnalysis.js # Mock AI analysis logic
├── App.jsx           # Main application routing
└── index.css         # Global styles and Tailwind imports
```

## 🔮 Future Improvements

- [ ] Integration with OpenAI/Gemini API for real-time generative feedback.
- [ ] User authentication (Login/Signup) with Firebase.
- [ ] PDF generation for the "Optimized Resume" version.
- [ ] History tab to save previous scans.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

---

Designed & Developed by Tejendra
