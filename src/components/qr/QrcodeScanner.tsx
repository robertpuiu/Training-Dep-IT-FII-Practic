"use client";

import React, { useEffect, useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { Html5QrcodeScanType } from "html5-qrcode";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import UserScannedInfo from "./UserScannedInfo";
import {
  AttendanceResponseSchemaType,
  AttendanceSchema,
  AttendanceSchemaType,
} from "@/lib/validators/attendance";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { decrypt } from "@/lib/utils";
import { useScannerStore } from "./scannerStore";

const FormSchema = z.object({
  week: z.string().min(1, "Week is required"),
});

export default function QrcodeScanner() {
  const { setError, setMessage } = useScannerStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: attend, isLoading } = useMutation({
    mutationFn: async (values: AttendanceSchemaType) => {
      return axios.post(`/api/attendance`, values);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError(err.response.data);
        }
        if (err.response?.status === 403) {
          setError(err.response.data);
        }
        if (err.response?.status === 404) {
          setError(err.response.data);
        }
        if (err.response?.status === 409) {
          setError(err.response.data);
        }
        if (!err.response) {
          setError("No internet connection");
        }
      } else {
        setError("Unknown error");
      }
    },
    onSuccess: (data) => {
      console.log(data.data);
      setMessage(data.data as AttendanceResponseSchemaType);
    },
  });

  const handleQrCodeSuccess = (newQrCodeMessage: string) => {
    // If already loading, don't do anything
    if (isLoading) {
      return;
    }

    // parse the qr code message
    try {
      if (!form.getValues().week) {
        setError("Week is required");

        return;
      }

      const decodedQrCode = decrypt(newQrCodeMessage);

      const parsed = JSON.parse(decodedQrCode);
      console.log(parsed);
      const payload = AttendanceSchema.parse({
        ...parsed,
        week: parseInt(form.getValues().week),
      });

      attend(payload);
    } catch (e) {
      console.error(e);
      setError("Invalid QR code");
    }
  };

  const handleQrCodeError = (errorMessage: string) => {
    // setError(errorMessage);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icons.scanBarcode />
            <span className="sr-only">Scan QR code</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Html5QrcodePlugin
            config={{
              fps: 10,
              qrbox: 250,
              disableFlip: false,
              supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            }}
            qrCodeSuccessCallback={handleQrCodeSuccess}
            qrCodeErrorCallback={handleQrCodeError}
          />

          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select week" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => (
                          <SelectItem value={`${i + 1}`} key={i}>
                            Week {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* <DialogDescription className="overflow-auto">
            {qrCodeMessage && (
              <div className="text-green-500 text-sm font-medium">
                {qrCodeMessage}
              </div>
            )}
          </DialogDescription> */}
        </DialogContent>
      </Dialog>

      <UserScannedInfo />
    </>
  );
}
