import { cn } from "@/lib/utils";
import ModalProvider from "@/providers/ModalProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ToastProvider from "@/providers/ToastProvider";
import "@/styles/global.css";
import { env } from "@root/env.mjs";
import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";

// Force dynamic rendering, which will result in routes
// being rendered for each user at request time.
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "FII Practic",
  description: "Traininguri în IT pentru elevi şi studenți",
  openGraph: {
    title: "FII Practic",
    description: "Traininguri în IT pentru elevi şi studenți",
    url: env.NEXT_PUBLIC_APP_URL,
    siteName: "FII Practic",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased font-montserrat bg-background ",
          inter.variable,
          fontHeading.variable,
          montserrat.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastProvider />
          <ModalProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
