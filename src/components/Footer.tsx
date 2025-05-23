import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='text-center py-4 bg-gray-100'>
      &copy; {currentYear} Blogs App. All rights reserved.
    </footer>
  );
};

export default Footer;
