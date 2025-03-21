import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CreateNoteSchema } from "@/lib/zod";
import { Note } from "@/types";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type AddNoteModalProps = {
  type: "add";
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditNoteModalProps = {
  type: "edit";
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note;
};

export const AddNoteModal: React.FC<Readonly<AddNoteModalProps | EditNoteModalProps>> = (props) => {
  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: props.type === "add" ? "" : props.note.title,
      description: props.type === "add" ? "" : props.note.description,
      tags: props.type === "add" ? [] : props.note.tags,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateNoteSchema>) => {
    console.log({ values });

    form.clearErrors();
    form.reset();
    props.setDialogOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{props.type === "add" ? "Add New Note" : "Edit Note"}</DialogTitle>
        <DialogDescription>
          {props.type === "add" ? "Add a new note to your dashboard." : "Update the note."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Note Title</FormLabel>
                <FormControl>
                  <Input id="title" type="text" placeholder="Practice Mindful Meditation" {...field} />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Note Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
                    {...field}
                  />
                </FormControl>
                <div className="h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">{props.type === "add" ? "Add" : "Update"} Note</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
