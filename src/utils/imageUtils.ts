/**
 * Compresses an image to a maximum size while maintaining aspect ratio.
 */
export async function compressImage(base64Str: string, maxWidth = 1024, maxHeight = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Failed to get canvas context');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = reject;
  });
}

/**
 * Adds a watermark to an image.
 */
export async function addWatermark(base64Str: string, text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Failed to get canvas context');

      ctx.drawImage(img, 0, 0);

      // Watermark style
      const fontSize = Math.max(20, img.width / 25);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';

      // Add shadow for better visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillText(text, img.width - 20, img.height - 20);

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = reject;
  });
}

/**
 * Downloads a base64 image.
 */
export function downloadImage(base64Str: string, fileName: string) {
  const link = document.createElement('a');
  link.href = base64Str;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Shares a base64 image using the Web Share API.
 */
export async function shareImage(base64Str: string, fileName: string) {
  if (!navigator.share) {
    alert('Sharing is not supported on this browser.');
    return;
  }

  try {
    const res = await fetch(base64Str);
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: 'image/jpeg' });

    await navigator.share({
      files: [file],
      title: 'IkramiFy FX Creation',
      text: 'Check out this artistic transformation from IkramiFy FX!',
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
}
