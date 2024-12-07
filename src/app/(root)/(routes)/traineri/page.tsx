import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const TrainersPage: FC = async () => {
  let trainers = await fetch("/api/traineri").then((res) => res.json());

  return (
    <div> 
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
