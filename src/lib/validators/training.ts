import { z } from "zod";

export const TrainingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // imageUrl: z.string().url("Image is required"),
  areaId: z.string().min(1, "Area is required"),
  slug: z.string().min(1, "Slug is required"),
  partnerId: z.string().min(1, "Partner is required"),
  description: z.string().min(1, "Description is required"),
  // content: z.any(),
  trainersIds: z.array(z.string()),
  questions: z.array(
    z.object({
      content: z.any(),
    })
  ),
  price: z.number().min(0, "Price is required"),
});

export type TrainingSchemaType = z.infer<typeof TrainingSchema>;
