import React from "react"

type OverlapCirclesProps = {
  text: string
  overlapText: string
}

const OverlapCircles: React.FC<OverlapCirclesProps> = ({ text, overlapText }) => {
  return (
    <div className="relative flex h-[140px] w-full items-center justify-center md:h-[200px] lg:h-[240px]">
      {/* LEFT */}
      <div className="circle left border-primary-100 border-[1.5px] bg-white [--size:140px] md:[--size:200px] lg:[--size:240px]">
        <span className="text-title text-primary-100">{text}</span>
      </div>

      {/* RIGHT — same right, just with modifier */}
      <div className="circle right right-on-top bg-primary-100 [--size:140px] md:[--size:200px] lg:[--size:240px]">
        <span className="text-title text-white">{overlapText}</span>
      </div>
    </div>
  )
}

export { OverlapCircles }
