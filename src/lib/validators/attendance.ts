import { z } from "zod";

export const AttendanceSchema = z.object({
  trainingId: z.string().min(1, "Training is required"),
  userId: z.string().min(1, "User is required"),
  week: z.number().min(1, "Week is required").max(5, "Week is required"),
});

const AttendanceResponseSchema = z.object({
  userName: z.string().nullable(),
  trainingName: z.string().nullable(),
});

export type AttendanceSchemaType = z.infer<typeof AttendanceSchema>;
export type AttendanceResponseSchemaType = z.infer<
  typeof AttendanceResponseSchema
>;
