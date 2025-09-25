export default function PayBillLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full flex flex-col py-[40px] px-[32px] items-center gap-[40px] grow-1 shrink-0 basis-0 self-stretch h-full">
      {children}
    </section>
  );
}
