import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import supabase from "@/lib/supabase";
import { toast } from "sonner";

const ProfileModal = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (user && open) {
      fetchProfile();
    }
  }, [user, open]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Try to fetch from 'profiles' table first
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // Ignore "Row not found" error, as we might need to create it
        console.error("Error fetching profile:", error);
      }

      const meta = user.user_metadata || {};

      setFormData({
        full_name: data?.full_name || meta.full_name || "",
        bio: data?.bio || "",
        avatar_url: data?.avatar_url || meta.avatar_url || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        full_name: formData.full_name,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        console.error("Supabase upsert error:", error);
        throw error;
      }

      // Also update auth metadata for consistency
      await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
        },
      });

      toast.success("Profile updated!");
      onOpenChange(false);
    } catch (error) {
      console.error("Full Error Object:", error);
      toast.error(
        `Failed to update profile: ${error.message || error.error_description || "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar_url} />
              <AvatarFallback>{formData.full_name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label
                htmlFor="picture"
                className="text-center text-xs text-muted-foreground"
              >
                Upload Profile Picture
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    setLoading(true);
                    const fileExt = file.name.split(".").pop();
                    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
                    const filePath = `${fileName}`;

                    let { error: uploadError } = await supabase.storage
                      .from("avatars")
                      .upload(filePath, file);

                    if (uploadError) {
                      throw uploadError;
                    }

                    const { data } = supabase.storage
                      .from("avatars")
                      .getPublicUrl(filePath);
                    setFormData((prev) => ({
                      ...prev,
                      avatar_url: data.publicUrl,
                    }));
                    toast.success("Image uploaded!");
                  } catch (error) {
                    console.error("Upload Error:", error);
                    toast.error("Error uploading image: " + error.message);
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_name" className="text-right">
              Name
            </Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
