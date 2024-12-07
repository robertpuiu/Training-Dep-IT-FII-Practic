import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ApplicationStatus } from "@prisma/client";

import React from "react";
import TrainingQRCode from "./TrainingQRCode";
import { Badge } from "@/components/ui/badge";

export default async function MyTrainings() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const myTrainings = await db.application.findMany({
    where: {
      userId: session.user.id,
      status: ApplicationStatus.ATTENDING,
      // Show only the trainings the user paid for
      isPaid: true,
    },
    select: {
      training: true,
      attendence: true,
    },
  });

  if (myTrainings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl md:text-4xl">My Trainings</h2>

      <div className="grid grid-cols-1 gap-4">
        {myTrainings.map((training) => (
          <Card key={training.training.id}>
            <CardHeader className="flex-row justify-between items-center gap-4 p-4  ">
              <CardTitle>{training.training.name}</CardTitle>
              <TrainingQRCode
                value={JSON.stringify({
                  trainingId: training.training.id,
                  userId: session.user.id,
                })}
                trainingName={training.training.name}
              />
            </CardHeader>
            <CardContent>
              {/*  Show the attendence status over the weeks */}
              <div className="flex gap-4 flex-col md:flex-row text-center justify-center items-center">
                <strong>
                  Attendence: {training.attendence.filter((a) => a).length}/5
                </strong>

                <div className="flex md:flex-row flex-1 justify-evenly flex-wrap gap-4">
                  {new Array(5).fill(0).map((_, week) => (
                    <Badge
                      key={week}
                      className={`text-md rounded-full ${
                        training.attendence.find((a) => a.week === week + 1)
                          ? "bg-card-foreground"
                          : "opacity-20 bg-card-foreground"
                      }`}
                    >
                      Week {week + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
