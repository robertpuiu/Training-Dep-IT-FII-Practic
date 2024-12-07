import { z } from "zod";
import { InstitutionType } from "@prisma/client";

export const ProfileSchema = z
  .object({
    phone: z.string().regex(/^(\+40)[0-9]{9}$|^(\+373)[0-9]{8}$/, {
      message:
        "Numărul de telefon trebuie să fie valid și să includă codul de țară (+40 pentru România sau +373 pentru Moldova). Exemplu: +40700112233 sau +37379123456.",
    }),
    institution: z.string().max(100),
    faculty: z.string().max(100),
    otherInstitution: z.string().max(100),
    otherFaculty: z.string().max(100),
    institutionType: z.nativeEnum(InstitutionType),

    year: z.string().max(100),

    grade: z.string().max(100),

    address: z.string().min(1, "Adresa este obligatorie").max(100), // Address is required
    county: z.string().min(1, "Județul este obligatoriu").max(100), // County is required
    city: z.string().min(1, "Orașul este obligatoriu").max(100), // City is required
    hasAgreedGdpr: z.boolean().refine((v) => v, {
      message: "Trebuie să fiți de acord cu GDPR", // You must agree to the GDPR
    }),

    name: z.string().min(1, "Numele complet este obligatoriu").max(100), // Full name is required
  })
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.UNIVERSITY) {
        return data.year !== null;
      }
      return true;
    },
    {
      message: "Anul este obligatoriu", // Year is required
      path: ["year"],
    }
  )
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.UNIVERSITY) {
        return !(
          Number.parseInt(data.year, 10) > 6 ||
          Number.parseInt(data.year, 10) < 1 ||
          !data.year
        );
      }
      return true;
    },
    {
      message: "Anul nu poate fi mai mic decât 1 sau mai mare decât 6", // Year cannot be less than 1 or greater than 12
      path: ["year"],
    }
  )
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.SCHOOL) {
        return data.grade !== null;
      }
      return true;
    },
    {
      message: "Clasa este obligatorie", // Grade is required
      path: ["grade"],
    }
  )
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.SCHOOL) {
        return !(
          Number.parseInt(data.grade, 10) > 12 ||
          Number.parseInt(data.grade, 10) < 1 ||
          !data.grade
        );
      }
      return true;
    },
    {
      message: "Clasa nu poate fi mai mică decât 1 sau mai mare decât 12", // Grade cannot be less than 1 or greater than 12
      path: ["grade"],
    }
  )
  .refine(
    (data) => {
      if (
        data.institutionType === InstitutionType.UNIVERSITY &&
        data.institution !== "0"
      ) {
        return data.faculty !== "";
      }
      return true;
    },
    {
      message: "Facultatea este obligatorie", // Faculty is required
      path: ["faculty"],
    }
  )
  .refine(
    (data) => {
      if (
        data.institutionType === InstitutionType.UNIVERSITY &&
        data.institution === "0"
      ) {
        return data.otherFaculty !== "";
      }
      return true;
    },
    {
      message: "Facultatea este obligatorie", // Faculty is required
      path: ["otherFaculty"],
    }
  )
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.UNIVERSITY) {
        return data.institution !== "";
      }
      return true;
    },
    {
      message: "Universitatea este obligatorie", // Faculty is required
      path: ["institution"],
    }
  )
  .refine(
    (data) => {
      if (data.institutionType === InstitutionType.SCHOOL) {
        return data.institution !== "";
      }
      return true;
    },
    {
      message: "Instituția este obligatorie",
      path: ["institution"],
    }
  )
  .refine(
    (data) => {
      if (
        data.institutionType === InstitutionType.SCHOOL &&
        data.institution === "0"
      ) {
        return data.otherInstitution !== "";
      }
      return true;
    },
    {
      message: "Instituția este obligatorie",
      path: ["otherInstitution"],
    }
  )
  .refine(
    (data) => {
      if (
        data.institutionType === InstitutionType.UNIVERSITY &&
        data.institution === "0"
      ) {
        return data.otherInstitution !== "";
      }
      return true;
    },
    {
      message: "Universitatea este obligatorie",
      path: ["otherInstitution"],
    }
  );

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
