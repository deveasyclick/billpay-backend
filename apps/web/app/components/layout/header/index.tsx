"use client";

import { Button } from "@/components/ui/button";
import { Fingerprint, PlusCircle, SmartphoneCharging } from "lucide-react";
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
    <header className="flex flex-row justify-center items-center gap-[8px] py-0 pr-[12px] pl-[24px] rounded-[32px] bg-white b-[0.6px] border-solid border-[#E5E5E5] w-[950px] justify-self-center min-h-[60px]">
      {/* Logo */}
      <div className="flex items-center gap-[4px]">
        <SmartphoneCharging className="text-blue-600" width={19} height={20} />
        <span className="font-bold text-[16px]">ELITES AFRICA</span>
      </div>

      {/* Navigation Items */}
      <div className="flex p-[12px] items-center gap-[10px] rounded-[32px]">
        {navs.map((nav) => (
          <a
            key={nav.name}
            href={nav.href}
            onClick={() => setActiveTab(nav.href)}
            className={`text-gray-500 py-[8px] px-[12px] rounded-[100px] border-1 flex border-gray-300 items-start hover:bg-blue-600 hover:text-white ${
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
          className="text-blue-600 hover:text-blue-700 border-2 border-gray-100 rounded-2xl px-6 py-4 cursor-pointer"
        >
          <Fingerprint className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          className="hover:bg-blue-600 hover:text-white border-2 border-gray-200 rounded-2xl bg-transparent text-blue-500 p-4 cursor-pointer font-bold"
        >
          <PlusCircle className="w-4 h-4" />
          Sign up
        </Button>
      </div>
    </header>
  );
}
