import localFont from "next/font/local"

const outfitMedium = localFont({
  src: "../../public/fonts/Outfit-Medium.ttf",
  variable: "--outfit-medium",
  display: "swap",
  weight: "500",
})

const pretendardRegular = localFont({
  src: "../../public/fonts/Pretendard-Regular.woff2",
  variable: "--pretendard-regular",
  display: "swap",
  weight: "400",
  style: "normal",
})

const pretendardMedium = localFont({
  src: "../../public/fonts/Pretendard-Medium.woff2",
  variable: "--pretendard-medium",
  display: "swap",
  weight: "500",
})

const pretendardSemibold = localFont({
  src: "../../public/fonts/Pretendard-Semibold.woff2",
  variable: "--pretendard-semibold",
  display: "swap",
  weight: "600",
})

export { outfitMedium, pretendardRegular, pretendardMedium, pretendardSemibold }
