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
import type { BillingItem } from "@/types/billingitem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BettingSchema, type BettingForm } from "../schema/betting";
import BillInput from "@/components/Input";
import { cn } from "@/lib/utils";

export default function BettingSection() {
  const [providers, setProviders] = useState<BillingItem[]>([]);
  const { checkout } = useInterswitchCheckout();
  const items = useBillingItems();

  console.log("items", items);
  const form = useForm<BettingForm>({
    resolver: zodResolver(BettingSchema),
    defaultValues: {
      userId: "",
      provider: "",
      amount: 0.0,
    },
  });

  // set electricity providers
  useEffect(() => {
    if (items.length === 0) return;
    const providers = items.filter(
      (i) => i.service === "GAMING" && i.amountType === 0
    );
    setProviders(providers);
  }, []);

  const onSubmit = (data: BettingForm) => {
    const paymentCode = providers.find((p) => p.providerName === data.provider)
      ?.providerMeta?.[0]?.paymentCode;
    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    checkout({
      amount: data.amount,
      customerId: data.userId,
      paymentCode,
    });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <h1 className="text-3xl font-bold text-gray-900">Betting</h1>
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
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select service provider..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-0">
                    {providers.map((p) => (
                      <SelectItem
                        key={p.providerName}
                        value={p.providerName}
                        className={cn(
                          field.value === p.providerName &&
                            "bg-blue-100! opacity-50"
                        )}
                      >
                        <div className="flex items-center space-x-3 w-full">
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

          {/* User ID */}
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-gray-700">
                  User ID
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <BillInput
                      type="number"
                      placeholder="What's your user ID?"
                      {...field}
                      className="flex py-[13px] px-[14.82px] gap-[7.412px] self-stretch flex-col shadow-sm rounded-lg focus-visible:ring-blue-500 focus-visible:ring-2  outline-0 h-11 focus-visible:border-transparent"
                      disabled={!form.watch("provider")}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PaySection control={form.control} disable={form.formState.isValid} />
        </form>
      </Form>
    </div>
  );
}
