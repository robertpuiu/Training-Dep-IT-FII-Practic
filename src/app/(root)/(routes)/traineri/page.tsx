import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const TrainersPage: FC = async () => {
  let trainers = await fetch(process.env.NEXT_PUBLIC_APP_URL+"/api/traineri").then((res) => res.json());

  return (
    <div> 
      {trainers.map((trainer: any) => console.log(trainer))}
      <Card>
        <CardHeader>
          <CardTitle>{/* Title me pls */}</CardTitle>
          <CardContent>
            <Image />
            {/* no hentai pls */}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TrainersPage;
