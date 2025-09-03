"use client";
import { Button } from "@/components/ui/button";
import { CoffeeIcon } from "lucide-react";
import { useAuth } from "../../../../../_providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Navbar = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="w-full h-[56px] flex px-20 py-4 justify-between">
      <Link href="/Home">
        <div className="w-[147px] h-5 font-bold text-[16px] text-black flex gap-2">
          <CoffeeIcon className="w-5 h-5" /> Buy Me Coffee
        </div>
      </Link>
      {user ? (
        <div className="w-[187px] h-10 flex gap-2 px-4 py-2 justify-center items-center">
          <Avatar>
            <AvatarImage src={user?.profile?.avatarImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{user?.profile?.name}</p>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    onClick={signOut}
                    className="cursor-pointer"
                  >
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ) : (
        <Button
          onClick={signOut}
          className="w-[73px] h-[40px] font-medium text-[14px] text-black bg-[#f4f4f5] cursor-pointer  hover:text-white"
        >
          Log out
        </Button>
      )}
    </div>
  );
};
