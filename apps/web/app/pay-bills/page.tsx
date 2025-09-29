"use client";

import { AceIcon } from "@/assets/icons";
import { Tv, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { BillList } from "./components";
import { BettingSection, ElectricitySection } from "./sections";
import CableTVSection from "./sections/tv";

const sections = [
  { name: "Electricity", content: <ElectricitySection /> },
  { name: "Betting", content: <BettingSection /> },
  { name: "Cable & TV", content: <CableTVSection /> },
];
export default function PayBillPage() {
  const [activeTab, setActiveTab] = useState("Electricity");
  const categories = useMemo(
    () => [
      { name: "Electricity", icon: Zap },
      {
        name: "Betting",
        icon: AceIcon,
        className: "min-w-[128px] self-stretch",
      },
      { name: "Cable & TV", icon: Tv },
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
            className={c.className}
          />
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 gap-[24px] flex flex-col p-[24px] w-[500px]">
        {sections.find((s) => s.name === activeTab)?.content}
      </div>
    </div>
  );
}
