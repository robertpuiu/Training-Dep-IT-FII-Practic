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
    partener.imgPath = `/parteneri/${formatString(partener.name)}.png`;
  });
  // console.log(parteneri);
  return (
    <div className="grid grid-cols-4 gap-6 text-center">
      {
        parteneri.map((part, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{part.name}</CardTitle>
                <CardContent>
                  <a href={part.url} target="_blank">
                    <Image src={part.imgPath} alt="" width="100" height="100" />
                  </a>
                  {/* no hentai pls */}
                  {/* <p className="text-green-900"> sacxz</p> */}
                </CardContent>
              </CardHeader>
            </Card>
          )
        })
      }
    </div>
  );
};

export default PartnersPage;
