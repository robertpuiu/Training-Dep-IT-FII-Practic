"use client";

import { ProfileSchema, ProfileSchemaType } from "@/lib/validators/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Profile, InstitutionType } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { allHighSchoolsIasi, allUniversitiesIasi } from "@/lib/institutions";
import SearchSelector from "../SearchSelector";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  userProfile: Profile | null;
  name: string | null;
}

export const ProfileForm = ({ userProfile, name }: ProfileFormProps) => {
  const router = useRouter();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
      city: userProfile?.city || "",
      county: userProfile?.county || "",
      institutionType: userProfile?.institutionType || InstitutionType.SCHOOL,
      institution: userProfile?.institution || "",
      faculty: userProfile?.faculty || "",
      otherFaculty: userProfile?.otherFaculty || "",
      otherInstitution: userProfile?.otherInstitution || "",
      hasAgreedGdpr: userProfile?.hasAgreedGdpr || false,
      year: userProfile?.year || "",
      grade: userProfile?.grade || "",
      name: name || "",
    },
  });

  const toastMessage = "Profile updated!";

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async (values: ProfileSchemaType) => {
      const { data } = await axios.patch(`/api/profile`, values);
      return data as string;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          return toast.error("Invalid profile data!");
        }
      }
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.refresh();
    },
  });

  const onSubmit = async (values: ProfileSchemaType) => {
    await updateProfile(values);
  };

  const institutionType = form.watch("institutionType");
  const institution = form.watch("institution");
  const isOtherInstitutionSelected = institution === "0";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume Complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Ion Ionescu" {...field} />
                  </FormControl>
                  <FormDescription>
                    Numele complet va fi folosit pentru a te identifica.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="institutionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipul institutiei de invatamant</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("institution", "");
                      form.setValue("grade", "");
                      form.setValue("year", "");
                      form.setValue("faculty", "");
                      form.setValue("otherInstitution", "");
                      form.setValue("otherFaculty", "");
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px] bg-background">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(InstitutionType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === InstitutionType.SCHOOL && "Liceu"}
                          {type === InstitutionType.UNIVERSITY &&
                            "Universitate"}
                          {type === InstitutionType.OTHER && "ALTĂ OPȚIUNE"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {institutionType === InstitutionType.SCHOOL && (
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institutia de invatamant</FormLabel>

                    <SearchSelector
                      value={allHighSchoolsIasi.find(
                        (university) => university.id === field.value
                      )}
                      onChange={(value) => {
                        form.setValue("otherInstitution", "");
                        form.setValue("otherFaculty", "");
                        field.onChange(value);
                      }}
                      options={allHighSchoolsIasi}
                      placeholder="Institutia de invatamant"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {institutionType === InstitutionType.UNIVERSITY && (
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Universitate</FormLabel>

                    <SearchSelector
                      value={allUniversitiesIasi.find(
                        (university) => university.id === field.value
                      )}
                      onChange={(value) => {
                        form.setValue("faculty", "");
                        form.setValue("otherFaculty", "");
                        form.setValue("otherInstitution", "");
                        field.onChange(value);
                      }}
                      options={allUniversitiesIasi}
                      placeholder="Universitatea"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {institutionType === InstitutionType.UNIVERSITY &&
            !isOtherInstitutionSelected &&
            institution && (
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="faculty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facultatea</FormLabel>
                      <SearchSelector
                        value={allUniversitiesIasi
                          .find((university) => university.id === institution)
                          ?.faculties?.find(
                            (faculty) => faculty.id === field.value
                          )}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        options={
                          allUniversitiesIasi.find(
                            (university) => university.id === institution
                          )?.faculties || []
                        }
                        placeholder="Facultate"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

          {isOtherInstitutionSelected && (
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="otherInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {`ALTĂ ${
                        (institutionType === InstitutionType.SCHOOL &&
                          "ȘCOALĂ") ||
                        (institutionType === InstitutionType.UNIVERSITY &&
                          "UNIVERSITATE")
                      }`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`ALTĂ ${
                          (institutionType === InstitutionType.SCHOOL &&
                            "ȘCOALĂ") ||
                          (institutionType === InstitutionType.UNIVERSITY &&
                            "UNIVERSITATE")
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {isOtherInstitutionSelected &&
            institutionType === InstitutionType.UNIVERSITY && (
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="otherFaculty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ALTĂ FACULTATE</FormLabel>
                      <FormControl>
                        <Input placeholder="ALTĂ FACULTATE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

          <div className="grid grid-cols-1 ">
            {institutionType === InstitutionType.OTHER && (
              <FormField
                control={form.control}
                name="otherInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ALTĂ OPȚIUNE</FormLabel>
                    <FormControl>
                      <Input placeholder="ALTĂ OPȚIUNE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {institutionType === InstitutionType.SCHOOL && (
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clasa</FormLabel>
                    <FormControl>
                      <Input placeholder="Clasa" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {institutionType === InstitutionType.UNIVERSITY && (
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anul</FormLabel>
                    <FormControl>
                      <Input placeholder="Anul" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numar de telefon</FormLabel>
                <FormControl>
                  <Input placeholder="Numarul tau de telefon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresa</FormLabel>
                <FormControl>
                  <Input placeholder="Adresa ta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oras</FormLabel>
                  <FormControl>
                    <Input placeholder="Orasul tau" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judet</FormLabel>
                  <FormControl>
                    <Input placeholder="Judetul tau" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="hasAgreedGdpr"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                <div>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Acord de prelucrare a datelor
                    </FormLabel>
                  </div>

                  <div className="flex space-x-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Sunt de acord ca datele mele să fie colectate și procesate
                      conform{" "}
                      <Link
                        href="/GDPR.pdf"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Notei de informare conform GDPR
                      </Link>
                      .
                    </FormDescription>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isUpdating} isLoading={isUpdating}>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
