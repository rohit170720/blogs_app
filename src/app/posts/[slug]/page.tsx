import { Blog } from "@/lib/types";
import Image from "next/image";
import defaultImage from "@/asset/Blog_image.png";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPostBySlug(slug: string): Promise<{ blog: Blog } | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
      {
        cache: "no-store",
      }
    );
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
        <p className='text-sm text-gray-500 mb-2'>
          {post.blog.blog_author
            ? `By ${post.blog.blog_author}`
            : "By Anonymous"}
        </p>
        <p className='text-sm text-gray-500 mb-4'>
          {new Date(post.blog.$createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className='mb-4'>
          <Image
            alt='Uploaded Image'
            width={200}
            height={200}
            className='w-full h-48 object-cover rounded-lg'
            src={defaultImage}
          />
        </div>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Description</h2>
        <div className='text-gray-700 text-base md:text-lg leading-relaxed'>
          {post.blog.blog_desc}
        </div>
      </article>
    </main>
  );
}
