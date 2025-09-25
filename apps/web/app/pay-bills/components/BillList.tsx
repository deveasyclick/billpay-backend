import { cn } from "@/lib/utils";
import { ChevronRight, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface BillListProps {
  category: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  active: boolean;
  setActiveTab: (tab: string) => void;
}

export default function BillList({
  category,
  icon: Icon,
  active = false,
  setActiveTab,
}: BillListProps) {
  return (
    <div
      className={cn(
        "flex min-width-[128px] py-[12px] px-[8px] items-center gap-2 self-stretch rounded-[12px] border-[0.4px] hover:bg-blue-100 cursor-pointer",
        active && "bg-blue-100"
      )}
      onClick={() => setActiveTab(category)}
    >
      <Icon height={24} width={24} className="text-blue-600" />
      <span className="text-xl flex-1">{category}</span>
      <ChevronRight width={25} height={25} className="pt-1 flex-shrink-0" />
    </div>
  );
}
