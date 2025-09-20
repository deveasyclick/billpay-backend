// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   AirtimeFormSchema,
//   PaymentFormSchema,
//   type AirtimeForm,
//   type PaymentForm,
// } from "./airtime.schema";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const networks = [
//   { id: "mtn", name: "MTN" },
//   { id: "glo", name: "Glo" },
//   { id: "airtel", name: "Airtel" },
//   { id: "9mobile", name: "9mobile" },
// ];

// export default function AirtimePage() {
//   const [showPayment, setShowPayment] = useState(false);
//   const [airtimeData, setAirtimeData] = useState<AirtimeForm | null>(null);

//   // Airtime form
//   const form = useForm<AirtimeForm>({
//     resolver: zodResolver(AirtimeFormSchema),
//     defaultValues: { phone: "", network: undefined, amount: 0 },
//   });

//   // Payment form
//   const paymentForm = useForm<PaymentForm>({
//     resolver: zodResolver(PaymentFormSchema),
//     defaultValues: { cardNumber: "", expiry: "", cvv: "" },
//   });

//   const onSubmitAirtime = (data: AirtimeForm) => {
//     setAirtimeData(data);
//     setShowPayment(true);
//   };

//   const onSubmitPayment = (data: PaymentForm) => {
//     console.log("✅ Final Payload:", { ...airtimeData, ...data });
//     alert("Payment successful! 🎉");
//     setShowPayment(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-8 w-full">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmitAirtime)}
//           className="space-y-8 bg-white shadow-lg rounded-xl p-6 w-[500px]"
//         >
//           <h1 className="text-xl font-bold text-center">Buy Airtime</h1>

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone Number</FormLabel>
//                 <FormControl>
//                   <Input placeholder="08012345678" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="network"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Network</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select network" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="mtn">MTN</SelectItem>
//                     <SelectItem value="glo">Glo</SelectItem>
//                     <SelectItem value="airtel">Airtel</SelectItem>
//                     <SelectItem value="9mobile">9mobile</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="amount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Amount (₦)</FormLabel>
//                 <FormControl>
//                   <Input type="number" min={50} {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full cursor-pointer">
//             Pay ₦{form.watch("amount")}
//           </Button>
//         </form>
//       </Form>

//       {/* Payment Dialog */}
//       <Dialog open={showPayment} onOpenChange={setShowPayment}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-lg font-semibold text-center">
//               Payment Details
//             </DialogTitle>
//             <p className="text-sm text-muted-foreground text-center">
//               Securely complete your airtime purchase
//             </p>
//           </DialogHeader>

//           {/* Airtime summary */}
//           {airtimeData && (
//             <div className="mb-6 rounded-lg border bg-muted/40 p-4 shadow-sm">
//               <p className="flex justify-between text-sm">
//                 <span className="font-medium text-muted-foreground">
//                   Phone:
//                 </span>
//                 <span>{airtimeData.phone}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-medium text-muted-foreground">
//                   Network:
//                 </span>
//                 <span className="capitalize">{airtimeData.network}</span>
//               </p>
//               <p className="flex justify-between text-sm">
//                 <span className="font-medium text-muted-foreground">
//                   Amount:
//                 </span>
//                 <span className="font-semibold text-primary">
//                   ₦{airtimeData.amount}
//                 </span>
//               </p>
//             </div>
//           )}

//           <Form {...paymentForm}>
//             <form
//               onSubmit={paymentForm.handleSubmit(onSubmitPayment)}
//               className="space-y-5"
//             >
//               {/* Card Number */}
//               <FormField
//                 control={paymentForm.control}
//                 name="cardNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Card Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="xxxx xxxx xxxx xxxx" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Expiry + CVV */}
//               <div className="grid grid-cols-2 gap-4">
//                 <FormField
//                   control={paymentForm.control}
//                   name="expiry"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Expiry</FormLabel>
//                       <FormControl>
//                         <Input placeholder="MM/YY" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={paymentForm.control}
//                   name="cvv"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>CVV</FormLabel>
//                       <FormControl>
//                         <Input placeholder="123" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Card brands */}
//               <div className="flex items-center justify-center gap-3 text-muted-foreground">
//                 <span className="text-xs">We accept</span>
//                 <img src="/visa.svg" alt="Visa" className="h-6" />
//                 <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
//                 <img src="/verve.svg" alt="Verve" className="h-6" />
//               </div>

//               <DialogFooter>
//                 <Button type="submit" className="w-full">
//                   Confirm Payment
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }




//app/buy-airtime/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AirtimeFormSchema,
  PaymentFormSchema,
  type AirtimeForm,
  type PaymentForm,
} from "./airtime.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  SmartphoneCharging, 
  Wifi, 
  LogIn, 
  UserPlus,
  ChevronDown,
  Phone
} from "lucide-react";

const networks = [
  { id: "mtn", name: "MTN", color: "bg-yellow-500" },
  { id: "glo", name: "GLO", color: "bg-green-500" },
  { id: "airtel", name: "AIRTEL", color: "bg-red-500" },
  { id: "9mobile", name: "ETISALAT", color: "bg-green-600" },
];

export default function AirtimePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [airtimeData, setAirtimeData] = useState<AirtimeForm | null>(null);
  const [activeTab, setActiveTab] = useState("airtime");

  // Airtime form
  const form = useForm<AirtimeForm>({
    resolver: zodResolver(AirtimeFormSchema),
    defaultValues: { phone: "", network: undefined, amount: 0 },
  });

  // Payment form
  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: { cardNumber: "", expiry: "", cvv: "" },
  });

  const onSubmitAirtime = (data: AirtimeForm) => {
    setAirtimeData(data);
    setShowPayment(true);
  };

  const onSubmitPayment = (data: PaymentForm) => {
    console.log("✅ Final Payload:", { ...airtimeData, ...data });
    alert("Payment successful! 🎉");
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
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
            <a href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              <span>Dashboard</span>
            </a>
            <a href="/buy-airtime" className="flex items-center space-x-2 text-blue-600 font-medium text-sm">
              <span>Buy Airtime & Data</span>
            </a>
            <a href="/pay-bills" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              <span>Pay Bills</span>
            </a>
            <a href="/invite" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              <span>Invite Friend</span>
            </a>
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

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100">
            <div className="grid w-full grid-cols-2">
              <button
                onClick={() => setActiveTab("airtime")}
                className={`py-4 font-medium transition-colors ${
                  activeTab === "airtime"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Airtime
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`py-4 font-medium transition-colors ${
                  activeTab === "data"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Data
              </button>
            </div>
          </div>

          {/* Airtime Tab Content */}
          {activeTab === "airtime" && (
            <div className="p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Buy Airtime</h1>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitAirtime)} className="space-y-6">
                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="What's your phone number?" 
                                {...field} 
                                className="h-12 pl-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Network Selection */}
                    <FormField
                      control={form.control}
                      name="network"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Select Biller</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select biller..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {networks.map((network) => (
                                <SelectItem key={network.id} value={network.id}>
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-6 h-6 ${network.color} rounded-full flex items-center justify-center`}>
                                      <span className="text-white text-xs font-bold">
                                        {network.name.charAt(0)}
                                      </span>
                                    </div>
                                    <span>{network.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amount */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Amount</FormLabel>
                          <FormControl>
                            <div className="text-center space-y-2">
                              <div className="text-4xl font-light text-gray-900">
                                {field.value || '0.00'}
                              </div>
                              <p className="text-sm text-gray-500">Amount will be billed in Naira</p>
                              <Input 
                                type="number" 
                                min={50} 
                                {...field}
                                className="hidden"
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                              <div className="grid grid-cols-3 gap-3 mt-4">
                                {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
                                  <Button
                                    key={amount}
                                    type="button"
                                    variant="outline"
                                    onClick={() => field.onChange(amount)}
                                    className="h-10 text-sm border-gray-200 hover:border-blue-500 hover:text-blue-600"
                                  >
                                    ₦{amount}
                                  </Button>
                                ))}
                              </div>
                              <Input
                                type="number"
                                placeholder="Enter custom amount"
                                min={50}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                className="h-12 text-center border-gray-200 focus:border-blue-500 focus:ring-blue-500 mt-4"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1 h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={!form.watch("amount") || form.watch("amount") < 50}
                      >
                        Proceed to Pay ₦{form.watch("amount") || 0}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Footer */}
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Need to keep track of your transactions?{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign up now →
                    </a>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Powered by <span className="text-blue-600">Coinley</span> - Secure Cryptocurrency Payments 🔒
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Data Tab Content */}
          {activeTab === "data" && (
            <div className="p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Buy Data</h1>
                </div>

                {/* Data form would go here - same structure as airtime */}
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label>
                    <Input 
                      placeholder="What's your phone number?" 
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Select Biller</label>
                    <Select>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select biller..." />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2 text-sm text-blue-600 font-medium">Select which biller</div>
                        {networks.map((network) => (
                          <SelectItem key={network.id} value={network.id}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${network.color} rounded-full flex items-center justify-center`}>
                                <span className="text-white text-xs font-bold">
                                  {network.name.charAt(0)}
                                </span>
                              </div>
                              <span>{network.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Proceed to Pay ₦
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Need to keep track of your transactions?{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign up now →
                    </a>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Powered by <span className="text-blue-600">Coinley</span> - Secure Cryptocurrency Payments 🔒
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Dialog - UNCHANGED TO PRESERVE FUNCTIONALITY */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              Payment Details
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center">
              Securely complete your airtime purchase
            </p>
          </DialogHeader>

          {/* Airtime summary */}
          {airtimeData && (
            <div className="mb-6 rounded-lg border bg-muted/40 p-4 shadow-sm">
              <p className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Phone:
                </span>
                <span>{airtimeData.phone}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Network:
                </span>
                <span className="capitalize">{airtimeData.network}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Amount:
                </span>
                <span className="font-semibold text-primary">
                  ₦{airtimeData.amount}
                </span>
              </p>
            </div>
          )}

          <Form {...paymentForm}>
            <form
              onSubmit={paymentForm.handleSubmit(onSubmitPayment)}
              className="space-y-5"
            >
              {/* Card Number */}
              <FormField
                control={paymentForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxx xxxx xxxx xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={paymentForm.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={paymentForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Card brands */}
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <span className="text-xs">We accept</span>
                <img src="/visa.svg" alt="Visa" className="h-6" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/verve.svg" alt="Verve" className="h-6" />
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full">
                  Confirm Payment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      
    </div>
  );
}