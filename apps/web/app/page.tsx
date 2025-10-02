import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { SparkIcon } from "./assets/icons/spark";
import { Button } from "./components/ui/button";

const transactions = [
  {
    icon: SparkIcon,
    paymentType: "Electricity Bill",
    transactionId: "TX2409......7B9C2D",
    amount: "-50 USDT",
    status: "Paid",
    date: "1 hour ago",
  },
  {
    icon: SparkIcon,
    paymentType: "MTN Airtime +23480**9..",
    transactionId: "TX240924A7B9C2D...",
    amount: "-10 USDT",
    status: "Paid",
    date: "12th August 2025",
  },
  {
    icon: SparkIcon,
    paymentType: "DSTV Premium Subscription",
    transactionId: "TX240924A7B9C2D...",
    amount: "-24 USDT",
    status: "Pending",
    date: "2nd July 2025",
  },
  {
    icon: SparkIcon,
    paymentType: "MTN Airtime +23480**9..",
    transactionId: "TX240924A7B9C2D...",
    amount: "-50 USDT",
    status: "Failed",
    date: "2 hours ago",
  },
  {
    icon: SparkIcon,
    paymentType: "Showmax",
    transactionId: "TX240924A7B9C2D...",
    amount: "-50 USDT",
    status: "Paid",
    date: "1st August 2025",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center grow-1 shrink-0 basis-0 self-stretch py-1 px-0">
      {/*Content */}
      <div className="flex flex-col width-[679px] gap-10 items-start">
        <div className="w-96 inline-flex flex-col justify-start items-start gap-1">
          <div className="w-32 justify-start text-black text-2xl font-bold leading-7">
            Hello Dayobabs!
          </div>
          <div className="self-stretch justify-start text-black/50 text-sm  font-gilroy-regular leading-none">
            Take a look at what’s going on in your account
          </div>
        </div>

        <div className="flex flex-col gap-8 self-stretch items-start">
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-6">
            <div className="self-stretch inline-flex justify-start items-center gap-3">
              <div className="flex-1 px-1 py-2 bg-white rounded-2xl shadow-[0px_6px_6px_-4px_rgba(0,0,0,0.04)] outline outline-[0.50px] outline-offset-[-0.50px] outline-gray-200 inline-flex flex-col justify-start items-start gap-0.5 overflow-hidden">
                <div className="self-stretch px-4 py-3 rounded-xl inline-flex justify-start items-center gap-5 overflow-hidden">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="text-center justify-start text-gray-600 text-xs font-gilroy-regular leading-none">
                      Total Payment Value
                    </div>
                    <div className="text-center justify-start text-black text-xl font-bold font-['Gilroy-Bold'] leading-7">
                      $350
                    </div>
                  </div>
                  <div className="w-6 h-6 relative overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                    >
                      <path
                        d="M19.5 9C19.5 7.75736 18.4926 6.75 17.25 6.75H13.5C13.5 8.40685 12.1569 9.75 10.5 9.75C8.84315 9.75 7.5 8.40685 7.5 6.75H3.75C2.50736 6.75 1.5 7.75736 1.5 9M19.5 9V15C19.5 16.2426 18.4926 17.25 17.25 17.25H3.75C2.50736 17.25 1.5 16.2426 1.5 15V9M19.5 9V6M1.5 9V6M19.5 6C19.5 4.75736 18.4926 3.75 17.25 3.75H3.75C2.50736 3.75 1.5 4.75736 1.5 6M19.5 6V3C19.5 1.75736 18.4926 0.75 17.25 0.75H3.75C2.50736 0.75 1.5 1.75736 1.5 3V6"
                        stroke="#010109"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-1 py-2 bg-white rounded-2xl shadow-[0px_6px_6px_-4px_rgba(0,0,0,0.04)] outline outline-[0.50px] outline-offset-[-0.50px] outline-gray-200 inline-flex flex-col justify-start items-start gap-0.5 overflow-hidden">
                <div className="self-stretch px-4 py-3 rounded-xl inline-flex justify-start items-center gap-5 overflow-hidden">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="text-center justify-start text-gray-600 text-xs font-['Gilroy-Regular'] leading-none">
                      Total Payments made
                    </div>
                    <div className="text-center justify-start text-black text-xl font-bold font-['Gilroy-Bold'] leading-7">
                      12
                    </div>
                  </div>
                  <div className="w-6 h-6 relative overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M2.25 8.25H21.75M2.25 9H21.75M5.25 14.25H11.25M5.25 16.5H8.25M4.5 19.5H19.5C20.7426 19.5 21.75 18.4926 21.75 17.25V6.75C21.75 5.50736 20.7426 4.5 19.5 4.5H4.5C3.25736 4.5 2.25 5.50736 2.25 6.75V17.25C2.25 18.4926 3.25736 19.5 4.5 19.5Z"
                        stroke="#010109"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-end gap-3">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-black text-xl font-normal font-['Gilroy-Medium'] leading-snug">
                  Overview
                </div>
                <div className="pl-2.5 pr-3 py-2.5 bg-white rounded-lg outline-[0.70px] outline-offset-[-0.70px] outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="text-center justify-start text-black text-sm font-bold font-['Gilroy-Bold'] leading-none">
                    Last 6 Months
                  </div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="self-stretch p-1 bg-white rounded-3xl shadow-[0px_6px_6px_-4px_rgba(0,0,0,0.04)] outline outline-[0.50px] outline-offset-[-0.50px] outline-gray-200 flex flex-col justify-start items-start gap-0.5 relative">
                <div className="self-stretch h-72 px-5 py-4 bg-slate-100 rounded-3xl outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200/20 flex flex-col justify-end items-start gap-2.5 overflow-hidden">
                  <div className="self-stretch flex flex-col justify-start items-center gap-4">
                    <div className="self-stretch inline-flex justify-between items-end">
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-32 relative bg-blue-600 rounded" />
                          <div className="w-10 h-20 relative bg-blue-400 rounded" />
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          Jan
                        </div>
                      </div>
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-20 relative bg-blue-600 rounded" />
                          <div className="w-10 h-36 relative bg-blue-400 rounded" />
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          Feb
                        </div>
                      </div>
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-44 relative bg-blue-600 rounded" />
                          <div className="w-10 h-20 relative bg-blue-400 rounded" />

                          <div className="p-1 bg-white rounded-2xl shadow-[0px_6px_6px_-4px_rgba(0,0,0,0.04)] outline-[0.50px] outline-offset-[-0.50px] outline-gray-200 inline-flex flex-col justify-start items-start gap-0.5 overflow-hidden absolute top-11 left-67">
                            <div className="px-3 py-2 bg-neutral-50 rounded-xl flex flex-col justify-start items-start gap-3 overflow-hidden">
                              <div className="flex flex-col justify-start items-start gap-1">
                                <div className="text-center justify-start text-black text-sm font-normal font-['Gilroy-Bold'] leading-none">
                                  March
                                </div>
                              </div>
                              <div className="flex flex-col justify-start items-start gap-1">
                                <div className="flex flex-col justify-center items-start gap-3">
                                  <div className="inline-flex justify-start items-center gap-2">
                                    <div className="w-3 h-3 relative bg-blue-600 rounded" />
                                    <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Medium'] leading-3">
                                      Airtime & Data
                                    </div>
                                    <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Medium'] leading-3">
                                      $230
                                    </div>
                                  </div>
                                  <div className="inline-flex justify-start items-center gap-2">
                                    <div className="w-3 h-3 relative bg-blue-400 rounded" />
                                    <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Medium'] leading-3">
                                      Pay Bills
                                    </div>
                                    <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Medium'] leading-3">
                                      $89
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          Mar
                        </div>
                      </div>
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-7 relative bg-blue-600 rounded" />
                          <div className="w-10 h-12 relative bg-blue-400 rounded" />
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          Apr
                        </div>
                      </div>
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-16 relative bg-blue-600 rounded" />
                          <div className="w-10 h-36 relative bg-blue-400 rounded" />
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          May
                        </div>
                      </div>
                      <div className="w-20 inline-flex flex-col justify-start items-center gap-3">
                        <div className="self-stretch inline-flex justify-start items-end gap-1">
                          <div className="w-10 h-40 relative bg-blue-600 rounded" />
                          <div className="w-10 h-28 relative bg-blue-400 rounded" />
                        </div>
                        <div className="self-stretch text-center justify-start text-black text-sm font-normal font-['Gilroy-Medium'] leading-none">
                          Jun
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-5">
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-3 h-3 relative bg-blue-600 rounded" />
                        <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Regular'] leading-3">
                          Airtime & Data
                        </div>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-3 h-3 relative bg-blue-400 rounded" />
                        <div className="text-center justify-start text-black text-xs font-normal font-['Gilroy-Regular'] leading-3">
                          Pay Bills
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="self-stretch justify-start text-black text-2xl font-normal font-['Gilroy-Medium'] leading-relaxed">
            Recent Transactions
          </div>

          <Table className="rounded-2xl">
            <TableHeader className="border-0">
              <TableRow className="bg-[#2563EB0D] font-gilroy-regular text-sm color-black leading-5 border-0!">
                <TableHead>Payment Type</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-0">
              {transactions.map((t, i) => (
                <TableRow className="border-1 border-[#0000000F]" key={i}>
                  <TableCell className="border-0">
                    <div className="flex p-3 gap-3 items-center">
                      <span className="bg-[#E5EBF9] w-9 h-9 rounded-xl flex justify-center items-center">
                        {<t.icon className="w-6 h-6" />}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-gilroy-regular leading-5 font-bold">
                          {t.paymentType}
                        </span>
                        <span className="text-xs text-[#00000080] leading-5 font-gilroy-regular">
                          {t.date}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    <div className="p-3 #8A8A8A font-gilroy-regular">
                      {t.transactionId}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-gilroy-medium tracking-[-0.045px]">
                    {t.amount}
                  </TableCell>
                  <TableCell>
                    <div className="p-3">
                      {t.status === "Paid" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-green-700 border border-green-100 h-[26px] min-w-20 flex justify-center items-center gap-2">
                          Paid
                        </span>
                      )}
                      {t.status === "Pending" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200 h-[26px] min-w-20 flex justify-center items-center gap-2">
                          Pending
                        </span>
                      )}
                      {t.status === "Failed" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 border border-red-200 h-[26px] min-w-20 flex justify-center items-center gap-2">
                          Failed
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-center w-full">
            <Button className="text-xs font-normal  leading-tight bg-[#2563EB] text-white rounded-[100px] py-0! px-[20px]">
              Show more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
