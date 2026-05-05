"use client"

import { Placeholder } from "@tiptap/extensions"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { SlashCommand } from "../extensions/slash-command"
import SlashCommandMenu from "./slash-command-menu"

interface TiptapEditorProps {
  placeholder?: string
  defaultContent: string | null
  onUpdate?: (content: string) => void
}

export default function TiptapEditor({ placeholder, defaultContent, onUpdate }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `Heading ${node.attrs.level}`
          }

          if (node.type.name === "codeBlock") {
            return ""
          }

          return placeholder || ""
        },
        showOnlyWhenEditable: true,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-300 before:float-left before:h-0 before:pointer-events-none",
      }),
      SlashCommand,
    ],
    content: JSON.parse(defaultContent || "{}"),
    onUpdate: ({ editor }) => onUpdate?.(JSON.stringify(editor.getJSON())),
    immediatelyRender: false,
  })

  return (
    <div className="relative">
      <EditorContent editor={ editor } className="font-serif" />
      { editor &&
        <SlashCommandMenu
          editor={ editor }
        />
      }
    </div>
  )
}
