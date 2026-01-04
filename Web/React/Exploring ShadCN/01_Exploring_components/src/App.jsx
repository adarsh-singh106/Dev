import React, { useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/LandingPage";
import supabase from "@/db/supabase";
import { useQueryClient } from "@tanstack/react-query"; // Import hook

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. Access the QueryClient we created in main.jsx
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for Auth Changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      // PROFESSIONAL STANDARD:
      // If user logs out ('SIGNED_OUT'), clear the TanStack Query Cache.
      // This prevents the next user from briefly seeing the previous user's data.
      if (event === "SIGNED_OUT") {
        queryClient.clear(); 
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">Initializing...</div>;
  }

  // If session exists, render Dashboard. Else, Landing Page.
  return (
    <div className="h-screen w-full bg-background text-foreground">
      {/* UPDATE: Pass the 'session' prop down to Dashboard */}
      {session ? <Dashboard session={session} /> : <LandingPage />}
    </div>
  );
};

export default App;