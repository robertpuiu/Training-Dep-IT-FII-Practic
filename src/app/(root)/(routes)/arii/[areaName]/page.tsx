import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";

interface AreaPageProps {
  params: {
    areaName: string;
  };
}

const AreaPage: FC<AreaPageProps> = async ({ params }) => {
  const trainingsPerArea = await db.training.findMany({
    where: {
      area: {
        name: decodeURIComponent(params.areaName),
      },
    },
    include: {
      partner: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="p-4">
      <h1 className="font-black md:text-8xl text-5xl mb-8 md:ml-10 ml-5 ">{`#${decodeURIComponent(
        params.areaName
      )}`}</h1>

      {trainingsPerArea.length > 0 ? (
        <div className="flex flex-col gap-4">
          {trainingsPerArea.map((training) => (
            <Link
              href={`/arii/${params.areaName}/${training.slug}`}
              key={training.id}
            >
              <Card className="bg-card p-4 flex justify-between items-center">
                <p className="font-medium">
                  {training.name}{" "}
                  <span className="font-bold">
                    by {/* TODO REMOVE THIS */}
                    {training.partner.name !== "IT's Wise"
                      ? training.partner.name
                      : "IT's Wise x Wantsome"}
                  </span>
                </p>
                <ArrowRight className="w-8 h-8 ml-4" />
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        // Coming soon
        <Card>
          <div className="flex space-x-4 space-y-2 flex-col justify-center items-center p-4">
            <h1 className="text-3xl font-semibold">Coming soon</h1>
            <p className="text-center">
              We&apos;re working hard to bring you the best training in this
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AreaPage;
