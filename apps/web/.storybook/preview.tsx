import type { Preview } from "@storybook/nextjs-vite"

import "../src/styles/tailwind.css"
import React from "react"
import RootProvider from "../src/providers/root"

const preview: Preview = {
  decorators: [
    (Story) => (
      <RootProvider locale="en">
        <Story />
      </RootProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
