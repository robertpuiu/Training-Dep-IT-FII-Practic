import type { FC } from "react";
import Section from "../Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/config/settings";

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = async ({}) => {
  const { applicationsOpen } = await getSettings();

  return (
    <Section>
      <div className=" container flex text-left justify-between py-8 gap-8">
        <div className=" gap-8 flex flex-col justify-center ">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-center md:text-left font-black">
            <span className="uppercase bg-gradient-to-br bg-[#F59C22]  bg-clip-text text-transparent dark:bg-[#FABB21] sm:text-8xl sm:leading-[5.5rem]">
              fii practic
            </span>
            <div className="text-primary">{new Date().getFullYear()}</div>
          </h1>
          <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8 font-medium">
            FII Practic reprezintă o provocare destinată elevilor și
            studenților, dar și profesioniștilor din mediul corporatist. Scopul
            acestei inițiative este să ofere participanților șansa de a-și
            dezvolta abilități noi prin intermediul sesiunilor de învățare
            practică alături de specialiști ai domeniului.
          </p>
          {applicationsOpen === "enabled" ? (
            <Link href="/arii">
              <Button className={cn("w-full")} size="lg">
                Descopera ariile!
              </Button>
            </Link>
          ) : (
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 py-8 sm:py-0 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              ✨ Înscrierile s-au încheiat! ✨
            </button>
          )}
        </div>

        <Image
          src="/static/hero.svg"
          width={600}
          height={500}
          alt="Fii Practic"
          className="hidden md:block"
        />
      </div>
    </Section>
  );
};

export default HeroSection;
