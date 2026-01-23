import { cn } from "@/lib/utils"

interface OptionButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

export const OptionButton = ({ label, active, onClick }: OptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    data-selected={active}
    className="group disabled:typo-body-2 relative min-w-40 origin-center overflow-hidden rounded-xl border border-black bg-transparent px-2.5 py-2 hover:text-white disabled:border-[0.5px] disabled:border-gray-500 disabled:bg-transparent disabled:text-gray-500 data-[selected=true]:bg-black data-[selected=true]:text-white"
  >
    <span className="relative z-10">{label}</span>
    <div
      className={cn(
        "absolute top-0 left-0 h-full w-full origin-center scale-0 rounded-full bg-black/70 opacity-0 transition-all duration-500",
        "group-hover:scale-150 group-hover:opacity-100"
      )}
    />
  </button>
)
