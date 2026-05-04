import { PostCreateDialogButton } from "@/features/posts/components/backend/post-create-dialog";
import { PostTable } from "@/features/posts/components/backend/post-table";
import { getAllPosts } from "@/features/posts/queries";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">
        Post
      </h1>

      <PostCreateDialogButton className="ml-auto mt-2">
        say something
      </PostCreateDialogButton>
      
      <PostTable
        posts={ posts }
        className="mt-4"
      />
    </div>
  );
}