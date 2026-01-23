import { ReactNode } from "react"

export interface PropsWithChildren {
  children: ReactNode
  params: Promise<{ locale: string }>
}
