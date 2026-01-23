import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Header } from "./header.content"

const meta = {
  title: "shared/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "en",
  },
  render: () => (
    <div className="h-screen w-screen px-10 py-8">
      <Header locale="en" />
    </div>
  ),
}
