// components/InputPage.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import supabase from "@/db/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InputPage = ({ taskToEdit, setEditingTask,session }) => {
  const queryClient = useQueryClient();
  
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // 1. EFFECT: Populate form when 'Edit' is clicked in the Table
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description || taskToEdit.discriptionn || "",
      });
    } else {
      // If we cancel edit or finish, reset form
      setTask({ title: "", description: "" });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 2. CREATE / UPDATE MUTATION
  const mutation = useMutation({
    mutationFn: async (newTaskData) => {
      // LOGIC: If we have an ID (taskToEdit), UPDATE. Else INSERT.
      if (taskToEdit) {
        // UPDATE OPERATION
        const { error } = await supabase
          .from("tasks")
          .update(newTaskData)
          .eq("id", taskToEdit.id);
        if (error) throw error;
      } else {
        // CREATE OPERATION
        const { error } = await supabase
          .from("tasks")
          .insert(newTaskData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      // Refresh the table automatically
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      
      // Clear Form & Exit Edit Mode
      setTask({ title: "", description: "" });
      setEditingTask(null); 
    },
    onError: (error) => {
      alert("Error: " + error.message);
    }
  });

  const onSubmitHandler = () => {
    if (!task.title || !task.description) return alert("Fill all fields");
    
    // Trigger the mutation
    mutation.mutate({ 
        title: task.title, 
        description: task.description 
    });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setTask({ title: "", description: "" });
  };

  return (
    <div className="h-auto md:h-full w-full p-2">
      <Card className="h-full flex flex-col gap-2">
        <CardHeader>
          <CardTitle>{taskToEdit ? "Update Task" : "Add New Task"}</CardTitle>
        </CardHeader>

        <CardContent className="pb-0">
          <label className="text-sm font-medium mb-2 block">Title</label>
          <Input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Buy Groceries"
          />
        </CardContent>

        <CardContent className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="flex-1 resize-none"
            placeholder="Details..."
          />
        </CardContent>

        <CardFooter className="gap-2 flex items-center">
          {/* CANCEL BUTTON: Only shows when editing */}
          {taskToEdit && (
            <Button variant="outline" className=" flex-1" onClick={handleCancel}>
              Cancel
            </Button>
          )}

          <Button 
            onClick={onSubmitHandler} 
            className=" flex-1"
            disabled={mutation.isPending}
          >
            {mutation.isPending 
               ? "Saving..." 
               : (taskToEdit ? "Update Task" : "Add Task")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InputPage;