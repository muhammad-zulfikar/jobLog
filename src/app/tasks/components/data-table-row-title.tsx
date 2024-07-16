import { useState, useEffect, useRef } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { taskSchema } from "../data/schema";
import { useTask } from "@/context/task-context";
import { AddTaskModal } from "./add-task-modal";
import { AlertModal } from "@/components/ui/alert-modal";

export function DataTableRowTitle({ row }: any) {
  const [open, setOpen] = useState(false);
  const task = taskSchema.parse(row.original);
  const { deleteTask, duplicateTask, updateTask } = useTask();
  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setEditOpen(true);
    setOpen(false);
  };

  const handleDelete = () => {
    setAlertOpen(true);
    setOpen(false);
  };

  const confirmDelete = () => {
    setLoading(true);
    deleteTask(task.id);
    setLoading(false);
    setAlertOpen(false);
  };

  const handleCopy = () => {
    duplicateTask(task);
    setOpen(false);
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setEditOpen(false);
    }
  };

  return (
    <div ref={dropdownRef}>
      <DropdownMenu onOpenChange={handleDropdownToggle} open={open}>
        <DropdownMenuTrigger
          asChild
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className="truncate max-w-[200px] md:max-w-[300px] border-2 border font-medium overflow-hidden whitespace-nowrap cursor-pointer items-center align-middle py-1 px-1.5 md:py-2 md:px-3 mx-[-12px] rounded-lg hover:bg-accent hover:text-accent-foreground"
            style={{ textOverflow: "ellipsis" }}
          >
            {row.getValue("title")}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">Delete</DropdownMenuItem>
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
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={confirmDelete}
        loading={loading}
      />
    </div>
  );
}