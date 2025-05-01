// export function scaleObjectToScreen (screenWidth, screenHeight, gameObject, scaleFactor = 0.1) {
//   const targetHeight = screenHeight * scaleFactor;
//   const scale = targetHeight / gameObject.height;

//   gameObject.setScale(scale);
// }

export function scaleObjectToScreen (screenWidth, screenHeight, object, scaleFactor) {
  // Reference dimensions (based on original game resolution: 1280x720)
  const refWidth = 1280;
  const refHeight = 720;

  // Calculate scaling ratios
  const widthRatio = screenWidth / refWidth;
  const heightRatio = screenHeight / refHeight;
  // Use the smaller ratio to maintain aspect ratio and avoid distortion
  const baseScale = Math.min(widthRatio, heightRatio);

  // Apply scaling to object size
  if (object && typeof object.setScale === 'function') {
    const targetScale = scaleFactor * baseScale;
    object.setScale(targetScale);
  }

  // Return the baseScale for use in position/velocity calculations
  return baseScale;
}

export function scaleValue (value, baseScale) {
  // Scale a value (e.g., position, velocity) based on the baseScale
  return value * baseScale;
}
