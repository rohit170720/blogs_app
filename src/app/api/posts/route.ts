import { databases } from "@/lib/appwrite";
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
