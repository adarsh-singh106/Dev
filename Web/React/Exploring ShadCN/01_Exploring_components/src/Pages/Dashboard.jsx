import React, { useState } from "react";
import InputPage from "@/components/InputPage";
import TablePage from "@/components/TablePage";
import { Button } from "@/components/ui/button";
import supabase from "@/db/supabase"; 
import { LogOut, Sun, Moon } from "lucide-react"; // Install lucide-react

const Dashboard = ({ session }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.jsx listener will handle the redirect and cache clearing
  };

  return (
    <div className="min-h-screen md:h-screen w-full p-4 flex flex-col bg-background text-foreground">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        
        <div className="flex items-center gap-2">
           {/* Logout Button */}
           <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
             Logout <LogOut className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-4 flex-1 md:overflow-hidden">
        
        {/* Left: Input Form */}
        <div className="flex-1 w-full border rounded-lg bg-card text-card-foreground md:overflow-y-auto shadow-sm">
          <InputPage 
            taskToEdit={editingTask} 
            setEditingTask={setEditingTask} 
            session={session}
          />
        </div>

        {/* Right: Data Table */}
        <div className="flex-1 w-full border rounded-lg bg-card text-card-foreground md:overflow-y-auto shadow-sm">
          <TablePage 
            onEdit={setEditingTask} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;