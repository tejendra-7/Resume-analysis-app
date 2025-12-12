import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';

const ResumeUpload = ({ onFileSelect, selectedFile }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            validateAndSetFile(file);
        }
    }, [onFileSelect]);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file) => {
        // Simple validation for PDF/DOCX
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        if (validTypes.includes(file.type)) {
            onFileSelect(file);
        } else {
            alert('Please upload a PDF or DOCX file.');
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        onFileSelect(null);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Resume
            </label>

            {!selectedFile ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
            relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out cursor-pointer
            flex flex-col items-center justify-center text-center group
            ${isDragging
                            ? 'border-primary-500 bg-primary-900/20'
                            : 'border-gray-600 hover:border-primary-500 hover:bg-gray-700/50'
                        }
          `}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileInput}
                        accept=".pdf,.doc,.docx"
                    />

                    <div className="bg-gray-700 p-3 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-200">
                        <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-primary-400' : 'text-gray-400'}`} />
                    </div>

                    <p className="text-gray-200 font-medium mb-1">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm">
                        PDF, DOCX up to 10MB
                    </p>
                </div>
            ) : (
                <div className="relative border border-gray-700 rounded-xl p-4 bg-gray-800 shadow-sm flex items-center gap-4">
                    <div className="bg-primary-900/50 p-3 rounded-lg">
                        <File className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate">
                            {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <button
                            onClick={removeFile}
                            className="p-1 hover:bg-gray-700 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
