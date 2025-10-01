import type { Metadata } from "next";
import Header from "./components/layout/header";
import "./globals.css";
import { env } from "./lib/env";
import Script from "next/script";
import { Toaster } from "./components/ui/sonner";
import { getBillingItems } from "./lib/api/billing-items";
import { BillingItemProvider } from "./lib/context/itemContext";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Elite Africa",
  description: "Billing App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = await getBillingItems();
  return (
    <html lang="en">
      <body className="bg-gray-50 h-screen font-gilroy pt-2 md:pt-0 px-4 md:px-0 flex flex-col gap-5 md:gap-10">
        <Header />
        <BillingItemProvider value={items.data ?? []}>
          <Providers>
            <main className="w-full font-gilroy">{children}</main>
          </Providers>
        </BillingItemProvider>

        <Script
          src={env.interswitchInlineUrl}
          strategy="afterInteractive" // ensures it loads after hydration
        />
        <Toaster duration={5000} richColors position="top-center" />
      </body>
    </html>
  );
}
