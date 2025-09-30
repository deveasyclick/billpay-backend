"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fingerprint, PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/pay-bills");
  const navs = [
    { name: "dashboard", href: "/dashboard", title: "Dashboard" },
    { name: "airtime", href: "/buy-airtime", title: "Buy Airtime & Data" },
    { name: "pay", href: "/pay-bills", title: "Pay Bills" },
    { name: "invite", href: "/invite", title: "Invite Friend" },
  ];

  useEffect(() => {
    if (pathname) {
      setActiveTab(pathname);
    }
  }, []);

  return (
    <div className="flex flex-col md:block gap-[8px] md:gap-0 justify-center items-center">
      <header className="flex flex-row justin-between md:justify-center items-center gap-[8px] py-0 px-[12px] md:pr-[12px] md:pl-[24px] rounded-[32px] bg-white border-[1px] border-solid border-[#E5E5E5] w-96 md:w-[950px] justify-self-center min-h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-[4px]">
          <Image
            src="/icons/logo.svg"
            alt="Elites Africa"
            width={19}
            height={20}
          />
          <span className="font-bold text-[16px]">ELITES AFRICA</span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex md:p-[12px] items-center gap-[5px] md:gap-[10px] rounded-[32px]">
          {navs.map((nav) => (
            <a
              key={nav.name}
              href={nav.href}
              onClick={() => setActiveTab(nav.href)}
              className={`text-gray-500 p-1 md:py-[8px] md:px-[12px] rounded-sm  md:rounded-[100px] border-1 flex border-gray-300 items-start hover:bg-blue-600 hover:text-white ${
                activeTab === nav.href && "bg-blue-600 text-white"
              }`}
            >
              <span className="font-medium font-gilroy leading-[20px] text-sm ">
                {nav.title}
              </span>
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex justify-end items-center gap-[12px] grow-1 shrink-0 basis-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 border-2 border-gray-100 rounded-2xl  py-[8px]! px-[20px]! md:px-6 md:py-4 cursor-pointer"
          >
            <Fingerprint className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="hidden md:flex hover:bg-blue-600 hover:text-white border-2 border-gray-200 rounded-2xl bg-transparent text-blue-500 p-4 cursor-pointer font-bold font-inter"
          >
            <PlusCircle className="w-4 h-4" />
            Sign Up
          </Button>
        </div>
      </header>

      <nav className="md:hidden w-96 py-1 rounded-[32px] inline-flex justify-between items-center">
        {navs.map((nav) => (
          <a
            key={nav.name}
            href={nav.href}
            className={cn(
              "px-3 py-2 bg-color-white--5%/5 rounded-[100px] outline outline-offset-[-1px] outline-neutral-200 flex justify-start items-start gap-2.5",
              activeTab === nav.href && "bg-blue-600"
            )}
          >
            <div className="flex justify-start items-center gap-2">
              <div
                className={cn(
                  "justify-start text-neutral-400 text-xs font-normal leading-tight",
                  activeTab === nav.href && "text-white"
                )}
              >
                {nav.title}
              </div>
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
}
