import localFont from "next/font/local"

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--pretendard",
})

export { pretendard }
