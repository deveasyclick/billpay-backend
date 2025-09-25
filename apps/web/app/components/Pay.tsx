import { SUPPORTED_CRYPTO } from "@/buy-airtime/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import CustomSpinner from "./CustomSpinner";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
export default function PaySection({
  control,
  disable,
  watch,
}: {
  control: any;
  disable: boolean;
  watch: any;
}) {
  //const aamount = watch("amount");
  return (
    <div className="flex flex-col gap-[12px] self-stretch items-start">
      <FormField
        control={control}
        name="coin"
        render={({ field }) => (
          <FormItem className="flex px-0 py-4px justify-end items-center gap-[8px]">
            <FormLabel className="text-sm font-medium text-gray-500 font-inter tracking-[-0.14px]">
              Choose network:
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-gray-100 p-0">
                  <SelectValue placeholder="Select a coin..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SUPPORTED_CRYPTO.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-6 h-6 flex items-center justify-center mr-1!">
                        <Image
                          src={c.logo}
                          alt={c.name}
                          width={25}
                          height={25}
                          className="object-contain"
                        />
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pay Section */}
      <div className="flex flex-col gap-1">
        <div className="flex bg-gray-50 rounded-lg p-[12px] gap-[8px] self-stretch relative">
          <div className="absolute bottom-[-20px] right-[200px]">
            <span className="bg-white p-3 flex rounded-full">
              <ArrowUpDown width={20} height={20} />
            </span>
          </div>
          <div className="w-1/2 flex items-start flex-col gap-[8px]">
            <p className="text-xs">You pay USDT worth</p>
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <>
                      <Input
                        type="number"
                        min={100}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="outline-0 bg-transparent focus:ring-0 border-none focus:outline-0 shadow-none focus:shadow-none focus-visible:ring-0 text-4xl! text-left font-bold p-0"
                        value={field.value}
                      />
                      <CustomSpinner
                        onClickUp={(v: number) => {
                          field.onChange(v);
                        }}
                        onClickDown={() => {
                          if (field.value <= 0 || field.value - 100 <= 0) {
                            field.onChange(0);
                            return;
                          }
                          field.onChange((field.value || 0) - 100);
                        }}
                        className="absolute left-9 right-0 top-2 bottom-0 font-bold"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex flex-row justify-end items-center">
            <div className="bg-white flex gap-[4px] items-center">
              <span>
                <Image
                  src="/icons/usdt.svg"
                  alt="flag"
                  width={25}
                  height={10}
                  className="object-contain"
                />
              </span>
              <span className="pl-1 font-medium leading-snug">
                {watch("coin")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-[12px] gap-[8px] self-stretch">
          <div className="w-1/2 flex items-start flex-col gap-[8px]">
            <p className="text-xs text-gray-400">You receive airtime of</p>
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      type="number"
                      min={100}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      className="outline-0 bg-transparent focus:ring-0 border-none focus:outline-0 shadow-none focus:shadow-none focus-visible:ring-0 text-4xl! text-left font-bold p-0"
                      value={field.value}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex flex-row justify-end items-center">
            <div className="bg-white flex gap-[4px] items-center">
              <span>
                <Image
                  src="/icons/nigeria-flag.svg"
                  alt="flag"
                  width={25}
                  height={10}
                  className="object-contain"
                />
              </span>
              <span className="pl-1 font-medium leading-snug">NGN</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-[12px] self-stretch">
        <Button
          type="button"
          variant="outline"
          className="border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-100 hover:text-blue-500  h-[37px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-2 bg-indigo-400 hover:bg-indigo-700 text-white font-medium cursor-pointer w-full"
          disabled={disable}
        >
          Proceed to Pay <ShieldCheck />
        </Button>
      </div>
    </div>
  );
}
