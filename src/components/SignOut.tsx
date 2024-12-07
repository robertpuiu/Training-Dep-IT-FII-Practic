"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface SignOutProps {
  className?: string;
}

const SignOut = ({ className, ...props }: SignOutProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "There was an error logging in with Google",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        // className="w-full"
        onClick={onSignOut}
        disabled={isLoading}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
