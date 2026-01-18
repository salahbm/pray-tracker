import { NextPage } from "next"
import { workService } from "@/services/work.service"
import { HomeView } from "@/views/home"

const HomePage: NextPage = async () => {
  try {
    const initialData = await workService.getMainWorks()
    return <HomeView works={initialData} />
  } catch {
    return <HomeView />
  }
}

export default HomePage
