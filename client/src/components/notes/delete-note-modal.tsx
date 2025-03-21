import React from "react";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

type DeleteActionModalProps = {
  noteId: string;
  noteTitle: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteActionModal: React.FC<Readonly<DeleteActionModalProps>> = ({ noteId, noteTitle, setDialogOpen }) => {
  const handleDelete = () => {
    console.log({ noteId });
    setDialogOpen(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Note?</DialogTitle>
        <DialogDescription>
          <strong>"{noteTitle}"</strong> will be deleted permanently. Are you sure you want to delete this note?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-8 grid sm:flex sm:flex-row sm:justify-end gap-3">
        <DialogClose asChild>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
