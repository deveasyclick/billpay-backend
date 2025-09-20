// "use client";

// import {
//   Sidebar,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import {
//   LayoutDashboard,
//   LucideReceiptText,
//   Send,
//   SmartphoneCharging,
//   Wallet,
// } from "lucide-react";

// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//     gradient: "from-blue-500 to-purple-600",
//   },
//   {
//     title: "Buy Airtime & Data",
//     url: "/buy-airtime",
//     icon: SmartphoneCharging,
//     gradient: "from-green-500 to-emerald-600",
//   },
//   {
//     title: "Pay Bills",
//     url: "/pay-bills",
//     icon: LucideReceiptText,
//     gradient: "from-cyan-500 to-blue-500",
//   },
//   {
//     title: "Invite Friends",
//     url: "/invite",
//     icon: Send,
//     gradient: "from-pink-500 to-purple-500",
//   },
// ];

// export default function AppSidebar() {
//   return (
//     <Sidebar className="h-screen hidden flex-col border-r-0 shadow-xl md:fixed md:inset-y-0 md:w-64">
//       {/* Header */}
//       <SidebarHeader className="h-20 bg-gradient-to-r from-white to-gray-50 border-b border-gray-100 flex items-center justify-center relative overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#7042D2]/5 to-transparent"></div>
//         <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#7042D2]/10 rounded-full blur-xl"></div>
//         <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-[#7042D2]/5 rounded-full blur-lg"></div>

//         {/* Header content */}
//         <div className="relative z-10 flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-[#7042D2] to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//             <Wallet className="w-6 h-6 text-white" />
//           </div>
//         </div>
//       </SidebarHeader>

//       {/* Scrollable Content */}
//       <SidebarGroupContent className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50/50">
//         <SidebarMenu className="mt-6 px-4 space-y-2">
//           {items.map((item) => (
//             <SidebarMenuItem key={item.url} className="mb-2">
//               <SidebarMenuButton
//                 asChild
//                 className="h-auto p-0 hover:bg-transparent"
//               >
//                 <a
//                   href={item.url}
//                   className="group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/70 backdrop-blur-sm border border-gray-100/50 hover:border-[#7042D2]/20"
//                 >
//                   {/* Hover background effect */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#7042D2]/0 to-[#7042D2]/0 group-hover:from-[#7042D2]/5 group-hover:to-[#7042D2]/10 rounded-2xl transition-all duration-300"></div>

//                   {/* Icon container with gradient */}
//                   <div
//                     className={`relative z-10 w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
//                   >
//                     <item.icon className="w-7 h-7 text-white" />
//                     <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>

//                   {/* Text */}
//                   <span className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-[#7042D2] transition-colors duration-300 text-center leading-tight px-2">
//                     {item.title}
//                   </span>

//                   {/* Active indicator */}
//                   <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#7042D2] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"></div>
//                 </a>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>

//       {/* Bottom decoration */}
//       <div className="relative h-16 bg-gradient-to-t from-[#7042D2]/5 to-transparent flex items-center justify-center">
//         <div className="w-12 h-1 bg-[#7042D2]/20 rounded-full"></div>
//       </div>
//     </Sidebar>
//   );
// }



"use client";

import {
  LayoutDashboard,
  LucideReceiptText,
  Send,
  SmartphoneCharging,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Buy Airtime & Data",
    url: "/buy-airtime",
    icon: SmartphoneCharging,
  },
  {
    title: "Pay Bills",
    url: "/pay-bills",
    icon: LucideReceiptText,
  },
  {
    title: "Invite Friend",
    url: "/invite",
    icon: Send,
  },
];

export default function AppNavbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <SmartphoneCharging className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-600">ELITEAFRICA</span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}