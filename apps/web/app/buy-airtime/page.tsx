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

const networks = [
  { id: "mtn", name: "MTN" },
  { id: "glo", name: "Glo" },
  { id: "airtel", name: "Airtel" },
  { id: "9mobile", name: "9mobile" },
];

export default function AirtimePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [airtimeData, setAirtimeData] = useState<AirtimeForm | null>(null);

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
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-8 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitAirtime)}
          className="space-y-8 bg-white shadow-lg rounded-xl p-6 w-[500px]"
        >
          <h1 className="text-xl font-bold text-center">Buy Airtime</h1>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="08012345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mtn">MTN</SelectItem>
                    <SelectItem value="glo">Glo</SelectItem>
                    <SelectItem value="airtel">Airtel</SelectItem>
                    <SelectItem value="9mobile">9mobile</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₦)</FormLabel>
                <FormControl>
                  <Input type="number" min={50} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Pay ₦{form.watch("amount")}
          </Button>
        </form>
      </Form>

      {/* Payment Dialog */}
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
