import type { FC } from "react";
import Section from "./Section";
import { Icons } from "../Icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface MainFooterProps {}

const MainFooter: FC<MainFooterProps> = ({}) => {
  return (
    <footer className="flex flex-col items-center gap-2 pb-12 text-sm ">
      <div className="container flex justify-between gap-2 flex-row items-end">
        <span>
          Built with{" "}
          <Icons.binary className="inline-block h-5 w-5 text-[#D33834]" /> by{" "}
          <a
            href={siteConfig.links.asii}
            className=" transition-colors duration-300  hover:underline"
            rel="noreferrer"
            target="_blank"
          >
            <span className="font-extrabold">ASII</span>
          </a>{" "}
          in collaboration with{" "}
          <a
            href={siteConfig.links.fii}
            className=" transition-colors duration-300  hover:underline"
            rel="noreferrer"
            target="_blank"
          >
            <span className="font-extrabold">FII</span>
          </a>
          .
        </span>
        <div className="flex gap-2">
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href={siteConfig.links.facebook}
          >
            <Icons.facebook className="h-5 w-5 duration-150 group-hover:scale-110 group-hover:fill-black dark:group-hover:fill-white fill-current" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href={siteConfig.links.instagram}
          >
            <Icons.instagram className="h-5 w-5 duration-150 group-hover:scale-110 group-hover:fill-black dark:group-hover:fill-white fill-current" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href={siteConfig.links.tiktok}
          >
            <Icons.tiktok className="h-5 w-5 duration-150 group-hover:scale-110 group-hover:fill-black dark:group-hover:fill-white fill-current" />
          </a>
        </div>
      </div>
      <div className="container flex justify-between gap-2 text-neutral-500 dark:text-neutral-400  flex-row items-end">
        <span>
          <Link
            href="/GDPR.pdf"
            className=" transition-colors duration-300  hover:underline"
          >
            Privacy Policy
          </Link>
        </span>
        <span>
          <div className="inline-block rotate-180">©</div>
          {new Date().getFullYear()} FII Practic
        </span>
      </div>
    </footer>
  );
};

export default MainFooter;
