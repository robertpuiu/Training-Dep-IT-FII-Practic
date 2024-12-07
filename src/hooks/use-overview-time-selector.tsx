import { TimePeriod } from "@/types";
import { create } from "zustand";

// for curent we have 4 options: lastHour, last24Hours, last7Days, last30Days

interface useOverviewTimeSelectorStore {
  selectedTime: TimePeriod;
  setSelectedTime: (selectedTime: TimePeriod) => void;
}

export const useOverviewTimeSelector = create<useOverviewTimeSelectorStore>(
  (set) => ({
    selectedTime: "lastHour",
    setSelectedTime: (selectedTime) => set({ selectedTime: selectedTime }),
  })
);
