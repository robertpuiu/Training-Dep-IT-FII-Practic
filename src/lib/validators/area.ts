import { z } from "zod";

export const AreaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Image is required"),
});

export type AreaSchemaType = z.infer<typeof AreaSchema>;
