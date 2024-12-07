import type { FC } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
}

const Section: FC<SectionProps & React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      {...props}
      // className={cn(
      //   "relative z-0 before:absolute before:inset-0 before:z-[-1] before:content-[ ] before:w-screen before:left-1/2 before:transform before:-translate-x-1/2 before:h-100",
      //   className
      // )}
    >
      {children}
    </section>
  );
};

export default Section;
