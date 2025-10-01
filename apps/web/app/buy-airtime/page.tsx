"use client";

import { Tabs } from "@/components/tab";
import { AirtimeTab, DataTab } from "./tabs";

export default function AirtimeOrDataPage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col gap-[24px] w-full md:w-auto">
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
              className: "relative left-[-8px] md:left-[-20px] z-0",
            },
          ]}
        />

        <div className="hidden md:flex p-[12px] justify-between items-start rounded-[12px] bg-[#0055FF]/5 w-[500px]">
          <p className="text-sm rounded-lg font-inter">
            Need to keep track of your transactions?
          </p>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline inline-block ml-10"
          >
            Sign up now →
          </a>
        </div>
      </div>
    </div>
  );
}
