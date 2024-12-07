import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";
import { GET } from "@/app/api/arii/route";

async function fetchAreas() {
  const response = await fetch("http://localhost:3000/api/arii");
  if (!response.ok) {
    throw new Error("Failed to fetch areas");
  }
  return response.json();
}

function parse(t: string){
  return t.replace(/\s+/g, "").toLowerCase();
}

const AreasPage: FC = async () => {
  let areas = [];
  try {
    areas = await fetchAreas();
  } catch (error) {
    console.error("Error fetching areas:", error);
    }
  return (
    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 p-4">
      {areas.map((area: any, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{area.name}</CardTitle> {/* Replace 'name' with the correct field */}
            <CardContent>
              <Image src={"/arii/" + parse(area.name)+ ".png"} width={125} height={125} /> 
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default AreasPage;
