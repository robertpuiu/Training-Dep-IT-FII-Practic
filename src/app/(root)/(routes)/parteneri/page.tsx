import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const PartnersPage: FC = async () => {
  const response=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/parteneri`)
  const traineri = await response.json();

  console.log(traineri);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{/* Title me pls */}</CardTitle>
          <CardContent>

            <Image src="" alt=""/>
            {/* no hentai pls */}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PartnersPage;
