// components/TablePage.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import supabase from "@/db/supabase";
// IMPORTS: TanStack Query tools
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TablePage = ({ onEdit }) => {
  const queryClient = useQueryClient();

  // 1. READ OPERATION (Fetch Data)
  // useQuery automatically handles caching and loading states
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"], // Unique ID for this data
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false }); // Sort by newest first
      
      if (error) throw new Error(error.message);
      return data;
    },
  });

  // 2. DELETE OPERATION
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    // When delete is successful, refresh the list automatically
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Optional: alert("Task deleted!");
    },
  });

  if (isLoading) return <div className="p-4 text-center">Loading tasks...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, i) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              {/* Handle potential typo in DB column name */}
              <TableCell>{task.description || task.discriptionn}</TableCell>
              
              <TableCell className="text-right flex justify-end gap-2">
                {/* EDIT BUTTON: Sends this task object UP to Dashboard */}
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onEdit(task)}
                >
                  Edit
                </Button>

                {/* DELETE BUTTON: Triggers the mutation */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if(confirm("Are you sure?")) deleteMutation.mutate(task.id);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePage;