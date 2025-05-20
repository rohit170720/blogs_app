import dynamic from "next/dynamic";
import { Blog } from "@/lib/types";
import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "@/actions/blogActions";

// Dynamically import BlogCard
const BlogCard = dynamic(() => import("@/components/BlogCard"));

export default async function Home() {
  const { blogs } = await getBlogs();

  return (
    <main className='max-w-3xl mx-auto px-4 py-8 relative min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Blogs</h1>
      <Suspense
        fallback={<div className='text-center text-gray-500'>Loading...</div>}
      >
        {!!blogs && blogs.length > 0 ? (
          <ul className='space-y-4'>
            {blogs.map((blog: Blog) => (
              <li
                key={blog.$id}
                className='bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 focus-within:ring-2 focus-within:ring-blue-500 flex flex-col sm:flex-row items-center sm:items-start gap-4'
                tabIndex={0}
                aria-label={`Blog: ${blog.blog_title}`}
              >
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-center text-gray-500'>No blogs found.</div>
        )}
      </Suspense>

      {/* Sticky Circular Button */}
      <Link
        href='/new-post'
        className='fixed bottom-8 right-8 z-50 group'
        aria-label='Create new post'
      >
        <span className='flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 transform group-hover:scale-110 group-hover:bg-blue-700 group-active:scale-95 border-4 border-white hover:shadow-2xl'>
          <svg
            className='w-7 h-7'
            fill='none'
            stroke='currentColor'
            strokeWidth={2.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4v16m8-8H4'
            />
          </svg>
        </span>
      </Link>
    </main>
  );
}
