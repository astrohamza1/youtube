
import React from 'react';
import { YouTubeVideo } from '../types';
import { HeartIcon, PlayIcon } from './icons';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  onToggleFavorite: (video: YouTubeVideo) => void;
  isFavorite: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay, onToggleFavorite, isFavorite }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <button
            onClick={() => onPlay(video)}
            className="p-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
            aria-label={`Play ${video.title}`}
          >
            <PlayIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold text-gray-900 dark:text-white truncate" title={video.title}>
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{video.channelTitle}</p>
      </div>
      <button
        onClick={() => onToggleFavorite(video)}
        className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
          isFavorite
            ? 'text-red-500 bg-white/50'
            : 'text-white bg-black/30 opacity-0 group-hover:opacity-100'
        }`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoCard;
