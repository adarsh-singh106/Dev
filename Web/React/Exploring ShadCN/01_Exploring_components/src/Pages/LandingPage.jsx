import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <div className="max-w-3xl space-y-6 animate-in fade-in zoom-in duration-500">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Project <span className="text-primary">Zenith</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          The minimalist task intelligence dashboard for high-performance students.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Button size="lg" onClick={() => setShowAuth(true)}>
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Documentation
          </Button>
        </div>
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default LandingPage;