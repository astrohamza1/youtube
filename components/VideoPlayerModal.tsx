
import React, { useEffect } from 'react';
import { YouTubeVideo } from '../types';
import { CloseIcon } from './icons';

interface VideoPlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  // Effect to handle 'Escape' key press to close the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-black rounded-lg shadow-2xl w-full max-w-4xl mx-4 transform transition-all duration-300 scale-95 animate-modal-enter">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:scale-110 transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close video player"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
