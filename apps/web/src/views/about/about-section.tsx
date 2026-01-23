import { cn } from "@/lib/utils"
import { OverlapCircles } from "./overlap-circles"

export const AboutSection: React.FC<{
  header?: string
  number: string
  overlapText: string
  title?: string
  subtitle: React.ReactNode
  className?: string
}> = ({ header, number, overlapText, title, subtitle, className }) => {
  return (
    <section
      className={cn(
        "w-full flex-col items-center justify-center pb-20 text-center md:pb-30 lg:pb-[132px] xl:px-95",
        className
      )}
    >
      {header && <h1 className="typo-subtitle mb-20">{header}</h1>}
      <OverlapCircles text={number} overlapText={overlapText} />
      <h1 className="typo-subtitle mt-15 md:mt-25 lg:mt-20">{title}</h1>
      <p className="typo-body-2 mt-6 lg:mt-10">{subtitle}</p>
    </section>
  )
}
