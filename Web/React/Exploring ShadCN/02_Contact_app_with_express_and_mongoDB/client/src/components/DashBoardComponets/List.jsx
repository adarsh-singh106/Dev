import React, { useState } from "react";
import { PenBox, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FriendModal } from "@/components/DashBoardComponets/FriendModal"; // Import Modal
import FriendDetailsModal from "./FriendDetailsModal";

const List = ({ data = [], updateFriend, deleteFriend }) => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Derive the selected friend from the fresh data prop
  const selectedFriend = data.find((f) => f.id === selectedFriendId);

  const handleCardClick = (friend) => {
    setSelectedFriendId(friend.id);
    setIsDetailsOpen(true);
  };

  const handleToggleFavorite = (friend) => {
    updateFriend({ ...friend, is_favorite: !friend.is_favorite });
    // Modal will now auto-update because 'selectedFriend' is derived from 'data'
    // which updates when parent Dashboard updates its state
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((friend) => (
        <div
          key={friend.id}
          onClick={() => handleCardClick(friend)}
          className="flex justify-between items-center bg-white border-2 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition"
        >
          {/* Left Side: Avatar & Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${friend.name}`}
              />
              <AvatarFallback>{friend.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{friend.name}</h2>
              <p className="text-gray-500">{friend.email}</p>
              {/* Optional: Show status or nickname if you want */}
              <span className="text-xs text-gray-400">{friend.status}</span>
            </div>
          </div>

          {/* Right Side: Actions */}
          <div className="flex gap-3 mr-1" onClick={(e) => e.stopPropagation()}>
            {/* EDIT MODAL TRIGGER */}
            <FriendModal
              data={friend}
              onSubmit={(updatedData) =>
                updateFriend({ ...updatedData, id: friend.id })
              }
              trigger={
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <PenBox className="h-6 w-6" />
                </button>
              }
            />

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteFriend(friend.id)}
              className="text-gray-500 hover:text-red-600 transition"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}

      <FriendDetailsModal
        friend={selectedFriend}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default List;
