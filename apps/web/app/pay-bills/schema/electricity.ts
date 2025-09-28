import { z } from "zod";

export const ElectricitySchema = z.object({
  meterNo: z.transform(Number).pipe(z.number()),
  provider: z.string(),
  package: z.enum(["Prepaid", "Postpaid"]),
  amount: z.preprocess((a) => {
    if (typeof a === "string") return parseInt(a, 10);
    if (typeof a === "number") return a;
    return 0; // fallback
  }, z.number().positive().min(100)) as z.ZodPipe<
    z.ZodTransform<number, number>,
    z.ZodNumber
  >,
});

export type ElectricityForm = z.infer<typeof ElectricitySchema>;
