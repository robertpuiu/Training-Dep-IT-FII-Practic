"use client";

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import type { ExtendedUser } from "next-auth";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserNavProps {
  user: Pick<ExtendedUser, "name" | "email" | "image" | "role">;
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user?.image ? (
              <AvatarImage alt="Profile Picture" src={user.image} />
            ) : (
              <AvatarFallback>
                <span className="sr-only">{user.name}</span>
                <Image src="/static/bulb.png" alt="" width={150} height={55} />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground text-ellipsis">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user.role !== UserRole.TRAINER && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {/* {user.role === UserRole.TRAINER && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push("/applications")}
              className="cursor-pointer"
            >
              My Applications
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )} */}

        {user.role === UserRole.ADMIN && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer"
            >
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `/`,
            });
          }}
        >
          Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
