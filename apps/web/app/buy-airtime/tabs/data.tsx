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
import { useBillingItems } from "@/lib/context/itemContext";
import { NetworkProvider } from "@/types";
import type { BillingItem } from "@/types/billingitem";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SUPPORTED_NETWORKS } from "../constants";
import { DataFormSchema, type DataForm } from "../schema/data.schema";

interface DataTabProps {}

export const DataTab = () => {
  const { checkout } = useInterswitchCheckout();
  const form = useForm<DataForm>({
    resolver: zodResolver(DataFormSchema),
    defaultValues: {
      phone: "",
      network: NetworkProvider.MTN,
      amount: 0,
    },
  });
  const items = useBillingItems();
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

    checkout({
      amount: data.amount,
      customerId: data.phone,
      paymentCode,
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
                <FormLabel className="text-gray-700 text-xs">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="What's your phone number?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-sm rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2  outline-0 h-11 focus-visible:border-transparent"
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
                      <SelectItem value="9mobile">
                        <div className="flex items-center space-x-3 w-full">
                          <span>
                            <Image
                              alt="9mobile logo"
                              src="/icons/9mobile.png"
                              height={18}
                              width={18}
                            />
                          </span>
                          <span>9MOBILE</span>
                        </div>
                      </SelectItem>
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
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
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
            disable={!form.formState.isValid}
            disableInput={true}
          />
        </form>
      </Form>
    </div>
  );
};
