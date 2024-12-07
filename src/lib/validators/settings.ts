import { z } from "zod";

export const SettingsSchema = z.object({
  applicationsOpen: z.union([z.literal("enabled"), z.literal("disabled")]),
  participantConfirmation: z.union([
    z.literal("enabled"),
    z.literal("disabled"),
  ]),
});

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
