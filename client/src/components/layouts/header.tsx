import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { UserAccount } from "../auth";
import { SearchModal, ThemeToggle } from "../header";
import { Dialog } from "../ui/dialog";
import { AddNoteModal } from "../notes";

export const Header: React.FC = () => {
  const [searchCommandOpen, setSearchCommandOpen] = useState<boolean>(false);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <React.Fragment>
      {searchCommandOpen && <SearchModal open={searchCommandOpen} onOpenChange={setSearchCommandOpen} />}
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-wrapper">
          <div className="container h-auto lg:h-14 grid gap-4 items-center lg:gap-0 py-4 lg:py-0 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
            <Link to="/" className="flex uppercase items-center mr-4 gap-2 lg:mr-6">
              {/* <img src="/app-icon.png" alt="" className="size-8 md:size-9 object-contain" /> */}
              <h1 className="text-lg tracking-wider font-extrabold">Notes</h1>
            </Link>
            <Button
              variant="outline"
              onClick={() => setSearchCommandOpen(true)}
              className="relative h-10 w-full mx-auto text-start flex items-center justify-start max-w-96"
            >
              <span className="flex-1 hidden sm:inline-block text-muted-foreground">Search notes...</span>
              <span className="flex-1 sm:hidden inline-block text-muted-foreground">Search...</span>
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setAddDialogOpen(true)} className="p-0 px-0 py-0 h-auto mr-2">
                + Create Note
              </Button>
              <ThemeToggle />
              <UserAccount />
            </div>
          </div>
        </div>
      </header>
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <AddNoteModal type="add" setDialogOpen={setAddDialogOpen} />
      </Dialog>
    </React.Fragment>
  );
};
