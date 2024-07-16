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
import { Modal } from "@/components/ui/modal";
import { DialogFooter } from "@/components/ui/dialog";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "This field is required ",
  }),
  company: z.string().min(2, {
    message: "This field is required ",
  }),
  status: z.string().min(2, {
    message: "This field is required",
  }),
  url: z.string().url().optional().or(z.literal('')),
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
      url: "",
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
        url: "",
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
    <Modal
      title={initialData ? "Edit Applicant" : "Add Applicant"}
      description="Fill out the details below:"
      isOpen={open}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-2 text-sm">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="title">Role*</label>
                <FormControl>
                  <Input {...field} />
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
                <label htmlFor="title">Company*</label>
                <FormControl>
                  <Input {...field} />
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
                <label htmlFor="title">Status</label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent ref={(ref) => { if (!ref) return; ref.ontouchstart = (e) => { e.preventDefault(); }; }}>
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
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="URL">URL</label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button type="button" size="sm" variant="outline" onClick={onClose} className='h-8 text-xs md:text-sm align-middle'>
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="default" className='h-8 text-xs md:text-sm'>
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
}