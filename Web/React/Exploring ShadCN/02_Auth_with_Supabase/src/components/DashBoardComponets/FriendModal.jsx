// components/FriendModal.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Needed for Select

// Imports from our new split files
import { friendSchema } from "@/lib/schemas";
import { CustomInput } from "@/components/DashBoardComponets/CustomForm";

export function FriendModal({ trigger, data, onSubmit }) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!data;

  const form = useForm({
    resolver: zodResolver(friendSchema),
    defaultValues: data || {
      name: "",
      email: "",
      birthday: "",
      status: "Single",
      mobile: "",
      nickname: "",
    },
  });

  // Reset logic when modal opens/closes
  useEffect(() => {
    if (open)
      form.reset(
        data || {
          name: "",
          email: "",
          birthday: "",
          status: "Single",
          mobile: "",
          nickname: "",
        }
      );
  }, [data, open, form]);

  const onFormSubmit = (values) => {
    // Logic: Default nickname to name if empty
    const finalData = { ...values, nickname: values.nickname || values.name };
    onSubmit(finalData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Friend" : "Add New Friend"}
          </DialogTitle>
          {/* 2. Add this Description Block */}
          <DialogDescription>
            {isEditMode
              ? "Make changes to your friend's details here. Click save when you're done."
              : "Fill in the details below to add a new friend to your list."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            {/* Row 1 */}
            <div className="flex gap-4">
              <CustomInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
              />
              <CustomInput
                control={form.control}
                name="nickname"
                label="Nickname"
                placeholder="Ash"
              />
            </div>

            {/* Row 2 */}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Ash@example.com"
            />

            {/* Row 3 */}
            <div className="flex gap-4">
              <CustomInput
                control={form.control}
                name="mobile"
                label="Mobile"
                placeholder="+91..."
              />
              <CustomInput
                control={form.control}
                name="birthday"
                label="Birthday"
                type="date"
              />
            </div>

            {/* Dropdown (Harder to abstract, so we keep it here or make a CustomSelect similar to CustomInput) */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="In a Relationship">
                        In a Relationship
                      </SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
