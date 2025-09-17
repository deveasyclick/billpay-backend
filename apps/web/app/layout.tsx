import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/layout/sidebar";

export const metadata: Metadata = {
  title: "POC",
  description: "Billing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="w-full p-6 bg-gray-800 text-white fixed top-0 left-0 z-50">
          My Header
        </header>
        <SidebarProvider
          style={{
            "--sidebar-width": "8rem",
            "--sidebar-width-mobile": "8rem",
          }}
        >
          <div className="grid grid-cols-[8rem_1fr] gap-4 p-4">
            <AppSidebar />
            <main className="w-100 grid grid-cols-2 gap-4 p-4">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
