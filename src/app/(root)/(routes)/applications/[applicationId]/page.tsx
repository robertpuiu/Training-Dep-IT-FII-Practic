import EditorOutput from "@/components/EditorOutput";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { FC } from "react";
import AcceptParticipantButton from "./AcceptParticipantButton";
import { getAuthSession } from "@/lib/auth";
import UserDetails from "./UserDetails";

interface ApplicationPageProps {
  params: {
    applicationId: string;
  };
}

const ApplicationPage: FC<ApplicationPageProps> = async ({ params }) => {
  const session = await getAuthSession();

  if (!session) {
    return notFound();
  }

  const application = await db.application.findUnique({
    where: {
      id: params.applicationId,
    },
    include: {
      user: true,
      questions: true,
      training: true,
    },
  });

  if (!application) {
    return notFound();
  }

  //TODO: VERIFY ROLE AND STUFF
  const trainersTraining = await db.training.findFirst({
    where: {
      trainers: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  const userProfile = await db.profile.findUnique({
    where: {
      userId: application.userId,
    },
  });

  if (application.trainingId !== trainersTraining?.id) return notFound();

  return (
    <div className="grid items-start gap-8 container">
      <UserDetails user={application.user} userProfile={userProfile} />
      {/* <DashboardTitle title="Edit User" subtitle="Edit an existing user" /> */}
      {/* <UserForm user={user} partners={partners} /> */}
      {application.questions.map((question, i) => (
        <Card key={question.id}>
          <CardHeader>
            <h1 className="text-2xl font-semibold border-b-2">
              {`Question ${i + 1}`}
            </h1>
          </CardHeader>

          <CardContent>
            <EditorOutput
              content={question.content}
              // id={question.id}
            />
          </CardContent>
        </Card>
      ))}

      <AcceptParticipantButton
        application={{
          id: application.id,
          status: application.status,
        }}
      />
    </div>
  );
};

export default ApplicationPage;
