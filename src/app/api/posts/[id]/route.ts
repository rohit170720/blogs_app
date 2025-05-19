import { databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID!,
      params.id
    );
    return NextResponse.json({ blog: document });
  } catch (error) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
}
