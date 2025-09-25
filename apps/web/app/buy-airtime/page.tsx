"use client";

import { Tabs } from "@/components/tab";
import { AirtimeTab, DataTab } from "./tabs";

export default function AirtimeOrDataPage() {
  return (
    <div className="w-full pt-[40px] flex items-center justify-center">
      <Tabs
        defaultTab="airtime"
        activeClassName="text-blue-600 bg-blue-100 z-10 font-bold"
        items={[
          {
            key: "airtime",
            label: "Airtime",
            content: <AirtimeTab />,
          },
          {
            key: "data",
            label: "Data",
            content: <DataTab />,
            className: "relative left-[-20px] z-0",
          },
        ]}
      />
    </div>
  );
}
