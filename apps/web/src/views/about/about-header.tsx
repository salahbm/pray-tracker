import React from "react"
import { cn } from "@/lib/utils"

const AboutHeader: React.FC = () => {
  return (
    <div className="flex-center relative min-h-[416px] w-full flex-col overflow-hidden bg-black md:min-h-[480px] lg:min-h-[600px]">
      <h1 className="typo-title-1 translate-x-[5%] text-start text-white md:-translate-x-1/6 lg:-translate-x-1/3 xl:-translate-x-1/2">
        We find creative moments.
      </h1>
      {/* 1st small circle */}
      <span
        className={cn(
          "circle-background absolute top-1/2 left-0 size-[210px] -translate-x-2/3 -translate-y-1/2",
          "md:top-1/3 md:size-[360px]",
          "lg:top-0 lg:left-0 lg:size-[435px] lg:-translate-x-[25%] lg:-translate-y-[20%]",
          "xl:translate-x-[25%] xl:-translate-y-[20%]"
        )}
      />
      {/* colliding circles */}
      <figure
        className={cn(
          "absolute top-0 right-0 h-fit w-fit translate-x-3/5 -translate-y-[10%]",
          "md:translate-x-1/4 md:-translate-y-1/5",
          "lg:translate-x-2/4 lg:-translate-y-1/5",
          "xl:translate-x-[10%]"
        )}
      >
        {/* big circle */}
        <div className="circle-background size-[300px] border-black! bg-linear-to-b from-black/0 via-black/5 to-black/25 md:size-[540px] lg:size-[827px]" />
        {/* smaller circle */}
        <div
          className={cn(
            "circle-background size-[200px] -translate-x-1/5 -translate-y-1/3",
            "md:size-[367px] md:-translate-x-2/5 md:-translate-y-1/2",
            "lg:size-[562px] lg:-translate-x-3/5 lg:-translate-y-3/5"
          )}
        />
      </figure>
    </div>
  )
}

export { AboutHeader }
