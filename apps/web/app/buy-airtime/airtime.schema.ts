import { z } from "zod";

export enum NetworkProvider {
  MTN = "mtn",
  GLO = "glo",
  AIRTEL = "airtel",
  NINEMOBILE = "9mobile",
}

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
    .enum(["mtn", "glo", "airtel", "9mobile"])
    .refine((val) => !!val, { message: "Network is required" }),

  //amount: z.transform(Number).pipe(z.number().min(100)),
  amount: z.number().min(100),

  coin: z.enum(["USDT", "USDC", "BUSD"]),
});

export type AirtimeForm = z.infer<typeof AirtimeFormSchema>;
