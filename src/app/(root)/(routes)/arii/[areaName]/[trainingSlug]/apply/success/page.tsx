import ConfettiCompoenent from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import type { FC } from "react";

interface pageProps {}

const SuccessApplyPage: FC<pageProps> = () => {
  return (
    <div className="grid md:grid-cols-5 grid-cols-none gap-4 p-4 items-center justify-center">
      <Card className="md:col-start-2 md:col-end-5">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-center">
            🎉 Congratulations! 🎉
          </h1>
        </CardHeader>

        <CardContent>
          <div>
            <p className="text-center">
              You have successfully applied to this training!
            </p>
          </div>
        </CardContent>
      </Card>
      <ConfettiCompoenent />
    </div>
  );
};

export default SuccessApplyPage;
