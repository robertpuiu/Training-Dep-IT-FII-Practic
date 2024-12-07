import { PartnerTier } from "@prisma/client";
import { z } from "zod";

export const PartnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Image is required"),
  tier: z.nativeEnum(PartnerTier),
  url: z.string().url("Url is required"),
});

export type PartnerSchemaType = z.infer<typeof PartnerSchema>;
