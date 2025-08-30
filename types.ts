/**
 * @interface DownloadFormat
 * Defines the structure for a single downloadable format.
 */
export interface DownloadFormat {
  quality: string;
  format: string;
  size: string;
  url: string; // Placeholder URL
}

/**
 * @interface VideoInfo
 * Defines the structure for the fetched YouTube video information.
 */
export interface VideoInfo {
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  formats: DownloadFormat[];
}

// FIX: Add missing YouTubeVideo interface to resolve compilation errors.
/**
 * @interface YouTubeVideo
 * Defines the structure for a generic YouTube video object.
 */
export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
}
