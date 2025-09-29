import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BillListProps {
  category: string;
  icon: any;
  active: boolean;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export default function BillList({
  category,
  icon: Icon,
  active = false,
  setActiveTab,
  className,
}: BillListProps) {
  return (
    <div
      className={cn(
        "flex py-[12px] px-[8px] items-center gap-2 rounded-[12px] cursor-pointer font-gilroy",
        className ? className : "",
        active && "bg-blue-600/10 text-[#2563EB] font-semibold text-md!"
      )}
      onClick={() => setActiveTab(category)}
    >
      <div className="flex items-center gap-[8px] grow-1 shrink-0 basis-0">
        <Icon
          height={24}
          width={24}
          className={cn(active ? "text-[#2563EB]" : "text-[#414651]")}
        />
        <span className="flex-1 leading-[20px]">{category}</span>
      </div>
      <ChevronRight width={25} height={25} className="pt-1 flex-shrink-0" />
    </div>
  );
}
