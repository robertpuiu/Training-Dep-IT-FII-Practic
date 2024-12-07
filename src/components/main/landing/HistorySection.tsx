import Image from "next/image";
import type { FC } from "react";

interface HistorySectionProps {}

const HistorySection: FC<HistorySectionProps> = ({}) => {
  return (
    <section
      className="container flex flex-1 flex-col-reverse md:flex-row-reverse justify-between gap-8"
      id="despre"
    >
      {/* <div className="rounded-2xl object-cover h-64 md:h-[512px] md:w-2/3 order-1 md:order-2 bg-current"></div> */}
      <Image
        src="/static/noi.jpg"
        width={450}
        height={450}
        alt="Fii Practic"
        className="rounded-2xl object-cover h-64 md:h-[450px] md:w-1/2 order-1 md:order-2 self-center"
      />

      <div className="flex flex-col justify-center gap-10 md:w-1/2 order-1 md:order-2 ">
        <p className="text-4xl md:text-5xl font-bold text-center md:text-left">
          <span className="md:block inline">Istorie</span>
        </p>
        <p className="font-medium text-xl md:text-xl">
          Din 2012, proiectul FII Practic își încurajează participanții să-și
          exerseze pasiunea, experiența și abilitățile în diferite domenii IT.
          Prin îmbinarea utilului cu plăcutul, companiile IT din Iași dezvoltă
          de 11 ani comunitatea de tineri informaticieni pe arii precum Back
          End, Front End, Machine Learning, 3D Modelling, DevOps, Project
          Management, Business Analysis, Management Antreprenorial, Quality
          Assurance și multe altele. Prin oportunitățile de dezvoltare
          profesională, socială și personală oferite atât în cadrul traininguri,
          festivităților, dar și a competițiilor de tip hackathon marca FII
          Practic, proiectul a susținut introducerea în IT a mii de tineri.
        </p>
      </div>
      {/* <Image
        height={512}
        width={512}
        src="/static/noi.jpg"
        alt="article photo"
        className="rounded-2xl object-cover h-64 md:h-[512px] w-full order-1 md:order-2"
      /> */}
    </section>
  );
};

export default HistorySection;
