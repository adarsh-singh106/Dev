import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const ProfileDropDown = ({ showFavorites, setShowFavorites }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const avatarUrl = user?.user_metadata?.avatar_url;
  const initals = user?.email?.slice(0, 2).toUpperCase() || "U";
  const name = user?.user_metadata?.full_name || user?.email || "My Account";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="overflow-hidden focus:outline-none">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>{initals}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "Show All Friends" : "Favourites"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
};

export default ProfileDropDown;
