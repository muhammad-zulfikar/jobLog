import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statuses } from "../data/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Type role title (ex: SEO update) ",
  }),
  company: z.string().min(2, {
    message: "Write task company (ex: ABC Corp) ",
  }),
  status: z.string().min(2, {
    message: "Task Status (ex: todo)",
  }),
});

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: z.infer<typeof FormSchema>;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, initialData, onSubmit }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      company: "",
      status: "",
    },
  });

  useEffect(() => {
    if (initialData && open) {
      form.reset(initialData);
    } else if (!initialData && open) {
      form.reset({
        title: "",
        company: "",
        status: "",
      });
    }
  }, [initialData, open, form]);

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>{initialData ? "Edit Applicant" : "Add Applicant"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status: any, index: number) => (
                        <SelectItem key={index} value={status.value} className="cursor-pointer">
                          <div className="flex justify-center items-center gap-3">
                            <status.icon /> {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="sm" variant="default" className="h-8 text-xs md:mt-4">Save</Button>
              <Button type="button" size="sm" variant="ghost" onClick={onClose} className="h-8 text-xs md:mt-4 md:mb-0 mb-2">Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
