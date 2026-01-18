import { TailwindIndicator } from "./breakpoint-indicator"
import { QueryProvider } from "./query"

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {children}
      <TailwindIndicator />
    </QueryProvider>
  )
}

export default RootProvider
