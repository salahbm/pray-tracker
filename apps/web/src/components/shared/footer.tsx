import { appConfig } from "@/config/app.config"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Download", href: "#download" },
]

function Footer() {
  return (
    <footer className="border-t border-muted bg-background px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">Noor</p>
          <p className="mt-2 max-w-md text-sm text-muted-forground">
            A shared prayer companion for families, friends, and communities. Stay connected, celebrate answered
            moments, and care consistently.
          </p>
          <p className="mt-4 text-sm text-muted-forground">{appConfig.app.email}</p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-forground">
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-foreground">
                {item.label}
              </a>
            ))}
            <a href="mailto:support@noor.app" className="transition hover:text-foreground">
              Support
            </a>
          </div>
          <p className="text-xs text-muted-forground">© 2024 Noor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
