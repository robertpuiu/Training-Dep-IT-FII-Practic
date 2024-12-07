"use client";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Icons } from "../Icons";
import Image from "next/image";
import Link from "next/link";
import { LandingConfig } from "@/types";

interface MainMobileNavProps {
  landingConfig: LandingConfig;
  children?: React.ReactNode;
}

export function MainMobileNav({ children, landingConfig }: MainMobileNavProps) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
            ${open ? "" : "text-opacity-90"}
                inline-flex items-center justify-center rounded-md p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring`}
          >
            <Icons.menu />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-4 top-2 z-10 origin-top transition md:hidden opacity-100 scale-100 ">
              {({ close }) => (
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-ring ring-opacity-5 bg-popover border border-border ">
                  <div className="flex items-center justify-between px-5 pt-4">
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
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-popover-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring">
                      <Icons.x className="h-6 w-6 " />
                      <span className="sr-only">Close menu</span>
                    </Popover.Button>
                  </div>

                  <div className="pt-5 pb-6">
                    <div className="flex flex-col space-y-1 px-2">
                      {landingConfig.mainNav.map((link) => (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={() => close()}
                          className="inline-flex items-center border font-medium relative text-base px-4 py-2 rounded-md  border-transparent hover:bg-gray-750 "
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 px-5">{children}</div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
