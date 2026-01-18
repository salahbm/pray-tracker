import { Metadata } from "next"

import { getTranslations } from "next-intl/server"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopIcon,
  ArrowTopRightIcon,
  BlogIcon,
  CalendarIcon,
  CallIcon,
  CheckboxBlankIcon,
  CheckboxCheckIcon,
  ChevronBottomIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronTopIcon,
  CloseIcon,
  DownloadIcon,
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LocationIcon,
  LockIcon,
  MailIcon,
  MenuIcon,
} from "@/components/icons"
import { LP_GRID_ITEMS } from "@/constants/lp-items"
import { easterEgg } from "@/lib/easter-egg"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Momenti Web",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://momenti.biz",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/momenti/momenti-web/main/.github/assets/project-logo.png",
      },
    ],
  },
}

const colors = [
  {
    name: "White",
    value: "bg-white",
  },
  {
    name: "Black",
    value: "bg-black",
  },
  {
    name: "Gray 100",
    value: "bg-gray-100",
  },
  {
    name: "Gray 200",
    value: "bg-gray-200",
  },
  {
    name: "Gray 300",
    value: "bg-gray-300",
  },
  {
    name: "Gray 400",
    value: "bg-gray-400",
  },
  {
    name: "Gray 500",
    value: "bg-gray-500",
  },
  {
    name: "Primary 100",
    value: "bg-primary-100",
  },
  {
    name: "Primary 200",
    value: "bg-primary-200",
  },
  {
    name: "primary 300",
    value: "bg-primary-300",
  },
  {
    name: "primary 400",
    value: "bg-primary-400",
  },
  {
    name: "Accent Yellow 100",
    value: "bg-yellow-100",
  },
  {
    name: "Accent Yellow 200",
    value: "bg-yellow-200",
  },
  {
    name: "Accent Red 500",
    value: "bg-red-500",
  },
]

export default async function Web() {
  const t = await getTranslations()
  easterEgg()
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl">
              Momenti Web
            </h1>
            <h2 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl">
              {t("title")}
            </h2>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-3xl font-bold">Colors Block</h1>

        <div className="items-center justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {colors.map((color) => (
            <div
              key={color.name}
              className={cn(
                "flex w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center",
                color.value,
                color.name === "Black" && "text-white"
              )}
            >
              <h3 className="mb-2 text-xl font-bold">{color.name}</h3>
              <p className="text-gray-700">{color.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="my-12 flex flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-3xl font-bold">Typography Block</h1>
        <div className="items-center justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          <h1 className="text-header">Header</h1>
          <h2 className="text-title-1">Title 1</h2>
          <h2 className="text-title-1-kr">Title 1 KR</h2>
          <h2 className="text-title-2">Title 2</h2>
          <h2 className="text-title-3">Title 3</h2>
          <h2 className="text-subtitle">Subtitle</h2>
          <h2 className="text-body-1">Body 1</h2>
          <h2 className="text-body-2">Body 2</h2>
          <h2 className="text-caption">Caption</h2>
        </div>
      </section>
      {/* SHADOWS BLOCK */}
      <section className="my-12 flex flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-3xl font-bold">Shadows Block</h1>
        <div className="items-center justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          <div className="shadow-1 flex w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center">
            <h3 className="mb-2 text-xl font-bold">Shadow 1</h3>
            <p className="text-gray-700">Shadow 1</p>
          </div>
          <div className="shadow-2 flex w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center">
            <h3 className="mb-2 text-xl font-bold">Shadow 2</h3>
            <p className="text-gray-700">Shadow 2</p>
          </div>
        </div>
      </section>

      {/* Dynamic Content based on breakpoint */}
      <section className="my-12 flex flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-3xl font-bold">Dynamic Content based on breakpoint</h1>

        {/* XS */}
        <div className="flex w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center sm:hidden">
          <h3 className="text-xl font-bold">This card will appear on xs</h3>
        </div>
        {/* SM */}
        <div className="hidden w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center sm:flex md:hidden">
          <h3 className="text-xl font-bold">This card will appear on mobile</h3>
        </div>

        {/* Tablet */}
        <div className="hidden w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center md:flex lg:hidden">
          <h3 className="text-xl font-bold">This card will appear on tablet</h3>
        </div>

        {/* Desktop */}
        <div className="hidden w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center lg:flex xl:hidden">
          <h3 className="text-xl font-bold">This card will appear on desktop</h3>
        </div>

        {/* Desktop XL */}
        <div className="hidden w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center xl:flex 2xl:hidden">
          <h3 className="text-xl font-bold">This card will appear on desktop-xl</h3>
        </div>
        {/* Desktop 2XL */}
        <div className="hidden w-fit min-w-sm flex-col rounded-lg border border-gray-400 p-4 px-12 text-center 2xl:flex">
          <h3 className="text-xl font-bold">This card will appear on desktop-2xl</h3>
        </div>
      </section>

      <section className="my-12 flex flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-3xl font-bold">Icons Block</h1>
        <div className="grid grid-cols-3 items-center justify-center gap-3 space-y-8 transition-colors duration-300 md:grid-cols-4 md:gap-12 md:space-y-0 lg:grid-cols-4">
          <ArrowLeftIcon className="text-primary-400" />
          <ArrowRightIcon className="hover:text-red-400" />
          <ArrowTopRightIcon className="hover:text-yellow-400" />
          <ArrowTopIcon className="hover:text-green-400" />
          <CalendarIcon className="hover:text-blue-400" />
          <CallIcon className="hover:text-red-400" />
          <CheckboxBlankIcon className="hover:text-purple-400" />
          <CheckboxCheckIcon className="hover:text-pink-400" />
          <ChevronBottomIcon className="hover:text-orange-400" />
          <ChevronLeftIcon className="hover:text-teal-400" />
          <ChevronRightIcon className="hover:text-cyan-400" />
          <ChevronTopIcon className="hover:text-blue-400" />
          <CloseIcon className="hover:text-red-400" />
          <DownloadIcon className="hover:text-green-400" />
          <LinkIcon className="hover:text-indigo-400" />
          <LocationIcon className="hover:text-purple-400" />
          <LockIcon className="hover:text-pink-400" />
          <MailIcon className="hover:text-orange-400" />
          <MenuIcon className="hover:text-blue-400" />
          <BlogIcon className="text-primary-100 size-10" />
          <InstagramIcon className="size-6 text-red-500" />
          <FacebookIcon className="size-6 fill-blue-400 stroke-blue-400 stroke-0" />
        </div>
      </section>

      {/* Cursor Follow */}
      <div className="my-12 flex flex-col items-center justify-center gap-4">
        <h1>Cursor Follow</h1>
        <button
          type="button"
          data-cursor-expand
          className="text-primary-400 border-primary-400 hover:bg-primary-400 rounded-2xl border p-10 transition-all duration-300 hover:scale-110 hover:text-white"
        >
          Expand
        </button>
        <button
          type="button"
          data-cursor-yellow
          className="text-primary-400 border-primary-400 hover:bg-primary-400 rounded-2xl border p-10 transition-all duration-300 hover:scale-110 hover:text-white"
        >
          Yellow
        </button>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div
                key={singleItem.title}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-400 p-6 text-center"
              >
                <div className="bg-primary-400 mb-4 flex size-10 items-center justify-center rounded-full p-1.5 lg:size-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{singleItem.title}</h3>
                <p className="text-gray-500">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
