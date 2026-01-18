import { appConfig } from "@/config/app.config"
import { BlogIcon, FacebookIcon, InstagramIcon } from "../../icons"

const menuVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.75 },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1, // reverse on exit
      delayChildren: 0.2,
    },
  },
}

const menu = [
  { id: "/work", name: "Work", url: "/work", key: "work" },
  { id: "/about", name: "About", url: "/about" },
  { id: "/service", name: "Service", url: "/service" },
  { id: "/story", name: "Story", url: "/story", key: "story" },
]

const social = [
  { id: "naver", icon: <BlogIcon className="size-5 text-black" />, url: appConfig.app.social.blog },
  { id: "facebook", icon: <FacebookIcon className="size-5 text-black" />, url: appConfig.app.social.facebook },
  { id: "instagram", icon: <InstagramIcon className="size-5 text-black" />, url: appConfig.app.social.instagram },
]

const whiteHeader = ["/about", "/work", "/service", "/story"]

export { menu, overlayVariants, menuVariants, social, whiteHeader }
