
import React from 'react';
import { YouTubeVideo } from '../types';
import { PlayIcon, CloseIcon } from './icons';

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: YouTubeVideo[];
  onPlay: (video: YouTubeVideo) => void;
  onRemove: (video: YouTubeVideo) => void;
}

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({ isOpen, onClose, favorites, onPlay, onRemove }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 w-full max-w-md h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Favorites</h2>
          <button onClick={onClose} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-65px)] p-4">
          {favorites.length > 0 ? (
            <ul className="space-y-4">
              {favorites.map((video) => (
                <li key={video.id} className="flex items-center gap-4 group">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-24 h-16 object-cover rounded-lg" />
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{video.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{video.channelTitle}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onPlay(video)} className="p-2 text-indigo-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <PlayIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onRemove(video)} className="p-2 text-red-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center pt-10">
              <p className="text-gray-500 dark:text-gray-400">Your favorites list is empty.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Click the heart icon on a video to save it.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default FavoritesSidebar;
