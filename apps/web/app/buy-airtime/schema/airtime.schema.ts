import { z } from "zod";
import { NetworkProvider } from "@/types";

export const AirtimeFormSchema = z.object({
  phone: z
    .string()
    .regex(/^(?:0\d{10}|\+?[1-9]\d{7,14})$/, "Enter a valid phone number")
    .transform((val) => {
      // If it's Nigerian local (starts with 0 and 11 digits), normalize to +234
      if (/^0\d{10}$/.test(val)) {
        return "+234" + val.slice(1);
      }
      // If already has +, keep it
      if (val.startsWith("+")) {
        return val;
      }
      // Otherwise, just prefix +
      return "+" + val;
    }),

  network: z
    .enum(NetworkProvider)
    .refine((val) => !!val, { message: "Network is required" }),

  amount: z.preprocess((a) => {
    if (typeof a === "string") return parseInt(a, 10);
    if (typeof a === "number") return a;
    return 0; // fallback
  }, z.number().positive().min(200)) as z.ZodPipe<
    z.ZodTransform<number, number>,
    z.ZodNumber
  >,
});

export type AirtimeForm = z.infer<typeof AirtimeFormSchema>;
