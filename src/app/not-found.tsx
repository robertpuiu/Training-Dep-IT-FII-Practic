import MainFooter from "@/components/main/MainFooter";
import { MaindHeader } from "@/components/main/MainHeader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col space-y-6 overflow-x-hidden">
      <MaindHeader />

      <main className="flex w-full flex-1 flex-col mb-[125px] gap-8 md:container items-center">
        <h1 className="text-6xl font-bold text-center">404</h1>
        <Image
          src="/cat.jpeg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <Link href="/">
          <Button size={"lg"}>Back to home</Button>
        </Link>
      </main>

      <MainFooter />
    </div>
  );
};

export default NotFoundPage;
