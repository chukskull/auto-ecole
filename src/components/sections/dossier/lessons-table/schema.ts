import { z } from "zod";
import { LessonStatus } from "@prisma/client";

export type StudentLesson = {
  id: number;
  instructorName: string;
  status: LessonStatus;
  comment: string;
  grade: number;
  price: number;
  duration: number;
  scheduledDate: Date;
};

export const studentLessonSchema: z.ZodType<StudentLesson> = z.object({
  id: z.number(),
  instructorName: z.string(),
  status: z.nativeEnum(LessonStatus),
  comment: z.string(),
  grade: z.number(),
  price: z.number(),
  duration: z.number(),
  scheduledDate: z.date(),
});
