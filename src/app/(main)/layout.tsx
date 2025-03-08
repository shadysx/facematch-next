import HeaderMenu from "@/components/layouts/HeaderMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMenu />
      <main className="container mx-auto py-4">{children}</main>
    </>
  );
}
