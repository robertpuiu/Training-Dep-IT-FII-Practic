import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Profile, User } from "@prisma/client";
import React from "react";
import { allUniversitiesIasi, allHighSchoolsIasi } from "@/lib/institutions";

interface UserDetailsProps {
  user: User;
  userProfile: Profile | null;
}

export default function UserDetails({ userProfile, user }: UserDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <strong>Name: </strong>
        {user.name}
      </CardHeader>

      <CardContent>
        <ul>
          <li>
            {userProfile?.institution && (
              <>
                <strong>Institution: </strong>
                {
                  allUniversitiesIasi.find(
                    (university) => university.id === userProfile.institution
                  )?.name
                }
                {
                  allHighSchoolsIasi.find(
                    (highSchool) => highSchool.id === userProfile.institution
                  )?.name
                }
              </>
            )}
          </li>

          <li>
            {userProfile?.otherInstitution && (
              <>
                <strong>Institution: </strong>
                {userProfile.otherInstitution}
              </>
            )}
          </li>

          <li>
            {userProfile?.faculty && (
              <>
                <strong>Faculty: </strong>

                {
                  allUniversitiesIasi
                    .find(
                      (university) => university.id === userProfile.institution
                    )
                    ?.faculties?.find(
                      (faculty) => faculty.id === userProfile.faculty
                    )?.name
                }
              </>
            )}
          </li>

          <li>
            {userProfile?.otherFaculty && (
              <>
                <strong>Faculty: </strong>
                {userProfile.otherFaculty}
              </>
            )}
          </li>

          <li>
            {userProfile?.year && (
              <>
                <strong>Year: </strong>
                {userProfile.year}
              </>
            )}
          </li>

          <li>
            {userProfile?.grade && (
              <>
                <strong>Grade: </strong>
                {userProfile.grade}
              </>
            )}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
