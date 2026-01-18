import Image from "next/image"
import React from "react"
import { ArrowTopRightIcon } from "@/components/icons"

type ServiceCircleProps = {
  title: string
  items: string[]
  imageSrc: string
}

export const ServiceCircle: React.FC<ServiceCircleProps> = ({ title, items, imageSrc }) => (
  <div className="flex flex-col items-center justify-center -space-y-[18%] md:flex-row md:space-y-0 md:-space-x-[10%]">
    <div className="flex-center group relative aspect-square h-[280px] w-[280px] md:h-[362px] md:w-[362px] lg:h-[520px] lg:w-[520px]">
      <span className="absolute top-1/2 left-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-500 md:h-[494px] md:w-[494px] lg:h-[640px] lg:w-[640px]" />

      <div className="flex-center relative z-2 h-[240px] w-[240px] transition-all duration-300 md:h-[322px] md:w-[322px] lg:h-[480px] lg:w-[480px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="240px, (min-width: 768px) 322px, (min-width: 1024px) 480px"
          className="rounded-full object-cover"
        />
        <h1 className="text-subtitle absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 group-hover:text-white">
          {title}
        </h1>
        <span className="from-primary-100/80 to-primary-100/70 absolute inset-0 hidden rounded-full bg-linear-to-b transition-all duration-300 group-hover:block" />
      </div>

      <ArrowTopRightIcon className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 md:bottom-6 lg:bottom-[70px]" />
    </div>

    <div className="flex-center h-[240px] w-[240px] md:h-[322px] md:w-[322px] lg:h-[480px] lg:w-[480px]">
      <ul className="flex-center z-1 aspect-square w-full flex-col gap-2 rounded-full bg-white transition-all duration-300">
        {items.map((item, i) => (
          <li key={i} className="text-body-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
