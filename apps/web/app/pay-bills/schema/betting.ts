import { z } from "zod";

export const BettingSchema = z.object({
  userId: z.string(),
  provider: z.string(),
  amount: z.preprocess((a) => {
    if (typeof a === "string") return parseInt(a, 10);
    if (typeof a === "number") return a;
    return 0; // fallback
  }, z.number().positive().min(100)) as z.ZodPipe<
    z.ZodTransform<number, number>,
    z.ZodNumber
  >,
});

export type BettingForm = z.infer<typeof BettingSchema>;
