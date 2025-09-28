"use client";

import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import CustomSpinner from "./CustomSpinner";
import { Button } from "./ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface PaySectionProps {
  control: any;
  disable: boolean;
  disableInput?: boolean;
}

export default function PaySection({
  control,
  disable,
  disableInput = false,
}: PaySectionProps) {
  return (
    <div className="flex flex-col gap-[12px] self-stretch items-start">
      {/* Pay Section */}
      <div className="flex flex-row w-full">
        <div className="flex bg-[#F8F8F8] rounded-lg p-[12px] gap-[8px] self-stretch relative w-full">
          <div className="w-1/2 flex items-start flex-col gap-[8px]">
            <p className="text-xs">You pay an amount of</p>
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
              <Image
                alt="Nigeria flag"
                src="/icons/nigeria-flag.svg"
                height={20}
                width={20}
              />
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
