import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { FC } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { getSettings } from "@/config/settings";

interface TrainingPageProps {
  params: {
    areaName: string;
    trainingSlug: string;
  };
}

const TrainingPage: FC<TrainingPageProps> = async ({ params }) => {
  const session = await getAuthSession();

  const training = await db.training.findUnique({
    where: {
      slug: params.trainingSlug,
      area: {
        name: decodeURIComponent(params.areaName),
      },
    },
    include: {
      trainers: true,
    },
  });

  if (!training) {
    return notFound();
  }

  const profile = session?.user.id
    ? await db.profile.findUnique({
        where: {
          userId: session.user.id,
        },
      })
    : null;

  const { applicationsOpen } = await getSettings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <h1 className="text-2xl font-semibold border-b-2">{training.name}</h1>
        </CardHeader>

        <CardContent className="prose dark:prose-invert max-w-none">
          <MDXRemote source={training.description} />
        </CardContent>
      </Card>

      <div className="space-y-6">
        {training.trainers.length > 0 && (
          <Card>
            <CardHeader>
              <h1 className="text-2xl font-semibold border-b-2">Trainers</h1>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-4">
              {training.trainers.map((trainer) => (
                <div key={trainer.id} className="flex flex-col items-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={trainer.image ?? ""}
                      className="object-contain"
                    />
                    <AvatarFallback>{getInitials(trainer.name)}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-semibold text-center">
                    {trainer.name}
                  </h1>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* //Price */}
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-semibold border-b-2">
              Taxa de participare
            </h1>
          </CardHeader>

          <CardContent>
            <p className="text-xl font-semibold">{training.price} RON</p>
          </CardContent>

          <CardFooter className="flex flex-col items-start justify-center">
            <ul className="list-disc list-inside">
              <li>
                taxa se va percepe în momentul în care vei fi acceptat la
                training
              </li>
              <li>taxa este percepută de către ASII</li>
            </ul>
          </CardFooter>
        </Card>

        <div>
          {applicationsOpen === "enabled" ? (
            <>
              {/* E trainer sau e participant logat cu profile */}
              {(session?.user?.role === UserRole.TRAINER || profile) && (
                <Link href={`/arii/${params.areaName}/${training.slug}/apply`}>
                  <Button className="w-full">Aplica</Button>
                </Link>
              )}

              {/* E user logat fara profile */}
              {session &&
                session?.user?.role !== UserRole.TRAINER &&
                !profile && (
                  <Link href={`/profile`}>
                    <Button className="w-full ">
                      Completeaza-ti profilul pentru a aplica
                    </Button>
                  </Link>
                )}

              {/* E guest */}
              {!session && (
                <Link href={`/arii/${params.areaName}/${training.slug}/apply`}>
                  <Button className="w-full">
                    Autentifica-te pentru a aplica
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Button className="w-full" disabled={true}>
              Înscrierile s-au închis
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
