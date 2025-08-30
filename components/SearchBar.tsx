import React, { useState } from 'react';

interface UrlInputFormProps {
  onFetch: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onFetch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onFetch(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-center gap-2">
      <div className="relative flex-grow">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube video link here..."
          className="w-full px-5 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
          disabled={isLoading}
          aria-label="YouTube video URL"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Get Links'}
      </button>
    </form>
  );
};

export default UrlInputForm;