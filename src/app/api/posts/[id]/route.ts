import { databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_BLOGS_COLLECTION_ID!,
      id
    );
    return NextResponse.json({ blog: document });
  } catch (_error) {
    console.log(_error);
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
}
