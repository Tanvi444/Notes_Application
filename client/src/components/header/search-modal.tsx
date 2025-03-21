import React, { useEffect, useState } from "react";
import { Note } from "@/types";
import { useDebounce } from "@/hooks";

import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "../ui/command";

type SearchModalProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchModal: React.FC<Readonly<SearchModalProps>> = ({ open, onOpenChange }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<Note>>([]);

  const debouncedValue = useDebounce<string>(searchValue);

  useEffect(() => {
    if (!debouncedValue) {
      setSearchResults([]);
      return;
    }

    console.log(debouncedValue);
  }, [debouncedValue]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search notes..." onValueChange={(value) => setSearchValue(value)} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {searchResults.length > 0 &&
          searchResults.map((item) => (
            <CommandItem key={item.id} value={item.title}>
              {item.title}
            </CommandItem>
          ))}
      </CommandList>
    </CommandDialog>
  );
};
