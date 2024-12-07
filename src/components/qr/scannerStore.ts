// scannerStore.ts
import { AttendanceResponseSchemaType } from "@/lib/validators/attendance";
import { create } from "zustand";

interface ScannerState {
  isScanning: boolean;
  isInitialized: boolean;
  toggleScanning: () => void;
  setInitialized: (initialized: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  message: AttendanceResponseSchemaType | null;
  setMessage: (message: AttendanceResponseSchemaType | null) => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  isScanning: true,
  isInitialized: false,
  error: null,
  message: null,
  setError: (error: string | null) => set(() => ({ error })),
  setMessage: (message: AttendanceResponseSchemaType | null) =>
    set(() => ({ message })),
  toggleScanning: () => set((state) => ({ isScanning: !state.isScanning })),
  setInitialized: (initialized: boolean) =>
    set(() => ({ isInitialized: initialized })),
}));
