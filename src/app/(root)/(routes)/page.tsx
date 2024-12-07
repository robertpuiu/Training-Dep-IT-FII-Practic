import Fireworks from "@/components/Confetti";
import AboutSection from "@/components/main/landing/AboutSection";
import AreasSection from "@/components/main/landing/AreasSection";
import EventsSections from "@/components/main/landing/EventsSections";
import HeroSection from "@/components/main/landing/HeroSection";
import HistorySection from "@/components/main/landing/HistorySection";
import NewsSection from "@/components/main/landing/NewsSection";
import Parteners from "@/components/main/landing/Partners/Parteners";

export default async function Home() {
  return (
    <>
      <HeroSection />
      {/* <NewsSection /> */}
      {/* <AreasSection /> */}
      <EventsSections />
      <AboutSection />
      <HistorySection />
      <Parteners />

      {/* <Fireworks /> */}
    </>
  );
}
