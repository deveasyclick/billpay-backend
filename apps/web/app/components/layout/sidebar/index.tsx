import {
  Sidebar,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  LucideReceiptText,
  Send,
  SendHorizonal,
  SmartphoneCharging,
} from "lucide-react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Buy Airtime & Data",
    url: "/buy-airtime",
    icon: SmartphoneCharging,
  },
  {
    title: "Send & Receive Money",
    url: "/send-money",
    icon: SendHorizonal,
  },
  {
    title: "Pay Bills",
    url: "/pay-bills",
    icon: LucideReceiptText,
  },
  {
    title: "Invite Friends",
    url: "/invite",
    icon: Send,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-18 bg-sidebar-primary">Header</SidebarHeader>
      <SidebarGroupContent>
        <SidebarMenu className="mt-5 px-5">
          {items.map((i) => (
            <SidebarMenuItem key={i.title} className="mb-3">
              <SidebarMenuButton asChild>
                <a
                  href={i.url}
                  className="h-auto flex flex-col item-center justify-center px-3 overflow-visible"
                >
                  <span className="text-sidebar-foreground">
                    <i.icon className="w-8 h-8" />
                  </span>
                  <span className="text-xs break-words whitespace-normal">
                    {i.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </Sidebar>
  );
}
