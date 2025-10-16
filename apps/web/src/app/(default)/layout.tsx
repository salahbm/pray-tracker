import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUser } from "@/hooks/user/useUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUser();
  const userId = data?.user?.id || "";

  return (
    <>
      <Header userId={userId} />
      {children}
      <Footer />
    </>
  );
}
