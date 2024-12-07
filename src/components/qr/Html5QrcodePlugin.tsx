// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner, Html5QrcodeScannerState } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useRef, useState } from "react";
import { useScannerStore } from "./scannerStore";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  config?: Html5QrcodeScannerConfig;
  verbose?: boolean;
  qrCodeSuccessCallback: (qrCodeMessage: string) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

const Html5QrcodePlugin = (props: Html5QrcodePluginProps) => {
  const { qrCodeSuccessCallback, qrCodeErrorCallback } = props;
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const { isScanning, isInitialized, setInitialized, toggleScanning } =
    useScannerStore();

  useEffect(() => {
    // Use reference to avoid recreating the object when double rendered in Dev Strict Mode.
    if (ref.current === null) {
      ref.current = new Html5QrcodeScanner(
        qrcodeRegionId,
        props.config,
        props.verbose
      );
    }
    const html5QrcodeScanner = ref.current;

    console.log("Html5QrcodePlugin mounted");

    // Timeout to allow the clean-up function to finish in case of double render.
    setTimeout(() => {
      const container = document.getElementById(qrcodeRegionId);
      if (html5QrcodeScanner && container?.innerHTML == "") {
        html5QrcodeScanner.render(onScanSuccess, onScanError);
        setInitialized(true);
      }
    }, 0);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner
        .clear()
        .catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        })
        .then(() => {
          console.log("html5QrcodeScanner cleared.");
        });
      setInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (ref.current && isInitialized) {
      try {
        isScanning ? ref.current.resume() : ref.current.pause();
      } catch {}
    }
  }, [isScanning, isInitialized]);

  const onScanSuccess = (decodedText: string) => {
    toggleScanning();
    qrCodeSuccessCallback(decodedText);
  };

  const onScanError = (errorMessage: string) => {
    if (qrCodeErrorCallback) {
      qrCodeErrorCallback(errorMessage);
    }
  };

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
