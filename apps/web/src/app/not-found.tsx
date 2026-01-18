import Link from "next/link"

export default async function NotFoundPage() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gray-600">
      <div className="z-10 h-full w-full translate-y-[15%] pt-30 text-center text-white">
        <h1 className="font-outfit-medium text-[200px] leading-[250px]">404</h1>
        <p className="text-title-2">page not found</p>

        <div className="text-body-1 my-40 text-center">
          <p>Sorry, we could not find that page.</p>
          <p>It may have been moved or deleted.</p>
        </div>
        <Link href="/" className="cursor-pointer rounded-full border border-white px-8 py-2.5 hover:bg-white/10">
          <span className="text-body-1 text-center whitespace-nowrap text-white">Back to home</span>
        </Link>
      </div>

      {/* bg circle */}
      <div className="absolute -bottom-[15%] left-1/2 z-0 aspect-square h-screen -translate-x-1/2 rounded-full border border-white/50 bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.36)] opacity-20" />
    </div>
  )
}
