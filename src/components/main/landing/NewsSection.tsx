import type { FC } from "react";
import Section from "../Section";
import Link from "next/link";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsSectionProps {}

const NewsSection: FC<NewsSectionProps> = ({}) => {
  return (
    <section
      className="container flex flex-col-reverse md:flex-row gap-12 lg:pr-28 bg-fiipractic-light-gray rounded-3xl"
      id="noutati"
    >
      {/* <Image
          height={512}
          width={512}
          src="https://singlecolorimage.com/get/1C3848/1000x1000"
          alt="article photo"
          className="rounded-2xl object-cover w-full h-64 md:w-96 md:h-96 lg:h-[512px] lg:w-[512px] self-center"
        /> */}
      <div className="rounded-2xl object-cover w-full h-64 md:h-96 self-center bg-current"></div>
      <div className="flex flex-col text-fiipractic-gray justify-center">
        <p className="text-4xl md:text-5xl font-bold mb-10">Noutati</p>
        <p className="font-bold mb-6">Lorem ipsum dolor sit amet</p>
        <p className="font-medium">
          Lorem ipsum dolor sit amet. Eos dolores totam qui voluptas dolorum aut
          assumenda quod sit galisum unde et soluta sapiente! Quo ullam ducimus
          quo quibusdam sint nam corrupti dolorum non suscipit quos eos
          voluptatem omnis.
        </p>

        <Link href="/" className="flex font-bold mt-20">
          <Button variant="link" className="mt-auto">
            Vezi mai multe <ArrowRightIcon className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
