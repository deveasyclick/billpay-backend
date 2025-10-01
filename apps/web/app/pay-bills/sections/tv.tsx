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
import { CableTVSchema, type CableTVForm } from "../schema/tv";
import { cn } from "@/lib/utils";
import { useValidateCustomer } from "@/queries/validate-customer";
import { Check } from "lucide-react";
import { LoaderTree } from "@/assets/icons/loader";

export default function CableTVSection() {
  const [packages, setPackages] = useState<BillingItem[]>([]);
  const [providers, setProviders] = useState<string[]>([]);
  const [paymentCode, setPaymentCode] = useState<string>("");
  const { checkout } = useInterswitchCheckout();
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

  const form = useForm<CableTVForm>({
    resolver: zodResolver(CableTVSchema),
    defaultValues: {
      provider: "",
      amount: 0.0,
      package: "",
      smartCardNumber: "",
    },
  });

  useEffect(() => {
    if (isError) {
      form.setError("smartCardNumber", {
        message: error?.message ?? "Validation failed",
      });
    }
  }, [isError, error, form]);

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

  // set packages
  const provider = form.watch("provider");
  useEffect(() => {
    if (provider) {
      const packages = items.filter(
        (i) => i.service === "TV" && i.providerName.includes(provider)
      );
      setPackages([...packages]);
    }
  }, [provider]);

  // set amount
  const pkg = form.watch("package");
  useEffect(() => {
    if (pkg) {
      const selectedPackage = packages.find((p) => p.displayName === pkg);
      const amount = selectedPackage?.amount || 0;
      const paymentCode = selectedPackage?.providerMeta?.[0]?.paymentCode;
      if (paymentCode) {
        setPaymentCode(paymentCode.toString());
      }
      form.setValue("amount", amount / 100);
    }
  }, [pkg]);

  const onSubmit = (data: CableTVForm) => {
    if (!paymentCode) {
      console.log("paymentCode not found");
      toast.error("An error occurred. Please try again later.");
      return;
    }

    if (isIdle || !isSuccess) {
      form.clearErrors("smartCardNumber");
      validateCustomer({
        customerId: data.smartCardNumber,
        paymentCode,
      });
      return;
    }

    checkout({
      amount: data.amount,
      customerId: data.smartCardNumber,
      paymentCode,
    });
  };

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
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select service provider..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-0">
                    {providers.map((p) => (
                      <SelectItem
                        key={p}
                        value={p}
                        className={cn(
                          field.value === p && "bg-blue-100! opacity-50"
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
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full shadow-sm h-12! cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-0">
                    {packages.map((p) => (
                      <SelectItem
                        key={p.displayName}
                        value={p.displayName}
                        className={cn(
                          field.value === p.displayName &&
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
                    <BillInput
                      type="number"
                      placeholder="What's your smart card number?"
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

          <PaySection
            control={form.control}
            disable={isPending || isError}
            disableInput={true}
          />
        </form>
      </Form>
    </div>
  );
}
