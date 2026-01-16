import React from 'react';
import { Users } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Import Shadcn Button

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
        <Users className="h-6 w-6" />
        <span>Mittr.</span>
      </div>
      {/* used 'asChild' if using a Link, or just standard onClick */}
      <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
        Get Started
      </Button>
    </nav>
  );
};

export default Navbar;