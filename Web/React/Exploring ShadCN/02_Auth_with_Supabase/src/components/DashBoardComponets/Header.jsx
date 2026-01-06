import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileDropDown from "./ProfileDropDown";
const Component01 = () => {
  
  return (
    <div className="w-70">
      <div  className="flex justify-between px-3 py-2 border-2 rounded-lg bg-gray-300 ">
        <div className="text-xl font-bold">Add Mittr!</div>
        <ProfileDropDown/>
      </div>
    </div>
  );
};

export default Component01;
