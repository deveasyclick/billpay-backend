import { z } from "zod";

export const ElectricitySchema = z.object({
  meterNo: z.transform(Number).pipe(z.number()),
  provider: z.string(),
  package: z.enum(["Prepaid", "Postpaid"]),
  coin: z.enum(["USDT", "USDC", "BUSD", "DAI"]),
  amount: z.transform(Number).pipe(z.number().min(50)),
});

export type ElectricityForm = z.infer<typeof ElectricitySchema>;
