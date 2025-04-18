export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow">{children}</main>;
}
