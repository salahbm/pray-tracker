"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon } from "../icons/circle-check"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-center"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="text-primary-100 size-4" />,
        // info: <InfoIcon className="size-4" />,
        // warning: <TriangleAlertIcon className="size-4" />,
        // error: <OctagonXIcon className="size-4" />,
        // loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--gray-100)",
          "--normal-text": "var(--black)",
          "--normal-border": "var(--gray-200)",
          "--border-radius": "var(--radius-md)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
