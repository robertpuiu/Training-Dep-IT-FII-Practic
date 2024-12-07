import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useScannerStore } from "./scannerStore";

export default function UserScannedInfo() {
  const { toggleScanning, message, error, setError, setMessage } =
    useScannerStore();

  return (
    <AlertDialog open={message !== null || error !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {error ? "Error" : null}
            {message ? "Success" : null}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {error ? error : null}
            {message ? (
              <>
                <p>
                  <strong>Name: </strong>
                  {message?.userName}
                </p>
                <p>
                  <strong>Training: </strong>
                  {message?.trainingName}
                </p>
              </>
            ) : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setError(null);
              setMessage(null);
              toggleScanning();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
