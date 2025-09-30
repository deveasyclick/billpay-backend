import BillInput from "@/components/Input";
import PaySection from "@/components/Pay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInterswitchCheckout } from "@/hooks/use-interswitch-checkout";
import { useBillingItems } from "@/lib/context/itemContext";
import type { BillingItem } from "@/types/billingitem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ElectricitySchema, type ElectricityForm } from "../schema/electricity";

export default function ElectricitySection() {
  const [plans, setPlans] = useState<BillingItem[]>([]);
  const { checkout } = useInterswitchCheckout();
  const items = useBillingItems();
  console.log("items", items);
  const form = useForm<ElectricityForm>({
    resolver: zodResolver(ElectricitySchema),
    defaultValues: {
      meterNo: "",
      provider: "",
      amount: 0.0,
      package: "Prepaid",
    },
  });
  const pkg = form.watch("package");
  // set electricity plans
  useEffect(() => {
    if (items.length === 0) return;
    const dataPlans = items.filter(
      (i) => i.service === "ELECTRICITY" && i.displayName.includes(pkg)
    );
    setPlans(dataPlans);
    form.setValue("provider", "");
  }, [pkg]);

  const onSubmit = (data: ElectricityForm) => {
    const paymentCode = plans.find((p) => p.providerName === data.provider)
      ?.providerMeta?.[0]?.paymentCode;

    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    checkout({
      amount: data.amount,
      customerId: data.meterNo,
      paymentCode,
    });
  };

  return (
    <div className="flex flex-col gap-[16px] font-gilroy">
      <h1 className="text-3xl font-bold text-gray-900 font-gilroy">
        Electricity
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] self-stretch items-start w-full"
        >
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
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Prepaid">Prepaid</SelectItem>
                    <SelectItem value="Postpaid">Postpaid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select provider..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {plans.map((p) => (
                      <SelectItem key={p.providerName} value={p.providerName}>
                        <div className="flex items-center space-x-3 w-full">
                          {/* <span>
                            <Image
                              alt={`${p.providerName} logo`}
                              src={""}
                              height={25}
                              width={25}
                            />
                          </span> */}
                          <span>{p.providerName}</span>
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
            name="meterNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Meter Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <BillInput
                      type="number"
                      placeholder="What's your meter number?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-sm rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2 focus-visible:border-0 outline-0 h-11"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PaySection
            control={form.control}
            disable={!form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  );
}
