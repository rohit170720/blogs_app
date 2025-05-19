import { Blog } from "@/lib/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createExcerpt } from "@/lib/utils";
import defaultImage from "@/asset/Blog_image.png";

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <>
      <div className='h-full mr-4'>
        <Image
          alt='Uploaded Image'
          width={200}
          height={200}
          className='w-full h-48 object-cover rounded-lg'
          src={defaultImage}
        />
      </div>
      <div className='flex flex-col justify-between h-full'>
        <h2 className='text-xl font-semibold text-blue-700 mb-2'>
          {createExcerpt(blog?.blog_title, 50)}
        </h2>

        <p className='text-gray-700 mb-4'>
          {createExcerpt(blog?.blog_desc, 100)}
        </p>

        <p className='text-sm text-gray-500 mb-2'>
          {blog?.blog_author ? `By ${blog?.blog_author}` : "By Anonymous"}
        </p>
        <p className='text-sm text-gray-500 mb-2'>
          {new Date(blog.$createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Link
          href={`/posts/${blog.$id}`}
          className='inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-fit'
        >
          Read More
        </Link>
      </div>
    </>
  );
}

export default BlogCard;
