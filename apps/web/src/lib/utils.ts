import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const safeImage = (src: string | undefined | null) => {
  if (!src) return ""
  return src.startsWith("http") ? src : `https://${src}`
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
