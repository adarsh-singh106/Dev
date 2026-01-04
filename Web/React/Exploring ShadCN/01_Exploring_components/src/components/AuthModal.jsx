import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import supabase from "@/db/supabase";

const AuthModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (type) => {
    setLoading(true);
    const { email, password } = formData;
    let result;

    if (type === "signup") {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    setLoading(false);

    if (result.error) {
      // In a real app, use toast({ title: "Error", description: result.error.message })
      alert(result.error.message);
    } else {
      if (type === "signup" && !result.data.session) {
        alert("Check your email for the confirmation link!");
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle>Welcome to Zenith</DialogTitle>
          <DialogDescription>Authentication required to access dashboard.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {["login", "signup"].map((mode) => (
            <TabsContent key={mode} value={mode} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <Button className="w-full" onClick={() => handleAuth(mode)} disabled={loading}>
                {loading ? "Processing..." : mode === "login" ? "Login" : "Create Account"}
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;