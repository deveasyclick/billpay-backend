import { z } from "zod";

export const CableTVSchema = z.object({
  smartCardNumber: z.transform(Number).pipe(z.number().min(50)),
  provider: z.string(),
  package: z.string(),
  amount: z.number().min(100),
});

export type CableTVForm = z.infer<typeof CableTVSchema>;
