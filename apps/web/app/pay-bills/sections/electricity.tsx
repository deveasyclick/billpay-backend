import { LoaderTree } from "@/assets/icons/loader";
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
import { cn } from "@/lib/utils";
import { useValidateCustomer } from "@/queries/validate-customer";
import type { BillingItem } from "@/types/billingitem";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ElectricitySchema, type ElectricityForm } from "../schema/electricity";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ElectricitySection() {
  const [plans, setPlans] = useState<BillingItem[]>([]);
  const { checkout } = useInterswitchCheckout();
  const [paymentCode, setPaymentCode] = useState<string>("");
  const items = useBillingItems();
  const {
    mutate: validateCustomer,
    isPending,
    isError,
    isSuccess,
    data,
    error,
    isIdle,
    reset,
  } = useValidateCustomer();

  const form = useForm<ElectricityForm>({
    resolver: zodResolver(ElectricitySchema),
    defaultValues: {
      meterNo: "",
      provider: "",
      amount: 0.0,
      package: "Prepaid",
    },
  });

  useEffect(() => {
    if (isError) {
      form.setError("meterNo", {
        message: error?.message ?? "Validation failed",
      });
    }
  }, [isError, error, form]);

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

  const provider = form.watch("provider");
  useEffect(() => {
    if (provider) {
      const paymentCode = plans.find((p) => p.providerName === provider)
        ?.providerMeta?.[0]?.paymentCode;
      if (paymentCode) {
        setPaymentCode(paymentCode.toString());
      }
    }
  }, [provider]);

  const onSubmit = (data: ElectricityForm) => {
    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    if (isIdle || !isSuccess) {
      form.clearErrors("meterNo");
      validateCustomer({
        customerId: data.meterNo,
        paymentCode,
      });
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
                  Select a Package
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-start gap-1.5 self-stretch w-full">
                      <div
                        className={cn(
                          "flex p-3 items-center gap-[7.412px] self-stretch border-[0.741px] border-[#E5E5E5] rounded-[11.859px] shadow-right-bottom w-1/2",
                          field.value === "Prepaid" &&
                            "border-[#2563EB] border-1"
                        )}
                      >
                        <RadioGroupItem
                          value="Prepaid"
                          id="r1"
                          className="data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor="r1">Prepaid</Label>
                      </div>
                      <div
                        className={cn(
                          "flex p-3 items-center gap-[7.412px] self-stretch border-[0.741px] border-[#E5E5E5] rounded-[11.859px] shadow-right-bottom w-1/2",
                          field.value === "Postpaid" &&
                            "border-[#2563EB] border-1"
                        )}
                      >
                        <RadioGroupItem value="Postpaid" id="r2" />
                        <Label htmlFor="r2">Postpaid</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                  <SelectContent className="border-0">
                    {plans.map((p) => (
                      <SelectItem
                        key={p.providerName}
                        value={p.providerName}
                        className={cn(
                          field.value === p.providerName &&
                            "bg-blue-100! opacity-50"
                        )}
                      >
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
                      onChange={(e) => {
                        field.onChange(e);
                        reset();
                      }}
                    />
                  </div>
                </FormControl>
                {isSuccess && (
                  <span className="text-blue-700 flex gap-1 text-[13px] items-center">
                    <Check className="w-4 h-4" />
                    {data.FullName}
                  </span>
                )}
                {isPending && (
                  <span className="text-red-500 flex gap-2 text-xs">
                    <LoaderTree className="animate-spin" /> Validating...
                  </span>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* We should allow them to pay even if validation fails */}
          <PaySection control={form.control} disable={isPending || isError} />
        </form>
      </Form>
    </div>
  );
}
