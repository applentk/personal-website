"use client"

import { ComponentProps, ReactNode, SubmitEvent, useState } from "react";
import { createPost } from "../../queries";

interface PostCreateDialogButtonProps extends ComponentProps<"button"> {
  children: ReactNode
}

export function PostCreateDialogButton({ children, className }: PostCreateDialogButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={ () => setIsOpen(true) }
        className={ `px-3 py-1 border hover:bg-gray-200 ${ className }` }
      >
        { children }
      </button>
      <PostCreateDialog
        isOpen={ isOpen }
        onClickClose={ () => setIsOpen(false) } />
    </>
  );
} 

interface PostCreateDialogProps {
  isOpen: boolean
  onClickClose: () => void
}

export function PostCreateDialog({ isOpen, onClickClose }: PostCreateDialogProps) {
  if (!isOpen) return null;

  async function onSubmitForm(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await createPost(title, content);
    onClickClose();
  }

  return (
    <div
      onClick={ onClickClose }
      className="absolute w-screen h-screen top-0 left-0 bg-black/40 flex items-center justify-center"
    >
      <div
        onClick={ (e) => e.stopPropagation() }
        className="flex flex-col bg-white p-4 w-xl h-96"
      >
        <form className="flex flex-col grow" onSubmit={ onSubmitForm }>
          <label htmlFor="title">
            title
          </label>
          <input
            name="title"
            type="text"
            className="border p-1"
          />
          <label htmlFor="content" className="mt-2">
            content
          </label>
          <textarea
            name="content"
            className="border grow resize-none p-1"
          />
          <input
            type="submit"
            value="post"
            className="border mt-2 py-1 hover:bg-gray-100"
          />
        </form>
      </div>
    </div>
  );
}