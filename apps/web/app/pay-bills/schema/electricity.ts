import { z } from "zod";

export const ElectricitySchema = z.object({
  meterNo: z.transform(Number).pipe(z.number()),
  provider: z.string(),
  package: z.enum(["Prepaid", "Postpaid"]),
  coin: z.enum(["USDT", "USDC", "BUSD", "DAI"]),
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ) as z.ZodPipe<z.ZodTransform<number, number>, z.ZodNumber>,
});

export type ElectricityForm = z.infer<typeof ElectricitySchema>;
