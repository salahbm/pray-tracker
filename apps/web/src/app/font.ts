import { Poppins } from "next/font/google"

const popinsRegular = Poppins({
  subsets: ["latin"],
  variable: "--popins-regular",
  display: "swap",
  weight: "400",
  style: "normal",
})

const popinsMedium = Poppins({
  subsets: ["latin"],
  variable: "--popins-medium",
  display: "swap",
  weight: "500",
})

const popinsSemibold = Poppins({
  subsets: ["latin"],
  variable: "--popins-semibold",
  display: "swap",
  weight: "600",
})

const popinsBold = Poppins({
  subsets: ["latin"],
  variable: "--popins-bold",
  display: "swap",
  weight: "700",
})

export { popinsBold, popinsMedium, popinsRegular, popinsSemibold }
