import { Blog } from "@/lib/types";
import React from "react";
import Link from "next/link";
import { createExcerpt } from "@/lib/utils";

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <>
      <h2 className='text-xl font-semibold text-blue-700 mb-2'>
        {createExcerpt(blog?.blog_title, 50)}
      </h2>

      <p className='text-gray-700 mb-4'>
        {createExcerpt(blog?.blog_desc, 100)}
      </p>
      <Link
        href={`/posts/${blog.$id}`}
        className='inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Read More
      </Link>
    </>
  );
}

export default BlogCard;
