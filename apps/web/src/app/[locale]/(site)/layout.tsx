import { Fragment } from "react"
import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { RequestBanner } from "@/components/shared/request-banner"
import { PropsWithChildren } from "@/types/global.types"

export default async function RootLayout({ children, params }: PropsWithChildren) {
  const { locale } = await params

  return (
    <Fragment>
      <Header locale={locale} />
      {children}
      <RequestBanner />
      <Footer />
    </Fragment>
  )
}
