import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const FriendDetailsModal = ({
  friend,
  open,
  onOpenChange,
  onToggleFavorite,
}) => {
  if (!friend) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Friend Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Avatar and Info */}
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${friend.name}`}
            />
            <AvatarFallback>{friend.name[0]}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-2xl font-bold">{friend.name}</h2>
            {friend.nickname && (
              <p className="text-gray-500 text-sm">"{friend.nickname}"</p>
            )}
            <p className="text-blue-600 font-medium mt-1">{friend.status}</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-2 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-xs text-gray-500 uppercase font-bold">
                Email
              </span>
              <p className="text-sm">{friend.email}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase font-bold">
                Mobile
              </span>
              <p className="text-sm">{friend.mobile}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase font-bold">
                Birthday
              </span>
              <p className="text-sm">{friend.birthday}</p>
            </div>
          </div>

          {/* Favorite Toggle */}
          <Button
            variant="outline"
            className={`gap-2 w-full ${friend.is_favorite ? "border-yellow-500 text-yellow-600 bg-yellow-50" : ""}`}
            onClick={() => onToggleFavorite(friend)}
          >
            <Star
              className={`h-5 w-5 ${friend.is_favorite ? "fill-yellow-500" : ""}`}
            />
            {friend.is_favorite ? "Remove from Favorites" : "Mark as Favorite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FriendDetailsModal;
