import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/Auth/AuthModal";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
        <Users className="h-6 w-6" />
        <span>Mittr.</span>
      </div>

      {user ? (
        <Link to="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
            Dashboard
          </Button>
        </Link>
      ) : (
        <AuthModal
          trigger={
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
              Get Started
            </Button>
          }
        />
      )}
    </nav>
  );
};

export default Navbar;
