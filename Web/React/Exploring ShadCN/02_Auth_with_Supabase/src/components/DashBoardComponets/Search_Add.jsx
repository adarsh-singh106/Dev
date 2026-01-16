import React from "react";
import { SquarePlus, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
// 1. Remove 'Link' (we don't need it)
// 2. Import your Modal
import { FriendModal } from "@/components/DashBoardComponets/FriendModal";

const Search_Add = ({ onAdd }) => {
  return (
    <div className="flex justify-between gap-2 items-center">
      {/* Search Input Section (Kept exactly the same) */}
      <InputGroup className="w-78 h-10 mb-2 border-3 border-black">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {/* <InputGroupAddon align="inline-end">
          <InputGroupButton>Search</InputGroupButton>
        </InputGroupAddon> */}
      </InputGroup>

      {/* 3. The Modal Implementation */}
      <div className="hover:opacity-80 transition-opacity">
        <FriendModal
          // A. We pass the function we received from Dashboard -> DashPage -> Here
          onSubmit={onAdd}
          // B. We define what the button looks like
          trigger={
            <button>
              <SquarePlus className="h-10 w-10" />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Search_Add;
