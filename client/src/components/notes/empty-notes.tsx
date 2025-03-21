import React from "react";
import { Button } from "../ui/button";

export const EmptyNotes: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-auto mx-auto max-w-[480px]">
      <img src="/notebook.png" alt="empty_notes" className="w-48" />
      <p className="text-center text-balance mt-4 mb-6">
        Start creating your first not. Click the button below to note down your thoughts, ideas, and reminders.
        Let&apos;s get started.
      </p>
      <Button>+ Add Note</Button>
    </div>
  );
};
