export default function PayBillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full flex flex-col px-[32px] items-center gap-4 md:gap-10 grow-1 shrink-0 basis-0 self-stretch h-full">
      {children}
    </section>
  );
}
