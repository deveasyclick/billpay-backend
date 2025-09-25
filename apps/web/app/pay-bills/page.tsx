"use client";

import { LucideTreePine, Tv, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { BillList } from "./components";
import { BettingSection, ElectricitySection } from "./sections";
import CableTVSection from "./sections/tv";

const BettingIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 13.25L15 2L12.75 10.25H21L10.5 21.5L12.75 13.25H4.5Z"
      stroke="#2563EB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const sections = [
  { name: "electricity", content: <ElectricitySection /> },
  { name: "betting", content: <BettingSection /> },
  { name: "cable tv", content: <CableTVSection /> },
];
export default function PayBillPage() {
  const [activeTab, setActiveTab] = useState("electricity");
  const categories = useMemo(
    () => [
      { name: "electricity", icon: Zap },
      { name: "betting", icon: LucideTreePine },
      { name: "cable & TV", icon: Tv },
    ],
    []
  );

  return (
    <div className="flex items-start gap-[12px]">
      <div className="flex flex-col gap-[12px] items-center">
        {categories.map((c) => (
          <BillList
            key={c.name}
            category={c.name}
            icon={c.icon}
            active={c.name === activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 gap-[24px] flex flex-col p-[24px] w-[500px]">
        {sections.find((s) => s.name === activeTab)?.content}
      </div>
    </div>
  );
}
