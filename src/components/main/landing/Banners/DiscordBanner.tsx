import { Icons } from "@/components/Icons";
import { getSettings } from "@/config/settings";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole, ApplicationStatus } from "@prisma/client";
import type { FC } from "react";

const DiscordBanner: FC = async ({}) => {
  const session = await getAuthSession();

  const { applicationsOpen } = await getSettings();

  if (!session) {
    return null;
  }

  if (applicationsOpen === "enabled" && session.user.role !== UserRole.ADMIN) {
    return null;
  }

  let message = null;

  switch (session.user.role) {
    case UserRole.TRAINER:
      message = "🌟🎓 Bun venit în echipa de traineri FII Practic!";
      break;
    case UserRole.ADMIN:
      message = "🎉 🥳 Felicitări, ai fost acceptat la FII Practic!";
      break;
    default:
      const itWasAcceptedAtAtLeastOneTraining = await db.application.findFirst({
        where: {
          userId: session.user.id,
          status: ApplicationStatus.ATTENDING,
        },
      });

      if (!itWasAcceptedAtAtLeastOneTraining) {
        return null;
      }
      message = "🎉 🥳 Felicitări, ai fost acceptat la FII Practic!";
  }

  return (
    <div className="text-md isolate flex items-center overflow-hidden bg-foreground text-popover px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex md:flex-row flex-col justify-between items-center gap-5">
        <div className="flex flex-col leading-6">
          <p className="font-bold">{message}</p>
          Pentru a afla mai multe detalii, te rugăm să te alături serverului de
          Discord al FII Practic.
        </div>
        <a
          href="/api/discord"
          target="_blank"
          className="flex flex-row gap-2 rounded-full  px-3.5 py-1  font-semibold dark:bg-popover-foreground bg-popover border-2"
        >
          <Icons.discord />
          <div className="dark:text-background   text-popover-foreground ">
            Join now
          </div>
        </a>
      </div>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
};

export default DiscordBanner;
