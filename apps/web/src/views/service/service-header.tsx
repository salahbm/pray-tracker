import React from "react"
import { cn } from "@/lib/utils"

const ServiceHeader: React.FC = () => (
  <div
    className={cn(
      "flex-center relative min-h-[416px] w-full flex-col overflow-hidden bg-black md:min-h-120 lg:min-h-[600px]",
      "[--c:165px] md:[--c:329px] lg:[--c:460px]"
    )}
  >
    <h1 className="text-title-1 translate-x-[3%] text-start text-white md:-translate-x-[8%] lg:-translate-x-[18%] xl:-translate-x-[26%]">
      We are service makers.
    </h1>

    {/* FURTHER left circle */}
    <span className="circle-background absolute top-1/2 left-0 hidden h-(--c) w-(--c) -translate-y-1/2 border-black/20! lg:-translate-x-[6%] xl:block" />

    {/* LEFT circle */}
    <span
      className={cn(
        "circle-background absolute top-1/2 right-0 left-0 h-(--c) w-(--c) -translate-x-1/2 -translate-y-1/2 border-black/20!",
        "md:-translate-x-[6%] lg:translate-x-[14%] xl:translate-x-[95%]"
      )}
    />

    <span className="flex-center absolute right-0 left-0 h-full w-full -space-x-16 md:translate-x-[28%] lg:translate-x-[22%] xl:translate-x-[26%]">
      {/* Back circle */}
      <span className="circle-background h-(--c) w-(--c) border-black/20!" />

      {/* Front circle with hard mask */}
      <span className="relative z-10 h-(--c) w-(--c) overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-black" />
        <span className="circle-background absolute inset-0 border-black! bg-linear-to-b! from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.25)]" />
      </span>
    </span>
  </div>
)

export { ServiceHeader }
