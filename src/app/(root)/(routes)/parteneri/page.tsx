import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const PartnersPage: FC = async () => {
  function formatString(input) {
    return input.replace(/\s+/g, "").toLowerCase();
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/parteneri`
  );
  if (!response.ok) {
    throw new Error("Eroare");
  }
  const parteneri = await response.json();
  parteneri.map((partener) => {
    partener.imgPath = `./partneneri/${formatString(partener.name)}.png`;
  });
  console.log(parteneri);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{/* Title me pls */}</CardTitle>
          <CardContent>
            <Image src="" alt="" />
            {/* no hentai pls */}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PartnersPage;
