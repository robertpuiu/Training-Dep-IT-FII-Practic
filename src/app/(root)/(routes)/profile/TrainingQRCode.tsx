"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { encrypt } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function TrainingQRCode({
  value,
  trainingName,
}: {
  value: string;
  trainingName: string;
}) {
  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    router.refresh();
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.qrCode />
          <span className="sr-only">Training QR code</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle>{trainingName}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 256,
              width: "100%",
              background: "white",
              padding: 16,
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={encrypt(value)}
              viewBox={`0 0 256 256`}
            />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
