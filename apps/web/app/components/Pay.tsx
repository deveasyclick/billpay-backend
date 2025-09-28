import { ArrowUpDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import type { UseFormWatch } from "react-hook-form";
import CustomSpinner from "./CustomSpinner";
import Network from "./Network";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface PaySectionProps {
  control: any;
  disable: boolean;
  watch: UseFormWatch<any>;
  disableInput?: boolean;
}

export default function PaySection({
  control,
  disable,
  watch,
  disableInput = false,
}: PaySectionProps) {
  return (
    <div className="flex flex-col gap-[12px] self-stretch items-start">
      <div className="flex py-[4px] px-0 justify-end items-center gap-[8px]">
        <p className="opacity-50 text-xs">Choose network:</p>
        <Button
          type="button"
          variant="default"
          className="bg-gray-100 text-black py-[6px] pr-[8px] pl-[4px]! hover:bg-gray-100 cursor-pointer flex items-center gap-[8px] rounded-[100px] h-auto"
        >
          <Network />
          <div></div>
          <p>USDT</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M13 5.72656L8 10.7266L3 5.72656"
              stroke="#010109"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      {/* Pay Section */}
      <div className="flex flex-col gap-1">
        <div className="flex bg-[#F8F8F8] rounded-lg p-[12px] gap-[8px] self-stretch relative">
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
                <FormItem>
                  <FormControl className="flex">
                    <div className="flex">
                      <span
                        id="sizer"
                        className="invisible absolute whitespace-pre text-4xl font-bold max-w-full"
                      >
                        {field.value === 0 ? "0" : field.value}
                      </span>
                      <Input
                        type="text"
                        min={100}
                        className="outline-0 bg-transparent focus:ring-0 border-none focus:outline-0 shadow-none focus:shadow-none focus-visible:ring-0 text-4xl! text-left font-bold p-0 inline-block min-w-[5px] max-w-full"
                        value={field.value === 0 ? "" : field.value}
                        style={{
                          width: `${field.value.toString().length || 1}ch`,
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow only numbers, not even the e letter
                          if (/^\d*$/.test(val)) {
                            field.onChange(val === "" ? 0 : parseInt(val, 10));
                          }
                        }}
                        placeholder="0"
                        disabled={disableInput}
                      />
                      <CustomSpinner
                        onClickUp={() => {
                          field.onChange((field.value || 0) + 100);
                        }}
                        onClickDown={() =>
                          field.onChange(Math.max((field.value || 0) - 100, 0))
                        }
                        className="font-bold"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex flex-row justify-end items-center">
            <div className="bg-white flex gap-[4px] items-center py-[4px] pr-[6px] pl-[4px] rounded-[100px] border-[0.3px] border-gray-100">
              <Network />
              <div></div>
              <span className="pl-1 font-medium leading-snug">
                {watch("coin")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex rounded-lg p-[12px] gap-[8px] self-stretch bg-[#F8F8F8]">
          <div className="w-1/2 flex items-start flex-col gap-[8px]">
            <p className="text-xs text-gray-400">You receive airtime of</p>
            <Input
              type="number"
              min={100}
              className="outline-0 bg-transparent focus:ring-0 border-none focus:outline-0 shadow-none focus:shadow-none focus-visible:ring-0 text-4xl! text-left font-bold p-0"
              value={watch("amount") || 0}
              disabled
            />
          </div>
          <div className="w-1/2 flex flex-row justify-end items-center">
            <div className="bg-white flex gap-[4px] items-center py-[4px] pr-[6px] pl-[4px] rounded-[100px] border-[0.3px] border-gray-100">
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
