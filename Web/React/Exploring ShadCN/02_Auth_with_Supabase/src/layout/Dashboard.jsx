import DashPage from "@/components/DashBoardComponets/DashPage";
import EmptyList from "@/components/DashBoardComponets/EmptyList";
import Header from "@/components/DashBoardComponets/Header";
import Search_Add from "@/components/DashBoardComponets/Search_Add";
import React, { useState } from "react";

const Dashboard = () => {
  // 1. State: Stores list of friends
  const [friends, setFriends] = useState([]);

  // 2. Create Function
  const handleAddFriend = (newFriend) => {
    const friendWithId = { ...newFriend, id: Date.now() };
    
    // FIX 1: Wrap in brackets [] to keep it an Array!
    setFriends([...friends, friendWithId]); 
  };

  // 3. Edit Function
  const handleUpdateFriend = (updateFriend) => {
    setFriends(
      friends.map((currFriend) =>
        // FIX 2: Use === for comparison, not =
        currFriend.id === updateFriend.id
          ? { ...currFriend, ...updateFriend }
          : currFriend
      )
    );
  };

  // 4. Delete Function
  const handleDeleteFriend = (id) => {
    setFriends(friends.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      {/* Pass the "Add" function to the Search bar */}
             <Search_Add onAddFriend={handleAddFriend} />
      {/* FIX 3: Correct spelling is .length (lowercase) */}
      {friends.length === 0 ? (
        <EmptyList /> // Removed undefined 'no_of_data' variable
      ) : (
        <DashPage
          friendsList={friends}
          onAdd={handleAddFriend}
          onEdit={handleUpdateFriend}
          onDelete={handleDeleteFriend}
        />
      )}
    </div>
  );
};

export default Dashboard;