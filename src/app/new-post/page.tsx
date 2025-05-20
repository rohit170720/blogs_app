import CreateBlog from "@/components/CreateBlog";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create New Post",
  description: "Publish your thoughts and ideas...",
};

function page() {
  return (
    <main>
      <CreateBlog />
    </main>
  );
}

export default page;
