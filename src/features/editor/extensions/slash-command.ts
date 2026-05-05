import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"

export interface SlashCommandState {
  active: boolean
  query: string
  range: { from: number; to: number }
  decorationId: string
}

const pluginKey = new PluginKey<SlashCommandState>("slashCommand")

export { pluginKey as slashCommandPluginKey }

export const SlashCommand = Extension.create({
  name: "slashCommand",
  addProseMirrorPlugins: () => {
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init(): SlashCommandState {
            return { active: false, query: "", range: { from: 0, to: 0 }, decorationId: "" }
          },

          apply(tr, prev): SlashCommandState {
            const meta = tr.getMeta(pluginKey)
            if (meta) return meta

            if (!tr.docChanged && !tr.selectionSet) return prev

            const { selection } = tr
            const { $from } = selection

            if (selection.from !== selection.to) {
              return { active: false, query: "", range: { from: 0, to: 0 }, decorationId: "" }
            }

            const textBefore = $from.parent.textBetween(
              Math.max(0, $from.parentOffset - 100),
              $from.parentOffset,
              undefined,
              "-"
            )

            const slashMatch = /\/([\w ]*)$/.exec(textBefore)

            if (!slashMatch) {
              if (prev.active) {
                return { active: false, query: "", range: { from: 0, to: 0 }, decorationId: "" }
              }
              return prev
            }

            const slashIndex = $from.pos - slashMatch[0].length
            return {
              active: true,
              query: slashMatch[1],
              range: { from: slashIndex, to: $from.pos },
              decorationId: `slash-${Date.now()}`,
            }
          },
        },

        props: {
          handleKeyDown(view, event) {
            const state = pluginKey.getState(view.state)
            if (!state?.active) return false

            if (event.key === "Escape") {
              view.dispatch(
                view.state.tr.setMeta(pluginKey, {
                  active: false,
                  query: "",
                  range: { from: 0, to: 0 },
                  decorationId: "",
                })
              )
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})
