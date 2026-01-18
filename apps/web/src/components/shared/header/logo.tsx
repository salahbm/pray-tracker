import Image from "next/image"
import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  onClick?: () => void
  dynamic?: boolean
  isWhite?: boolean
}

const Logo: React.FC<LogoProps> = ({ onClick, dynamic, isWhite }) => {
  return (
    <Link href="/" onClick={onClick}>
      <Image
        src={isWhite ? "/logo/logo_header_momenti_white.png" : "/logo/logo_header_momenti_black.png"}
        alt="logo"
        width={140}
        height={28}
        loading="eager"
        priority
        className={cn("hidden object-contain md:block", !dynamic && "block")}
      />
      <Image
        src={isWhite ? "/logo/logo_header_momenti_white_mobile.png" : "/logo/logo_header_momenti_black_mobile.png"}
        alt="logo"
        width={24}
        height={24}
        loading="eager"
        priority
        className={cn("object-contain md:hidden", !dynamic && "hidden")}
      />
    </Link>
  )
}

export { Logo }
