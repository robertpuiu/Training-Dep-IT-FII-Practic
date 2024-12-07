"use client";

import * as React from "react";
import Link from "next/link";

import Image from "next/image";

export function DashboardMainNav() {
  return (
    <div className="mr-4 hidden md:flex">
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
    </div>
  );
}
