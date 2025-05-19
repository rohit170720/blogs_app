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
