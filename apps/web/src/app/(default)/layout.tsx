import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUser } from '@/hooks/user/useUser';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUser();
  return (
    <>
      <Header userId={data?.user?.id} />
      {children}
      <Footer />
    </>
  );
}
