"use client"

import { Editor } from "@tiptap/react"
import { useEffect, useRef, useState, useCallback } from "react"
import { slashCommandPluginKey } from "../extensions/slash-command"
import { getUploadUrl } from "@/utils/s3"

interface Command {
  title: string
  markdownQuery: string
  icon: string
  action: (editor: Editor, range: { from: number; to: number }, postId: string) => void
}

const COMMANDS: Command[] = [
  {
    title: "Heading 1",
    markdownQuery: "#",
    icon: "H1",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
    },
  },
  {
    title: "Heading 2",
    markdownQuery: "##",
    icon: "H2",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run()
    },
  },
  {
    title: "Heading 3",
    markdownQuery: "###",
    icon: "H3",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run()
    },
  },
  {
    title: "Bullet List",
    markdownQuery: "-",
    icon: "•",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: "Numbered List",
    markdownQuery: "1.",
    icon: "1.",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: "Blockquote",
    markdownQuery: ">",
    icon: "❝",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setBlockquote().run()
    },
  },
  {
    title: "Code Block",
    markdownQuery: "```",
    icon: "</>",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run()
    },
  },
  {
    title: "Divider",
    markdownQuery: "---",
    icon: "—",
    action: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
  {
    title: "Image",
    markdownQuery: "image",
    icon: "IMG",
    action: (editor, range, postId) => {
      editor.chain().focus().deleteRange(range).run()
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = async () => {
        const file = input.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        
        const key = `posts/${postId}/${file.name}`
        const url = await getUploadUrl(key, file.type);

        await fetch(url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        const publicUrl = `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${key}`
        editor.chain().focus().insertContent({ type: "image", attrs: { src: publicUrl } }).run()
      }
      input.click()
    },
  },
]

interface SlashCommandMenuProps {
  editor: Editor
  postId: string
}

export default function SlashCommandMenu({ editor, postId }: SlashCommandMenuProps) {
  const [state, setState] = useState({ active: false, query: "", range: { from: 0, to: 0 } })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      state.query === "" ||
      cmd.title.toLowerCase().includes(state.query.toLowerCase())
  )

  const runCommand = useCallback(
    (index: number) => {
      const cmd = filteredCommands[index]
      if (!cmd) return
      cmd.action(editor, state.range, postId)
    },
    [filteredCommands, editor, state.range, postId]
  )

  // Subscribe to plugin state changes
  useEffect(() => {
    if (!editor) return

    const update = () => {
      const pluginState = slashCommandPluginKey.getState(editor.state)
      if (!pluginState) return

      setState({
        active: pluginState.active,
        query: pluginState.query,
        range: pluginState.range,
      })

      if (pluginState.active) {
        setSelectedIndex(0)

        // Position the menu at the cursor
        const { from } = pluginState.range
        const coords = editor.view.coordsAtPos(from)
        const editorDom = editor.view.dom
        const editorRect = editorDom.getBoundingClientRect()

        setPosition({
          top: coords.bottom - editorRect.top + editorDom.scrollTop + 4,
          left: coords.left - editorRect.left,
        })
      }
      else {
        setPosition(null)
      }
    }

    editor.on("transaction", update)
    return () => {
      editor.off("transaction", update)
    }
  }, [editor])

  // Keyboard navigation
  useEffect(() => {
    if (!state.active) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filteredCommands.length)
      }
      else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length)
      }
      else if (e.key === "Enter") {
        e.preventDefault()
        runCommand(selectedIndex)
      }
    }

    // Use capture so we intercept before TipTap's keymap
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [state.active, filteredCommands.length, selectedIndex, runCommand])

  if (!state.active || !position || filteredCommands.length === 0) return null

  return (
    <div
      ref={menuRef}
      className="absolute z-50 min-w-64 border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      style={{ top: position.top, left: position.left }}
    >
      <div className="p-2">
        <p className="px-2 py-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          BLOCKS
        </p>
        {filteredCommands.map((cmd, i) => (
          <button
            key={cmd.title}
            onMouseDown={(e) => {
              e.preventDefault()
              runCommand(i)
            }}
            className={`flex w-full items-center gap-3 px-2 py-1.5 text-left transition-colors ${
              i === selectedIndex
                ? "bg-zinc-100 dark:bg-zinc-800"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {cmd.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {cmd.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {cmd.markdownQuery}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
