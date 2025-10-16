import { getUser } from "@/hooks/user/useUser";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUser();

  if (!data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={data.user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
