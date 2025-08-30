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
