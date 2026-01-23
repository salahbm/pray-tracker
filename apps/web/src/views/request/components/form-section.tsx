import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  children: ReactNode
  sectionRef?: (el: HTMLDivElement | null) => void
  className?: string
}

export const FormSection = ({ children, sectionRef, className }: FormSectionProps) => (
  <div
    ref={sectionRef}
    className={cn(
      "flex flex-col gap-y-10 rounded-lg md:gap-y-17 md:bg-white md:p-12 lg:gap-y-25 lg:p-15 lg:pt-17",
      className
    )}
  >
    {children}
  </div>
)
