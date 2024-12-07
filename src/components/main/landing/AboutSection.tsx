import Image from "next/image";
import type { FC } from "react";

interface AboutSectionProps {}

const AboutSection: FC<AboutSectionProps> = ({}) => {
  return (
    <section
      className="container flex flex-1 flex-col-reverse md:flex-row justify-between gap-8"
      id="despre"
    >
      {/* <div className="rounded-2xl object-cover h-64 md:h-[512px] md:w-2/3 order-1 md:order-2 bg-current"></div> */}
      <Image
        src="/static/team.jpg"
        width={450}
        height={450}
        quality={100}
        alt="Fii Practic"
        className="rounded-2xl object-cover h-64 md:h-[450px] md:w-1/2 order-1 md:order-2 self-center"
      />

      <div className="flex flex-col justify-center gap-10 md:w-1/2 order-1 md:order-2 ">
        <p className="text-4xl md:text-5xl font-bold text-center md:text-left">
          <span className="md:block inline">Despre noi</span>
        </p>
        <p className="font-medium text-lg md:text-xl">
          FII Practic reprezintă o inițiativă marca ASII (Asociația Studenților
          Informaticieni Ieșeni). Viziunea noastră este cea de a transmite
          experiența de învățare și atitudinea din industria IT ieșeană printr-o
          serie de traininguri adaptate cerințelor în arii precum: Front End,
          Back End, Quality Assurance și multe altele. Prin contactul cu
          specialiști și oportunități, participanții FII Practic au
          oportunitatea să descopere timp de 5 săptămâni tehnologii și abilități
          care să îi ajute în dezvoltarea carierei lor.
        </p>
      </div>
      {/* <Image
          height={512}
          width={512}
          src="https://singlecolorimage.com/get/1C3848/1000x1000"
          alt="article photo"
          className="rounded-2xl object-cover h-64 md:h-[512px] w-full order-1 md:order-2"
        /> */}
    </section>
  );
};

export default AboutSection;
