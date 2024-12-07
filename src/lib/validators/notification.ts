import { z } from "zod";

// Type for the data returned by qstash API for notifications sms and email when a trainer accepts an application
// so we need some kind of information about the application and the user if is a sms notification we need the phone number
// if is an email notification we need the email address and the name of the user and the training name
export const NotificationSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  trainingName: z.string(),
  phoneNumber: z.string(),
});

export type NotificationSchemaType = z.infer<typeof NotificationSchema>;
