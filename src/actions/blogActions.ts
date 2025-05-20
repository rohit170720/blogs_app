"use server";
import { ID, storage } from "@/lib/appwrite";
import { ImageFile } from "@/lib/types";
import { revalidateTag } from "next/cache";

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
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      // cache: "force-cache",
      next: { tags: ["blogs"] },
    });
    if (!res.ok) {
      return { error: "Failed to fetch blogs" };
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return { error: "Failed to fetch blogs" };
  }
}

export async function postBlog(blogData: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: blogData,
      }
    );

    const data = await response.json();
    console.log(response, data);

    if (!!response.ok) {
      revalidateTag("blogs");
      return { ok: true, data };
    } else {
      return { ok: false, message: "Failed to create blog" };
    }
  } catch (err) {
    console.log(err);
    return { ok: false, message: "Failed to create blog" };
  }
}
