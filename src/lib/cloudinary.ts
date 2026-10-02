export const CLOUDINARY_CLOUD_NAME =
  import.meta.env["VITE_CLOUDINARY_CLOUD_NAME"] || "hdabfbwu";

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "scale" | "fit" | "thumb" | "crop";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
}

/**
 * Generates an optimized Cloudinary CDN Image URL
 * @param publicId Public ID or image path on Cloudinary (or full URL)
 * @param options Transformation options
 */
export function cloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  if (!publicId) return "";

  // If already a full URL, return directly unless it's a Cloudinary URL to transform
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    if (!publicId.includes("res.cloudinary.com")) {
      return publicId;
    }
  }

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(",");
  const cleanPublicId = publicId.replace(/^\//, "");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${cleanPublicId}`;
}

/**
 * Generates an optimized Cloudinary Video URL
 * @param publicId Public ID of video on Cloudinary
 */
export function cloudinaryVideoUrl(publicId: string): string {
  if (!publicId) return "";
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }
  const cleanPublicId = publicId.replace(/^\//, "");
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${cleanPublicId}`;
}

/**
 * Uploads a local file directly to Cloudinary using unsigned upload preset 'ajetan_cms'
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ajetan_cms");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url || data.url;
}
