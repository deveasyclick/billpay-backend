"use client";

import PaySection from "@/components/Pay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInterswitchCheckout } from "@/hooks/use-interswitch-checkout";
import { usePayBill } from "@/hooks/usePayBill";
import { useBillingItems } from "@/lib/context/itemContext";
import type { BillingItem } from "@/types/billingitem";
import type { InterSwitchCheckoutResponse } from "@/types/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { NetworkProvider } from "../airtime.schema";
import { SUPPORTED_NETWORKS } from "../constants";
import { DataFormSchema, type DataForm } from "../data.schema";

interface DataTabProps {}

export const DataTab = () => {
  const { checkout } = useInterswitchCheckout();
  const form = useForm<DataForm>({
    resolver: zodResolver(DataFormSchema),
    defaultValues: {
      phone: "",
      network: NetworkProvider.MTN,
      coin: "USDT",
      amount: 0,
    },
  });
  const items = useBillingItems();
  const { mutate: payBill, isPending } = usePayBill();
  const [plans, setPlans] = useState<BillingItem[]>([]);
  const network = form.watch("network");
  const planId = form.watch("planId");

  useEffect(() => {
    if (planId && plans?.length > 0) {
      const amount = plans.find((p) => p.id === planId)?.amount;
      if (amount) {
        form.setValue("amount", Math.round(amount / 100)); // convert amount to naira
      }
    }
  }, [planId, plans]);

  useEffect(() => {
    const dataPlans = items.filter(
      (i) =>
        i.service === "DATA" && i.providerName.toLowerCase().includes(network)
    );
    setPlans(dataPlans);
  }, [network]);

  const onSubmit = (data: DataForm) => {
    const paymentCode = plans.find((p) => p.id === data.planId)
      ?.providerMeta?.[0]?.paymentCode;

    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    const handleBillPayment = async (res: InterSwitchCheckoutResponse) => {
      payBill(
        {
          customerId: data.phone,
          amount: data.amount, // in naira
          requestReference: res.txnref,
          paymentCode: paymentCode,
        },
        {
          onSuccess(data) {
            console.log("success", data);
            toast.success("Payment successful 🎉");
          },
          onError(error) {
            console.log("error", error);
            toast.error(error.message);
          },
        }
      );
    };

    checkout({
      amount: data.amount, // in naira
      customerName: data.phone,
      onComplete: handleBillPayment,
    });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Buy Data</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] self-stretch items-start w-full"
        >
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-700">Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="What's your phone number?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-md rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:border-0 outline-0 h-11"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Network Selection */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Network Selection */}
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Select Network
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-md h-12!">
                        <SelectValue placeholder="Select network..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SUPPORTED_NETWORKS.map((network) => (
                        <SelectItem key={network.id} value={network.id}>
                          <div className="flex items-center space-x-3 w-full">
                            <span>
                              <Image
                                alt={`${network} logo`}
                                src={network.logo}
                                height={25}
                                width={25}
                              />
                            </span>
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

            <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Select your plan
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-md h-12! cursor-pointer">
                        <SelectValue placeholder="Select plan..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plans.map((p) => (
                        <SelectItem
                          key={p.displayName}
                          value={p.id}
                          className="hover:bg-blue-100!"
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <span>{p.displayName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PaySection
            control={form.control}
            watch={form.watch}
            disable={
              !form.watch("amount") || form.watch("amount") < 50 || isPending
            }
            disableInput={true}
          />
        </form>
      </Form>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 bg-blue-100 p-2 rounded-lg">
          Need to keep track of your transactions?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up now →
          </a>
        </p>
      </div>
    </div>
  );
};
