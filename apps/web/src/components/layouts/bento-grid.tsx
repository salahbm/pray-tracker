"use client"

import { cn } from "@/lib/utils"

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative grid h-auto w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {children}
    </div>
  )
}
