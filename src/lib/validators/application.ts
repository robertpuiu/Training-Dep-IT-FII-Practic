import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const FrontendApplicationSchema = z.object({
  questions: z.record(
    z.object({
      answers: z.union([
        z.array(z.string()).min(1, "Camp obligatoriu"),
        z.string().min(1, "Camp obligatoriu").max(5000, "Maxim 5000 caractere"),
      ]),
    })
  ),
});

export const BackendApplicationSchema = z.object({
  questions: z.array(
    z.object({
      content: z.any(),
    })
  ),
  trainingId: z.string().min(1, "Training is required"),
});

export const PatchApplicationSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
  isPaid: z.boolean().optional(),
});

export type FrontendApplicationSchemaType = z.infer<
  typeof FrontendApplicationSchema
>;
export type BackendApplicationSchemaType = z.infer<
  typeof BackendApplicationSchema
>;
export type PatchApplicationSchemaType = z.infer<typeof PatchApplicationSchema>;
