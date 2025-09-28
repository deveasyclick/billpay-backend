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
import type { InterSwitchCheckoutResponse } from "@/types/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AirtimeFormSchema, type AirtimeForm } from "../schema/airtime.schema";
import { SUPPORTED_NETWORKS } from "../constants";
import { NetworkProvider } from "@/types";

interface AirtimeTabProps {}

export const AirtimeTab = () => {
  const { checkout } = useInterswitchCheckout();
  const form = useForm<AirtimeForm>({
    resolver: zodResolver(AirtimeFormSchema),
    defaultValues: {
      phone: "",
      network: NetworkProvider.MTN,
      amount: 0,
    },
  });
  const items = useBillingItems();
  const { mutate: payBill, isPending } = usePayBill();

  const onSubmit = (data: AirtimeForm) => {
    const metadata = items.find(
      (item) =>
        item.service === "AIRTIME" &&
        // item.amountType === 0 && this check is not available in test
        item.amount === 20000 &&
        item.providerName.toLowerCase().includes(data.network)
    )?.providerMeta;
    const paymentCode = metadata?.find(
      (meta) => meta.providerName === "interswitch"
    )?.paymentCode;

    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    const handleBillPayment = async (res: InterSwitchCheckoutResponse) => {
      payBill(
        {
          customerId: data.phone,
          amount: data.amount,
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
      amount: data.amount,
      customerName: data.phone,
      onComplete: handleBillPayment,
    });
  };
  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className="text-3xl font-bold text-gray-900">Buy Airtime</h1>

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
                      placeholder="What's your phone number?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-sm rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:border-0 outline-0 h-11"
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
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Select Network
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
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

          <PaySection
            control={form.control}
            disable={
              !form.watch("amount") || form.watch("amount") < 100 || isPending
            }
          />
        </form>
      </Form>
    </div>
  );
};
