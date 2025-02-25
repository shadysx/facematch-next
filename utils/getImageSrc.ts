export const getImageSrc = (imageData: string) => {
  return imageData.startsWith("http")
    ? imageData
    : `data:image/jpeg;base64,${imageData}`;
};
