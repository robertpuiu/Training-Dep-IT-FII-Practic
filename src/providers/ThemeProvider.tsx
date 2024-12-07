"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div>
        <div
          className="dark:bg-top dark:bg-dark dark:bg-landing
         bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        >
          <div
          //   className="dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
          // bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,166,119,0.3),rgba(255,255,255,0))]"
          >
            {children}
          </div>
        </div>
      </div>
    </NextThemesProvider>
  );
}
