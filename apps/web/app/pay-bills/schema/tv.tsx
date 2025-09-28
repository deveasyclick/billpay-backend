import { z } from "zod";

export const CableTVSchema = z.object({
  smartCardNumber: z.string().min(5, "Invalid Card Number"),
  provider: z.string().min(1, "Please select a provider"),
  package: z.string().min(1, "Please select a package"),
  amount: z.number().min(100),
});

export type CableTVForm = z.infer<typeof CableTVSchema>;
