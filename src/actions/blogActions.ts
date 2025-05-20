import { ID, storage } from "@/lib/appwrite";
import { ImageFile } from "@/lib/types";

export const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_BUCKET_ID!,
    ID.unique(),
    file
  );

  return fileUploaded;
};

export const getUrl = async (image: ImageFile) => {
  const url = await storage.getFilePreview(image.bucketId, image.fileId);
  return url;
};

export async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "force-cache",
    next: { tags: ["blogs"] },
  });
  if (!res.ok) {
    return { error: "Failed to fetch blogs" };
  }
  return res.json();
}
