"use client";

import { Popover } from "@headlessui/react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface MainMobileNavCTAProps {
  children?: React.ReactNode;
  className?: string;
}

const MainMobileNavCTA: FC<MainMobileNavCTAProps> = ({ children }, props) => {
  return (
    <Popover.Button>
      <Button {...props} className={cn("w-full", props.className)}>
        {children}
      </Button>
    </Popover.Button>
  );
};

export default MainMobileNavCTA;
