import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddTaskModal } from "./add-task-modal";
import { useTask } from "@/context/task-context";
import { PlusIcon } from "@radix-ui/react-icons";

export function AddTask() {
  const [open, setOpen] = useState(false);
  const { addTask } = useTask();

  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="default"
          size="sm"
          className="h-8"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addTask}
      />
    </>
  );
}
