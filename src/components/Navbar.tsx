import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className='bg-blue-700 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-8'>
            <Link
              href='/'
              className='text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1'
              aria-label='Home'
            >
              Home
            </Link>
            <Link
              href='/new-post'
              className='text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1'
              aria-label='Create New Post'
            >
              New Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
