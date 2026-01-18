"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Work } from "@/types/work.types"

interface WorkCardProps {
  work: Work
  index: number
}

export const WorkCard = ({ work, index }: WorkCardProps): React.JSX.Element => {
  const imageUrl = work.useThumA === 1 && work.thumA ? work.thumA : work.thum
  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `https://${imageUrl}`
  const isWhiteText = work.textColor === "01"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg"
    >
      <Link href={`/work/${work.workNo}`}>
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
          <Image
            src={fullImageUrl}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`${isWhiteText ? "text-white" : "text-black"}`}
            >
              <h3 className="mb-2 line-clamp-2 text-xl font-bold md:text-2xl">{work.title}</h3>
              <p className="mb-3 text-sm opacity-90">
                {work.client} · {work.developDate}
              </p>
              <div className="flex flex-wrap gap-2">
                {work.categoryList.map((category) => (
                  <span key={category.code} className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                    {category.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
