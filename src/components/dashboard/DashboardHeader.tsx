import type { FC } from "react";
import { DashboardMainNav } from "./DashboardMainNav";
import { DashboardMobileNav } from "./DashbaordMobileNav";
import { UserNav } from "./UserNav";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ModeToggle } from "../ModeToggle";

interface DashboardHeaderProps {}

export const DashboardHeader: FC<DashboardHeaderProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session) {
    return notFound();
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur py-4">
      <div className="container flex h-14 items-center">
        <DashboardMainNav />
        <DashboardMobileNav />
        <div className="flex flex-1 items-center  space-x-2 justify-end">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}

          <UserNav
            user={{
              name: session.user?.name,
              image: session.user?.image,
              email: session.user?.email,
              role: session.user?.role,
            }}
          />
          {/* </nav> */}
        </div>

        <ModeToggle />
      </div>
    </header>
  );
};
