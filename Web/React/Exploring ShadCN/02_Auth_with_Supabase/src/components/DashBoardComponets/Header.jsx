import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileDropDown from "./ProfileDropDown";
const Header = () => {
  
  return (
 
      <div  className="flex w-93 my-3 justify-between items-center p-2 border-2 rounded-lg  bg-gray-300 ">
        <div className="text-2xl font-bold">Add Mittr!</div>
        <ProfileDropDown/>
      </div>
  );
};

export default Header;
