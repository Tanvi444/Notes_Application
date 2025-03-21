import React from "react";
import initials from "initials";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutButton } from "../auth";
import { logoutUser } from "@/services/user";
import { useUserProfile } from "@/hooks";
import { useAuthProvider } from "@/context/auth";

export const UserAccount: React.FC = () => {
  const { setAccessToken } = useAuthProvider();
  const { data: user } = useUserProfile();

  const handleLogout = () => {
    const success = logoutUser();

    if (success) {
      setAccessToken(null);
    }
  };

  if (!user) {
    return (
      <div className="size-9 p-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0">
        <span className="size-9 rounded-full flex items-center text-sm justify-center bg-primary text-primary-foreground"></span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-9 p-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0">
          <span className="size-9 rounded-full flex items-center text-sm justify-center bg-primary text-primary-foreground">
            {initials(user.name)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm uppercase font-semibold tracking-wide leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogoutButton>Logout</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
