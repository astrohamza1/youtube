import React, { useState, useEffect, useCallback } from 'react';
import { VideoInfo } from './types';
import { getVideoInfoAndFormats } from './services/geminiService';
import UrlInputForm from './components/UrlInputForm';
import VideoDetails from './components/VideoDetails';
import ThemeToggle from './components/ThemeToggle';
import { CloseIcon } from './components/icons';

const App: React.FC = () => {
    // State management
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Effect for initializing theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
    }, []);

    // Effect for persisting theme to localStorage and updating the DOM
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Theme toggling function
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    // Fetch handler for getting video info
    const handleFetch = useCallback(async (url: string) => {
        setIsLoading(true);
        setError(null);
        setVideoInfo(null);

        // Basic URL validation
        try {
             new URL(url);
             if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
                throw new Error();
             }
        } catch (_) {
            setError("Please enter a valid YouTube URL.");
            setIsLoading(false);
            return;
        }

        try {
            const results = await getVideoInfoAndFormats(url);
            setVideoInfo(results);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            setVideoInfo(null);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    // Simple spinner component
    const LoadingSpinner: React.FC = () => (
        <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
    );
    
    // Error display component
    const ErrorDisplay: React.FC<{ message: string; onClear: () => void }> = ({ message, onClear }) => (
      <div className="w-full max-w-2xl mt-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative flex justify-between items-center animate-fade-in" role="alert">
        <span className="block sm:inline">{message}</span>
        <button onClick={onClear} className="p-1" aria-label="Close error message">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    );

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans flex flex-col items-center p-4 pt-12 md:pt-20">
            <div className="fixed top-4 right-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                VidFetch Pro
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Paste a YouTube URL to instantly get video details and download options.
            </p>
            
            <UrlInputForm onFetch={handleFetch} isLoading={isLoading} />
            
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} onClear={() => setError(null)} />}
            {videoInfo && <VideoDetails videoInfo={videoInfo} />}
        </div>
    );
};

export default App;