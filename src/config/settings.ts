import { db } from "@/lib/db";
import { SettingsSchema, SettingsSchemaType } from "@/lib/validators/settings";

export const defaultSettings: SettingsSchemaType = {
  applicationsOpen: "enabled",
  participantConfirmation: "enabled",
};

export const getSettings = async () => {
  const settings = await db.setting.findMany();

  // create an object with the settings
  const formattedSettings = settings.reduce((acc, setting) => {
    return {
      ...acc,
      [setting.key]: setting.value,
    };
  }, {});

  // validate the settings
  const settingsValidation = SettingsSchema.safeParse(formattedSettings);

  return settingsValidation.success ? settingsValidation.data : defaultSettings;
};
