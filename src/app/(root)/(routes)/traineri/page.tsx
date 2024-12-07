import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const TrainersPage: FC = async () => {
  let trainers = await fetch(process.env.NEXT_PUBLIC_APP_URL+"/api/traineri").then((res) => res.json());
  console.log(trainers.map((trainer:any)=>{
    return trainer.name.toLowerCase().replaceAll(" ", "-").replace("ă", "a").replace("î", "i").replace("â", "a").replace("ș", "s").replace("ț", "t");
  }))
  return (
    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 p-4"> 
      {trainers.map((trainer: any) => (
          <Card key={trainer.id} className="flex flex-col space-y-1.5 p-6">
            <CardContent>
              <div className="flex justify-center p-0">
                <Image
                  src={`/trainers/${trainer.name.toLowerCase().trim().split(" ").join("-").trim().replaceAll("ă", "a").replaceAll("î", "i").replaceAll("â", "a").replaceAll("ș", "s").replaceAll("ț", "t")}.png`}
                  alt={`Picture of ${trainer.name}`}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </CardContent>
            <CardHeader>
                <CardTitle className="text-center text-lg font-bold mt-4">
                  {trainer.name}
                </CardTitle>
              </CardHeader>
          </Card>
        ))}
    </div>
  );
};

export default TrainersPage;


