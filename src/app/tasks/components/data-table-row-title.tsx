import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { taskSchema } from "../data/schema";
import { useTask } from "@/context/task-context";
import { AddTaskModal } from "./add-task-modal";

export function DataTableRowTitle({ row }: any) {
  const task = taskSchema.parse(row.original);
  const { deleteTask, duplicateTask, updateTask } = useTask();
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleCopy = () => {
    duplicateTask(task);
  };

  const handleDropdownToggle = (open: boolean) => {
    if (open) {
      setEditOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={handleDropdownToggle}>
        <DropdownMenuTrigger asChild>
          <span
            onClick={() => handleDropdownToggle(true)}
            className="truncate max-w-[200px] md:max-w-[300px] border-2 border font-medium overflow-hidden whitespace-nowrap cursor-pointer p-2 rounded-lg hover:bg-accent hover:text-accent-foreground"
            style={{ textOverflow: "ellipsis" }}
          >
            {row.getValue("title")}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Pin</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={task}
        onSubmit={(data) => {
          updateTask(task.id, data);
          setEditOpen(false);
        }}
      />
    </>
  );
}
