"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { LandingConfig } from "@/types";

interface MainNavProps {
  landingConfig: LandingConfig;
}

export function MainNav({ landingConfig }: MainNavProps) {
  return (
    <div className="mr-4 flex ">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src="/static/fii-practic-white.svg"
          alt=""
          width={150}
          height={55}
          className="hidden dark:block"
        />
        <Image
          src="/static/logo-fiipractic-final.svg"
          alt=""
          width={150}
          height={55}
          className="block dark:hidden"
        />
      </Link>
      <nav className=" items-center gap-6 text-sm font-medium hidden md:ml-10 md:flex">
        {landingConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80 text-lg font-medium "
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
