import React from "react";
import { EmptyNotes, NoteCard } from "@/components/notes";
import { useUserNotes } from "@/hooks";

export const Home: React.FC = () => {
  const { data: notes, isLoading } = useUserNotes();
  if (isLoading || !notes) {
    return "Loading...";
  }

  if (notes.length === 0) return <EmptyNotes />;

  return (
    <div className="grid grid-cols-3 gap-5">
      {notes.map((note) => (
        <NoteCard key={note._id} {...note} />
      ))}
    </div>
  );
};
