import React, { useState } from "react";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { Note } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog } from "../ui/dialog";
import { DeleteActionModal } from "./delete-note-modal";
import { AddNoteModal } from "./add-note-modal";

type ActionDropdownProps = {
  note: Note;
};

export const ActionDropdown: React.FC<Readonly<ActionDropdownProps>> = ({ note }) => {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      {editDialogOpen && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <AddNoteModal type="edit" setDialogOpen={setEditDialogOpen} note={note} />
        </Dialog>
      )}
      {deleteDialogOpen && (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DeleteActionModal setDialogOpen={setDeleteDialogOpen} noteId={note._id} noteTitle={note.title} />
        </Dialog>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <EllipsisVertical className="size-[15px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>More Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <button className="flex items-center gap-3 w-full" onClick={() => setEditDialogOpen(true)}>
                <PencilLine className="size-4 text-foreground font-semibold" />
                Edit Note
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="flex items-center gap-3 w-full" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 className="size-4 text-foreground font-semibold" />
                Delete Note
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
};
