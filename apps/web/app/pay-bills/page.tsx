"use client";

import { AceIcon } from "@/assets/icons";
import { ArrowLeft, ChevronRight, Tv, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { BillList } from "./components";
import { BettingSection, ElectricitySection } from "./sections";
import CableTVSection from "./sections/tv";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const sections = [
  { name: "Electricity", content: <ElectricitySection /> },
  { name: "Betting", content: <BettingSection /> },
  { name: "Cable & TV", content: <CableTVSection /> },
];
export default function PayBillPage() {
  const [activeTab, setActiveTab] = useState("Electricity");
  const isMobile = useIsMobile();
  const [mobileActiveTab, setMobileActiveTab] = useState("");
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
    <>
      <div
        className={cn(
          "hidden w-96",
          mobileActiveTab !== "" && isMobile ? "flex" : ""
        )}
      >
        <Button
          variant={"outline"}
          className="text-blue-500 rounded-[32px]"
          onClick={() => setMobileActiveTab("")}
        >
          <ArrowLeft width={25} height={25} />
          Go back
        </Button>
      </div>
      <div className="flex items-start gap-[12px] w-96 md:w-auto">
        <div className="hidden md:flex flex-col gap-[12px] items-center">
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
        {/* Hide if no tab is selected on mobile */}
        <div
          className={cn(
            isMobile ? "flex flex-col gap-3 self-stretch w-full" : "hidden",
            mobileActiveTab !== "" && "hidden"
          )}
        >
          {categories.map((c) => (
            <div
              key={c.name}
              className="flex h-12 py-3 px-2 justify-between items-center self-stretch rounded-sm bg-white w-full"
              onClick={() => {
                setMobileActiveTab(c.name);
                setActiveTab(c.name);
              }}
            >
              <section className="flex items-center gap-2">
                <span>{<c.icon />}</span>
                <span className="text-sm">{c.name}</span>
              </section>
              <section>
                <ChevronRight
                  width={25}
                  height={25}
                  className="pt-1 flex-shrink-0"
                />
              </section>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "bg-white rounded-2xl shadow-sm border border-gray-100 gap-[24px] md:flex flex-col p-3 md:p-6 w-full md:w-[500px] hidden",
            mobileActiveTab !== "" && isMobile ? "flex" : ""
          )}
        >
          {sections.find((s) => s.name === activeTab)?.content}
        </div>
      </div>
    </>
  );
}
