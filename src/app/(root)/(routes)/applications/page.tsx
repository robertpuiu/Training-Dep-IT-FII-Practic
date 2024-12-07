import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { FC } from "react";
import ApplicationsClient from "./components/ApplicationsClient";
import { notFound } from "next/navigation";
import { UserRole } from "@prisma/client";

const ApplicationPage: FC = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  if (session.user.role !== UserRole.TRAINER) return notFound();

  const trainersTraining = await db.training.findFirst({
    where: {
      trainers: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  const applications = await db.application.findMany({
    where: {
      // in prisma undefined returns all
      // https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined
      trainingId: trainersTraining ? trainersTraining.id : "",
    },
    include: {
      training: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedApplications = applications.map((application) => ({
    id: application.id,
    name: application.user.name,
    status: application.status,
    email: application.user.email,
    phone: application.user.profile?.phone || "",

    createdAt: new Date(application.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),

    lastStatusChange: new Date(application.updatedAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    ),
  }));

  return (
    <div className="space-y-8 p-4">
      <h1 className="font-heading text-3xl md:text-4xl">{`Applications (${formattedApplications.length})`}</h1>

      <ApplicationsClient data={formattedApplications} />
    </div>
  );
};

export default ApplicationPage;
