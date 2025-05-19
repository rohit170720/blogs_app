"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { getUrl, uploadImage } from "@/actions/blogActions";
import { ImageFile } from "@/lib/types";
import { get } from "http";

function CreateBlog() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Submit logic here

    let imageUrl: string | null = null;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        imageUrl = await getUrl({
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        });
      }
    }

    const blogData = {
      blog_title: form.title,
      blog_desc: form.description,
      blog_author: form.author || "John Doe",
      blog_image: imageUrl ? imageUrl : null,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      }
    );

    if (!response.ok) {
      alert("Failed to create blog");
      return;
    }
    const data = await response.json();
    if (data) {
      alert("Blog created successfully");
      setForm({ title: "", description: "", author: "" });
      setImage(null);
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 mt-8'
    >
      <h2 className='text-2xl font-bold mb-4 text-center'>Create Blog</h2>
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Title<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={form.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className='text-red-500 text-xs mt-1'>{errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Description<span className='text-red-500'>*</span>
        </label>
        <textarea
          id='description'
          name='description'
          value={form.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className='text-red-500 text-xs mt-1'>{errors.description}</p>
        )}
      </div>
      <div>
        <button
          type='button'
          onClick={() => {
            imagePickerRef.current?.click();
          }}
          className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          {image ? (
            <p className='text-gray-500 text-sm'>Change Image</p>
          ) : (
            <p className='text-gray-500 text-sm'>Upload Image</p>
          )}
        </button>
        {image && (
          <Image
            alt='Uploaded Image'
            width={200}
            height={200}
            className='w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed'
            src={URL.createObjectURL(image)}
            onClick={() => {
              setImage(null);
            }}
          />
        )}
        <input
          className=''
          type='file'
          ref={imagePickerRef}
          hidden
          onChange={(e) => {
            // check if e is an image
            if (!e.target.files![0]?.type.startsWith("image/")) return;
            setImage(e.target.files![0]);
          }}
        />
      </div>
      <div>
        <label
          htmlFor='author'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Author
        </label>
        <input
          type='text'
          id='author'
          name='author'
          value={form.author}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
      </div>
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Submit
      </button>
    </form>
  );
}

export default CreateBlog;
