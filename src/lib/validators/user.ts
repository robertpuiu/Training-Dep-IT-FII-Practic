import { z } from "zod";
import { UserRole } from "@prisma/client";

export const UserSchema = z
  .object({
    role: z.nativeEnum(UserRole),
    // if the user is TRAINER, then the partnerId is required
    partnerId: z.string().min(1, "Partner is required").nullable(),
    name: z.string().min(1, "Name is required"),
    image: z.string().url("Image is required"),
  })
  .refine((data) => !(data.role === UserRole.TRAINER && !data.partnerId), {
    message: "Partner is required",
    path: ["partnerId"],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;
