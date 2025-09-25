import { z } from "zod";

export const BettingSchema = z.object({
  userId: z.string(),
  provider: z.string(),
  coin: z.enum(["USDT", "USDC", "BUSD", "DAI"]),
  amount: z.transform(Number).pipe(z.number().min(50)),
});

export type BettingForm = z.infer<typeof BettingSchema>;
