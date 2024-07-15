import { useTask } from "@/context/task-context";
import { useState } from "react";
import { labels, statuses } from "../data/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DataTableRowStatus({ row }: any) {
  const { updateTask } = useTask();

  const status = statuses.find(
    (status) => status.value === row.getValue("status")
  );

  if (!status) {
    return null;
  }

  const handleStatus = (selectedValue: string) => {
    updateTask(row.original.id, { status: selectedValue });
  };

  return (
    <div className="flex items-center">
      <Select
        value={status.value}
        onValueChange={handleStatus}
        defaultValue={status.value}
      >
        <SelectTrigger asChild>
          <Button variant="ghost" className="truncate flex max-w-[150px] items-center gap-2 rounded-md py-2">
            <status.icon />
            <SelectValue>{status.label}</SelectValue>
          </Button>
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {statuses.map((status: any, index: number) => (
            <SelectItem
              key={index}
              value={status.value}
              className="relative flex w-full select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-secondary cursor-pointer"
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectItemIndicator>
                  <Check className="h-4 w-4" />
                </SelectItemIndicator>
              </span>
              <div className="flex gap-2 items-center">
                <status.icon /> {status.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
