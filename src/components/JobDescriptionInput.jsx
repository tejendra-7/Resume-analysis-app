import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <label htmlFor="job-description" className="block text-sm font-medium text-gray-300 mb-2">
                Job Description
            </label>
            <textarea
                id="job-description"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full flex-grow min-h-[200px] p-4 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-shadow text-sm leading-relaxed placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-2 text-right">
                {value.length} characters
            </p>
        </div>
    );
};

export default JobDescriptionInput;
