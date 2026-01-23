import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
interface ProgressNavigationProps {
  steps: string[]
  activeSection: number
  isSticky: boolean
  onStepClick: (index: number) => void
}

export const ProgressNavigation = ({ steps, activeSection, isSticky, onStepClick }: ProgressNavigationProps) => {
  const t = useTranslations("request.steps")
  return (
    <div className="h-14 w-full">
      <div
        className={cn(
          "flex w-full items-center justify-center py-6 transition-all duration-300 sm:py-8",
          isSticky && "bg-primary-200 fixed top-0 left-0 z-50 md:py-6"
        )}
      >
        <div className="flex w-full max-w-[1160px] items-center gap-0 px-4 sm:px-5 md:px-0">
          {steps.map((step, index) => {
            const isActive = index <= activeSection

            return (
              <div key={index} className="relative flex flex-1 items-start justify-center">
                {/* Circle */}
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className="group z-10 flex flex-col items-center"
                >
                  <div
                    className={cn(
                      "mb-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 sm:mb-2 sm:h-4 sm:w-4",
                      isSticky
                        ? isActive
                          ? "border-white bg-white"
                          : "border-primary-400 bg-primary-200 mix-blend-hard-light"
                        : isActive
                          ? "border-black bg-black"
                          : "border-gray-400 bg-gray-200"
                    )}
                  />
                  <p
                    className={cn(
                      "typo-body-1 max-w-[50px] truncate text-center text-[9px] transition-all duration-300 sm:max-w-[70px] sm:text-[11px] md:max-w-none md:text-sm",
                      isSticky
                        ? isActive
                          ? "text-white"
                          : "text-primary-400"
                        : isActive
                          ? "text-black"
                          : "text-gray-400"
                    )}
                  >
                    {t(step)}
                  </p>
                </button>

                {/* Line - connects from left edge to center */}
                {index !== 0 && (
                  <span
                    className={cn(
                      "transform-origin-left absolute top-[6px] -left-1/3 h-0.5 w-full -translate-x-2 -translate-y-1/2 transition-all duration-300 sm:top-2 md:-left-2/5 md:-translate-x-4",
                      isSticky ? (isActive ? "bg-white" : "bg-primary-400") : isActive ? "bg-black" : "bg-gray-400"
                    )}
                    style={{ transformOrigin: "left center" }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
