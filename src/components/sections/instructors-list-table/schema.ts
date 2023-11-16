import { z } from "zod";

export const instructorSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  phone: z.string(),
  licenseFilesCount: z.number(),
  lessonsCount: z.number(),
  createdAt: z.date(),
});

export type Instructor = z.infer<typeof instructorSchema>;
