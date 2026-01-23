import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ArrowTopRightIcon, ChevronTopIcon } from "../icons"

/* Extend Button props with custom Storybook-only args */
type ButtonArgs = React.ComponentProps<typeof Button> & {
  selected?: boolean
}

const meta: Meta<ButtonArgs> = {
  title: "ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean" },
    asChild: { table: { disable: true } },
    selected: { control: "boolean" }, // declare it once
  },
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    children: "contact us",
    disabled: false,
    selected: false,
  },
}

export default meta

type Story = StoryObj<ButtonArgs>

/* Default */
export const Default: Story = {}

/* Outline */
export const Outline: Story = {
  render: (args) => (
    <Button {...args} variant="outline">
      work <ArrowRightIcon className="size-4 text-inherit" />
    </Button>
  ),
}

/* Link */
export const Link: Story = {
  args: { variant: "link" },
  render: (args) => (
    <Button {...args} variant="link">
      click to checkout our work <ArrowTopRightIcon className="size-4 text-inherit" />
    </Button>
  ),
}

/* Send */
export const Send: Story = {
  render: (args) => (
    <Button {...args} variant="send">
      send <ArrowRightIcon className="size-6 text-inherit" />
    </Button>
  ),
}

/* File */
export const File: Story = {
  args: { variant: "file", children: "파일 첨부" },
}

/* Icon */
export const Icon: Story = {
  args: { variant: "icon", selected: false },
  render: ({ selected, ...args }) => (
    <div className="flex min-h-40 min-w-40 flex-col items-center justify-center gap-10 rounded-lg bg-black/60">
      <Button {...args} variant="icon" data-selected={selected ? "true" : undefined}>
        <ChevronTopIcon className="size-5 text-inherit" />
      </Button>
    </div>
  ),
}
