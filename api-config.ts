// Backend API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAssetUrl = (type: 'models' | 'images' | 'videos', fileName: string) => {
  return `${API_BASE_URL}/${type}/${fileName}`;
};

export const getModelUrl = (modelName: string) => getAssetUrl('models', modelName);
export const getImageUrl = (imageName: string) => getAssetUrl('images', imageName);
export const getVideoUrl = (videoName: string) => getAssetUrl('videos', videoName);
