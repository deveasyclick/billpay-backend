import { z } from "zod";

export const BettingSchema = z.object({
  userId: z.string(),
  provider: z.string(),
  coin: z.enum(["USDT", "USDC", "BUSD", "DAI"]),
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ) as z.ZodPipe<z.ZodTransform<number, number>, z.ZodNumber>,
});

export type BettingForm = z.infer<typeof BettingSchema>;
