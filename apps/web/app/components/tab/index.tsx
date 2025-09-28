"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabItem = {
  key: string;
  label: string;
  className?: string;
  content: React.ReactNode;
};

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  activeClassName?: string;
}

export function Tabs({
  items,
  defaultTab,
  className,
  activeClassName,
}: TabsProps) {
  const [active, setActive] = React.useState(defaultTab ?? items[0]?.key);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 gap-[24px] flex flex-col p-[24px] w-[500px]",
        className
      )}
    >
      {/* Tab Navigation */}
      <div>
        <div className="grid grid-cols-2 relative">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={cn(
                "font-medium transition-colors rounded-2xl py-2 text-gray-400 cursor-pointer bg-gray-50",
                item.className ?? "",
                active === item.key ? activeClassName : "hover:text-gray-800"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      <div>{items.find((i) => i.key === active)?.content}</div>
      <div className="flex p-[12px] justify-between items-start rounded-[12px] bg-blue-100">
        <p className="text-sm rounded-lg font-inter">
          Need to keep track of your transactions?
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline inline-block ml-7 "
          >
            Sign up now →
          </a>
        </p>
      </div>
    </div>
  );
}
