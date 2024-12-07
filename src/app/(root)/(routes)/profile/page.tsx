import { ProfileForm } from "@/components/main/ProfileForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { UserRole } from "@prisma/client";
import MyTrainings from "./MyTrainings";

const ProfilePage: FC = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  if (session.user.role === UserRole.TRAINER) {
    return notFound();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: session?.user?.id,
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-16 p-4">
      <ProfileForm userProfile={profile} name={user ? user.name : null} />

      <MyTrainings />
    </div>
  );
};

export default ProfilePage;
