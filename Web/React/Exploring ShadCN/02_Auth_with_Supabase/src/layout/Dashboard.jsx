import DashPage from "@/components/DashBoardComponets/DashPage";
import EmptyList from "@/components/DashBoardComponets/EmptyList";
import Header from "@/components/DashBoardComponets/Header";
import Search_Add from "@/components/DashBoardComponets/Search_Add";
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import useAuth from "@/hooks/useAuth";
import supabase from "@/lib/supabase";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Function
  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFriends(data);
    } catch (error) {
      toast.error("Error fetching friends: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Create Function
  const handleAddFriend = async (newFriend) => {
    console.log("Adding friend for user:", user?.id);
    console.log("New Friend Data:", newFriend);
    try {
      if (!user?.id) {
        throw new Error("User ID is missing. Cannot add friend.");
      }
      const { data, error } = await supabase
        .from("friends")
        .insert([{ ...newFriend, user_id: user.id }])
        .select();

      if (error) throw error;

      // Update state with the new friend from DB (which has the real ID)
      setFriends([data[0], ...friends]); // Prepend to list
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error("Error adding friend: " + error.message);
    }
  };

  // 3. Edit Function
  const handleUpdateFriend = async (updateFriend) => {
    try {
      const { error } = await supabase
        .from("friends")
        .update(updateFriend)
        .eq("id", updateFriend.id);

      if (error) throw error;

      // Optimistic UI Update or just update local state
      setFriends(
        friends.map((currFriend) =>
          currFriend.id === updateFriend.id
            ? { ...currFriend, ...updateFriend }
            : currFriend,
        ),
      );
    } catch (error) {
      toast.error("Error updating friend: " + error.message);
    }
  };

  // 4. Delete Function
  const handleDeleteFriend = async (id) => {
    try {
      const { error } = await supabase.from("friends").delete().eq("id", id);

      if (error) throw error;

      setFriends(friends.filter((f) => f.id !== id));
      toast.success("Friend deleted");
    } catch (error) {
      toast.error("Error deleting friend: " + error.message);
    }
  };

  // State for Search and Favorites
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter Logic
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFav = showFavorites ? friend.is_favorite : true;
    return matchesSearch && matchesFav;
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <Search_Add onAdd={handleAddFriend} onSearch={setSearchTerm} />

      {loading ? (
        <div className="mt-10">Loading friends...</div>
      ) : filteredFriends.length === 0 && !loading ? (
        <div className="mt-10 text-gray-500">
          {friends.length === 0 ? (
            <EmptyList onAdd={handleAddFriend} />
          ) : (
            "No results found."
          )}
        </div>
      ) : (
        <DashPage
          friendsList={filteredFriends}
          onAdd={handleAddFriend}
          onEdit={handleUpdateFriend}
          onDelete={handleDeleteFriend}
        />
      )}
      {/* Toaster is now global in AppRoutes */}
    </div>
  );
};

export default Dashboard;
