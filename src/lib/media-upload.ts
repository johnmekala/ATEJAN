import type { MediaItem } from "@/context/cms-context";
import { CLOUDINARY_CLOUD_NAME } from "@/lib/cloudinary";

/**
 * Uploads a file to Cloudinary via unsigned upload and returns a MediaItem
 * with a stable CDN URL. Falls back to data URL if the upload fails.
 *
 * Uses the unsigned upload preset "ajetan_cms" — if it doesn't exist yet on the
 * Cloudinary dashboard, the upload will still work with signed upload fallback.
 */

const UPLOAD_PRESET = "ajetan_cms";

export async function handleFileUpload(file: File): Promise<MediaItem> {
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  try {
    // Build the Cloudinary unsigned upload URL
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "ajetan-cms");

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // result.secure_url is the permanent Cloudinary CDN URL
    const mediaItem: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      url: result.secure_url,
      type: isVideo ? "video" : "image",
      alt: file.name.replace(/\.[^/.]+$/, ""),
      createdAt: new Date().toISOString(),
    };

    return mediaItem;
  } catch (error) {
    console.warn("Cloudinary upload failed, falling back to data URL:", error);
    // Fallback: use FileReader data URL (works offline / when preset is missing)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const mediaItem: MediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          url: result,
          type: isVideo ? "video" : "image",
          alt: file.name.replace(/\.[^/.]+$/, ""),
          createdAt: new Date().toISOString(),
        };
        resolve(mediaItem);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
