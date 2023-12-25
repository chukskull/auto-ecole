import { z } from "zod";

import { isDigits } from "@/utils/isDigits";

export const vehicleExpenseFormSchema = z.object({
  vehicleId: z.number().min(1),
  sum: z.string().refine(isDigits),
  comment: z.string(),
  date: z.date().default(() => new Date()),
});

export const vehicleExpenseBackendSchema = z.object({
  ...vehicleExpenseFormSchema.shape,
  sum: z.number().min(1),
});
