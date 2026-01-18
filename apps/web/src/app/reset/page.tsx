import { Loading } from "@/components/shared/loading"
import { ResetPasswordView } from "@/components/shared/reset-view"
import { NextPage } from "next"
import { Suspense } from "react"

type ResetProps = {}

const Reset: NextPage<ResetProps> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordView />
    </Suspense>
  )
}

export default Reset
