import React from 'react';
import { VideoInfo } from '../types';
import { DownloadIcon } from './icons';

interface VideoDetailsProps {
  videoInfo: VideoInfo;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoInfo }) => {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in mt-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img 
            className="h-48 w-full object-cover md:w-64" 
            src={videoInfo.thumbnailUrl} 
            alt={videoInfo.title} 
          />
        </div>
        <div className="p-6 flex-grow">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">{videoInfo.channelTitle}</div>
          <h2 className="block mt-1 text-xl leading-tight font-bold text-black dark:text-white">{videoInfo.title}</h2>
          
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Available Formats:</h3>
            <ul className="space-y-2">
              {videoInfo.formats.map((format, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 w-16">{format.quality}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{format.format}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{format.size}</span>
                  </div>
                  <button 
                    disabled 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md shadow-sm opacity-50 cursor-not-allowed"
                    title="Direct downloads require a server-side component."
                  >
                    <DownloadIcon />
                    Download
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Note: Direct downloads require a server-side component which is not available in this environment. These links are for demonstration purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;