// Backend API configuration


// Local asset configuration — serve files directly from `public/`

export const getModelUrl = (modelName: string) => `/3d-model/${modelName}`;
export const getImageUrl = (imageName: string) => `/images/${imageName}`;
export const getVideoUrl = (videoName: string) => `/${videoName}`;

// Backwards-compatible helpers if code still passes full paths
export const getAssetUrl = (type: 'models' | 'images' | 'videos', fileName: string) => {
  if (type === 'models') return getModelUrl(fileName);
  if (type === 'images') return getImageUrl(fileName);
  return getVideoUrl(fileName);
};
