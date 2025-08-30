import { GoogleGenAI, Type } from "@google/genai";
import { VideoInfo } from '../types';

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Defines the JSON schema for the expected response from the Gemini API.
 * This ensures we get a consistent object with video details and format options.
 */
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The official title of the YouTube video.",
    },
    channelTitle: {
      type: Type.STRING,
      description: "The name of the channel that uploaded the video.",
    },
    thumbnailUrl: {
      type: Type.STRING,
      description: "A URL to a high-resolution thumbnail, preferably 'maxresdefault.jpg'.",
    },
    formats: {
      type: Type.ARRAY,
      description: "A list of generated download formats for the video.",
      items: {
        type: Type.OBJECT,
        properties: {
          quality: {
            type: Type.STRING,
            description: "The quality label, e.g., '1080p', '720p', or 'Audio'.",
          },
          format: {
            type: Type.STRING,
            description: "The file format, e.g., 'MP4' or 'MP3'.",
          },
          size: {
            type: Type.STRING,
            description: "An estimated, plausible file size, e.g., '150 MB'.",
          },
          url: {
            type: Type.STRING,
            description: "A placeholder URL, which should be '#'.",
          },
        },
        required: ["quality", "format", "size", "url"],
      },
    },
  },
  required: ["title", "channelTitle", "thumbnailUrl", "formats"],
};

/**
 * Fetches video information and simulated download links using the Gemini API.
 * @param {string} url - The user's YouTube video URL.
 * @returns {Promise<VideoInfo>} A promise that resolves to the video information object.
 */
export const getVideoInfoAndFormats = async (url: string): Promise<VideoInfo> => {
  try {
    const prompt = `
      Analyze the provided YouTube URL and extract key information. The URL is: "${url}".
      You must return a JSON object containing: the video's title, the channel's name, and a URL for a high-quality thumbnail (preferably maxresdefault.jpg).
      Additionally, generate a list of typical download formats available for a YouTube video. This list should include several video resolutions (like 1080p, 720p, 360p) in MP4 format, and one audio-only option in MP3 format. For each format, estimate a plausible file size (e.g., "150 MB", "85 MB", "12 MB").
      The download URLs must be placeholder strings ('#'), as you cannot generate real download links.
      Adhere strictly to the provided JSON schema.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as VideoInfo;
  } catch (error) {
    console.error("Error fetching video info from Gemini:", error);
    throw new Error("Failed to get video details. Please check the URL and try again.");
  }
};