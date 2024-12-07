import type { FC } from "react";
import { Button } from "@/components/ui/button";

interface AreasSectionProps {}

const AreasSection: FC<AreasSectionProps> = ({}) => {
  const areas = [
    "backend",
    "frontend",
    "mobile",
    "devops",
    "qa",
    "ux",
    "design",
  ];

  return (
    <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <p className="text-4xl md:text-5xl font-bold text-center col-span-full gap-4 mb-10">
        Ariile ediției 2024
      </p>
      {areas.map((area, index) => (
        <div
          key={area}
          className="w-full h-[450px] rounded-3xl p-4 flex flex-col items-center pb-12 col-span-1 md:[&:nth-child(8)]:col-start-2 bg-popover"
          // style={{
          //   backgroundColor:
          //     index % 6 < 3
          //       ? "hsl(var(--fiipractic-orange))"
          //       : "rgb(255,255,255,0.5)",
          //   color: index % 6 < 3 ? "var(--fiipractic-gray)" : "white",
          // }}
        >
          <p className="font-bold self-start uppercase">{area}</p>
          {/* <Image
            src="/static/arie.svg"
            height={128}
            width={128}
            alt="arie"
            className="mb-10"
          /> */}
          <div className="w-32 h-32 mb-10 bg-current"></div>
          <p className="font-medium text-center">
            Lorem ipsum dolor sit amet. Eos dolores totam qui voluptas dolorum
            aut assumenda quod sit galisum unde et soluta sapiente!{" "}
          </p>
          <Button className="mt-auto">Vezi trainingurile</Button>
        </div>
      ))}
    </section>
  );
};

export default AreasSection;
