import MainFooter from "@/components/main/MainFooter";
import { MaindHeader } from "@/components/main/MainHeader";
import Banners from "@/components/main/landing/Banners/Banners";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6 overflow-x-hidden">
      <Banners />
      <MaindHeader />

      <main className="flex w-full flex-1 flex-col mb-[125px] md:gap-32 gap-24 md:container">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
