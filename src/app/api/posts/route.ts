import { databases } from "@/lib/appwrite";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID!
  );
  if (data.documents.length === 0) {
    return NextResponse.json({ message: "No blogs found" }, { status: 404 });
  }
  const blogs = data.documents;
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  const { blog_title, blog_desc, blog_image, blog_author } =
    await request.json();
  const document = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID!,
    "unique()",
    {
      blog_title,
      blog_desc,
      blog_author,
      blog_image,
    }
  );
  if (document) {
    revalidateTag("blogs");
  }
  return NextResponse.json({ blog: document });
}
