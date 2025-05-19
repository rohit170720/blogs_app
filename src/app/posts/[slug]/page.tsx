import { Blog } from "@/lib/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPostBySlug(slug: string): Promise<{ blog: Blog } | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post || !post.blog) {
    return (
      <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
        <div className='bg-white rounded-lg shadow-md p-8 max-w-xl w-full text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            Blog Not Found
          </h1>
          <p className='text-gray-600'>
            Sorry, the blog post you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='flex flex-col items-center min-h-screen bg-gray-50 px-4 py-8'>
      <article className='bg-white rounded-lg shadow-md p-8 max-w-2xl w-full'>
        <h1 className='text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 break-words'>
          {post.blog.blog_title}
        </h1>
        <div className='text-gray-700 text-base md:text-lg leading-relaxed'>
          {post.blog.blog_desc}
        </div>
      </article>
    </main>
  );
}
