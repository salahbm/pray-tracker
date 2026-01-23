import { cn } from "@/lib/utils"

export const Loading = ({ className }: { className?: string }) => (
  <div className={cn("flex-center min-h-screen", className)}>
    <span className="size-10 animate-spin rounded-full border-4 border-gray-600 border-t-transparent" />
  </div>
)
