export type Blog = {
  blog_title: string;
  blog_desc: string;
  blog_autor: string | null;
  blog_image: string | null;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};
