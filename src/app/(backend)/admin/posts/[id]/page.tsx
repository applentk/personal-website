import Tiptap from "@/features/editor/components/tiptap";
import { getPost } from "@/features/posts/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostIdPageProps {
  params: Promise<{ id: string }>
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-xl align-middle">
        <Link href={ "/admin/posts" } className="opacity-25 font-light">posts {">"}</Link> { post.title || "Edit Post" }
      </h1>

      <div className="max-w-3xl mx-auto">
        <input
          id="title"
          type="text"
          placeholder="Title"
          defaultValue={ post.title }
          className="resize-none mt-4 w-full align-middle py-2 text-5xl font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
        />

        <Tiptap
          placeholder="Write Something..."
          postId={post.id}
        />
      </div>
    </div>
  );
}