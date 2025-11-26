import Footer from '@/components/Footer';
import Header from '@/components/Header';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data } = await getUser();
  // const userId = data?.user?.id || '';

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
