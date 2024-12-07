import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import type { FC } from "react";
import type { OutputData } from "@editorjs/editorjs";
import { ApplicationForm } from "@/components/main/ApplicationForm";
import { getAuthSession } from "@/lib/auth";
import { UserRole } from "@prisma/client";

interface ApplicationPageProps {
  params: {
    areaName: string;
    trainingSlug: string;
  };
}

const ApplicationPage: FC<ApplicationPageProps> = async ({ params }) => {
  const session = await getAuthSession();

  if (!session) {
    return notFound();
  }

  const training = await db.training.findUnique({
    where: {
      slug: params.trainingSlug,
      area: {
        name: decodeURIComponent(params.areaName),
      },
    },
  });

  if (!training) {
    return notFound();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (session.user.role !== UserRole.TRAINER && !profile) {
    return redirect(
      `/profile?from=/arii/${params.areaName}/${params.trainingSlug}/apply`
    );
  }

  const questions = await db.question.findMany({
    where: {
      training: {
        id: training.id,
        area: {
          name: decodeURIComponent(params.areaName),
        },
      },
    },
  });

  if (!questions.length) {
    return notFound();
  }

  const formattedQuestions = questions.map((question) => ({
    id: question.id,
    content: question.content as unknown as OutputData,
    trainingId: question.trainingId,
  }));

  const alreadyApplied = await db.application.findFirst({
    where: {
      userId: session.user.id,
      training: {
        id: training.id,
        area: {
          name: decodeURIComponent(params.areaName),
        },
      },
    },
  });

  return (
    <ApplicationForm
      questions={formattedQuestions}
      showSubmitButton={
        session.user.role !== UserRole.TRAINER && !alreadyApplied
      }
      alreadyApplied={!!alreadyApplied}
    />
  );
};

export default ApplicationPage;
