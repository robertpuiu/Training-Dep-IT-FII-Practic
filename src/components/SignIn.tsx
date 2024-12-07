"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/Icons";
// import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { userAuthSchema } from "@/lib/validators/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;
interface SignInProps {
  className?: string;
}

const SignIn = ({ className, ...props }: SignInProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  async function loginWithEmail(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      // redirect: false,
      // { callbackUrl: from || "/" }
      redirect: false,
      callbackUrl: from || "/",
    });

    setIsLoading(false);

    if (signInResult?.error) {
      return toast.error("There was an error logging in with email");
    }

    router.push("/login?emailSentTo=" + data.email);
    return toast("We sent you a login link.\nBe sure to check your spam too.", {
      icon: "📧",
      duration: 6000,
    });
  }

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);

    try {
      await signIn(
        "google",
        { redirect: false, callbackUrl: from || "/" }
        // { prompt: "select_account", partner: "test" }
      );
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "There was an error logging in with Google",
      //   variant: "destructive",
      // });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(loginWithEmail)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && (
              <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        isLoading={isGoogleLoading}
        type="button"
        size="sm"
        onClick={loginWithGoogle}
        disabled={isLoading || isGoogleLoading}
        variant={"outline"}
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        {isGoogleLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default SignIn;
