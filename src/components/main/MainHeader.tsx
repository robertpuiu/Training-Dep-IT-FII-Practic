import type { FC } from "react";

import { getAuthSession } from "@/lib/auth";
import { UserNav } from "../dashboard/UserNav";
import { MainNav } from "./MainNav";
import { MainMobileNav } from "./MainMobileNav";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserNavMobile } from "../dashboard/UserNavMobile";
import { ModeToggle } from "../ModeToggle";
import { UserRole } from "@prisma/client";
import MainMobileNavCTA from "./MainMobileNavCTA";
import { landingConfig } from "@/config/landing";
import QrcodeScanner from "../qr/QrcodeScanner";

export const MaindHeader: FC = async ({}) => {
  const session = await getAuthSession();

  const role = session?.user.role;

  return (
    <header className=" sticky top-0 z-40 w-full  py-4">
      <div className="container flex h-14 items-center">
        <MainNav landingConfig={landingConfig} />

        {/* Mobile view */}
        <div className=" flex-1 items-center space-x-2 justify-end flex md:hidden">
          <MainMobileNav landingConfig={landingConfig}>
            {!session && (
              <Link href="/login">
                <MainMobileNavCTA className="w-full">Sign In</MainMobileNavCTA>
              </Link>
            )}

            {session && (
              <div className="flex-1 items-center justify-between flex">
                {role === UserRole.TRAINER && (
                  <Link href="/applications">
                    <MainMobileNavCTA>Applications</MainMobileNavCTA>
                  </Link>
                )}

                {role !== UserRole.TRAINER && (
                  <Link href="/my-applications">
                    <MainMobileNavCTA>My Applications</MainMobileNavCTA>
                  </Link>
                )}

                <UserNavMobile
                  user={{
                    name: session?.user?.name,
                    image: session?.user?.image,
                    email: session?.user?.email,
                    role: session?.user?.role,
                  }}
                />
              </div>
            )}
          </MainMobileNav>
        </div>

        {/* Desktop view */}
        <div className="hidden flex-1 items-center  space-x-4 justify-end md:flex">
          {!session && (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}

          {session && (
            <>
              {role === UserRole.TRAINER && (
                <Link href="/applications">
                  <Button>Applications</Button>
                </Link>
              )}

              {role !== UserRole.TRAINER && (
                <Link href="/my-applications">
                  <Button>My Applications</Button>
                </Link>
              )}

              <UserNav
                user={{
                  name: session?.user?.name,
                  image: session?.user?.image,
                  email: session?.user?.email,
                  role: session?.user?.role,
                }}
              />
            </>
          )}
        </div>

        <ModeToggle />

        {role === "ADMIN" || role === "VOLUNTEER" ? <QrcodeScanner /> : null}
      </div>
    </header>
  );
};
