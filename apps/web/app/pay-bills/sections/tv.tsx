import { SUPPORTED_CRYPTO } from "@/buy-airtime/constants";
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
import { CableTVSchema, type CableTVForm } from "../schema/tv";

export default function CableTVSection() {
  const [packages, setPackages] = useState<BillingItem[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const { checkout } = useInterswitchCheckout();
  const items = useBillingItems();
  const { mutate: payBill, isPending } = usePayBill();

  const form = useForm<CableTVForm>({
    resolver: zodResolver(CableTVSchema),
    defaultValues: {
      provider: "",
      amount: 0.0,
      package: "",
    },
  });

  // set cable tv packages
  useEffect(() => {
    if (items.length === 0) return;
    const providers = [
      ...new Set(
        items.filter((i) => i.service === "TV").map((i) => i.providerName)
      ),
    ];
    setProviders([...providers]);
  }, []);

  const provider = form.watch("provider");
  useEffect(() => {
    if (provider) {
      const packages = items.filter(
        (i) => i.service === "TV" && i.providerName.includes(provider)
      );
      setPackages([...packages]);
    }
  }, [provider]);

  // set package

  const onSubmit = (data: CableTVForm) => {
    const paymentCode = packages.find((p) => p.displayName === data.package)
      ?.providerMeta?.[0]?.paymentCode;
    console.log({ paymentCode, providers, packages });

    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    const handleBillPayment = async (res: InterSwitchCheckoutResponse) => {
      payBill(
        {
          customerId: data.smartCardNumber,
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
      customerName: String(data.smartCardNumber),
      onComplete: handleBillPayment,
    });
  };

  console.log("items", items);
  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className="text-3xl font-bold text-gray-900">Cable & TV</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] self-stretch items-start w-full"
        >
          {/* Provider Selection */}
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Select service provider
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-md h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select service provider..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {providers.map((p) => (
                      <SelectItem key={p} value={p}>
                        <div className="flex items-center space-x-3 w-full">
                          {/* <span>
                            <Image
                              alt={`${p.providerName} logo`}
                              src={""}
                              height={25}
                              width={25}
                            />
                          </span> */}
                          <span>{p}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Package Selection */}
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Package
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-md h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {packages.map((p) => (
                      <SelectItem key={p.displayName} value={p.displayName}>
                        <div className="flex items-center space-x-3 w-full">
                          {/* <span>
                            <Image
                              alt={`${p.providerName} logo`}
                              src={""}
                              height={25}
                              width={25}
                            />
                          </span> */}
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

          {/* Meter Number */}
          <FormField
            control={form.control}
            name="smartCardNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Smart Card Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="What's your smart card number?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-md rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:border-0 outline-0 h-11 cursor-pointer"
                      disabled={!form.watch("provider")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PaySection
            control={form.control}
            disable={
              !form.watch("amount") || form.watch("amount") < 50 || isPending
            }
            watch={form.watch}
          />
        </form>
      </Form>
    </div>
  );
}
