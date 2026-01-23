"use client"

import { cn } from "@/lib/utils"

interface AnimatedCirclesProps {
  size?: number
  leftColor?: string
  rightColor?: string
  mixColor?: string
  leftText?: string
  rightText?: string
  mixText?: string
  className?: string
}

export const AnimatedCircles = ({
  size = 120,
  leftColor = "bg-blue-500",
  rightColor = "bg-purple-500",
  mixColor = "bg-pink-500",
  leftText = "View",
  rightText = "Work",
  mixText = "Details",
  className,
}: AnimatedCirclesProps): React.JSX.Element => {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size * 2, height: size }}
    >
      {/* Left Circle */}
      <div
        className={cn("circle left", leftColor)}
        style={
          {
            "--size": `${size}px`,
          } as React.CSSProperties
        }
      >
        <span className="circle-text text-sm font-semibold text-white">{leftText}</span>
      </div>

      {/* Right Circle */}
      <div
        className={cn("circle right", rightColor)}
        style={
          {
            "--size": `${size}px`,
            left: `${size}px`,
          } as React.CSSProperties
        }
      >
        <span className="circle-text text-sm font-semibold text-white">{rightText}</span>

        {/* Mix Circle (inside right) */}
        <div
          className={cn("circle-mix", mixColor)}
          style={
            {
              "--size": `${size}px`,
            } as React.CSSProperties
          }
        >
          <span className="mix-text text-sm font-semibold">{mixText}</span>
        </div>
      </div>
    </div>
  )
}
