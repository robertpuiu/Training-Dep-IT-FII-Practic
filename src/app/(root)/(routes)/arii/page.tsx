import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { FC } from "react";

const AreasPage: FC = async () => {
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

export default AreasPage;
