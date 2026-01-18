import Link from "next/link"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
  { label: "Download", href: "#download" },
]

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-muted bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="text-lg font-semibold text-foreground">
          Noor
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-forground md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#download"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-forground shadow-sm transition hover:-translate-y-0.5"
        >
          Get Noor
        </a>
      </div>
    </header>
  )
}

export { SiteHeader }
