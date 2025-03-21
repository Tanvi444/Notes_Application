import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@/types";
import { Hash, Pin, PinOff } from "lucide-react";
import { formatDate } from "@/utils";
import { ActionDropdown } from "./action-dropdown";

export const NoteCard: React.FC<Readonly<Note>> = (props) => {
  return (
    <Card key={props._id}>
      <CardHeader className="flex items-start w-full">
        <div className="flex flex-1 flex-col">
          <CardTitle className="flex items-center">
            <h2 className="text-xl flex-1">{props.title}</h2>
            <div className="flex gap-2">
              <button>
                {props.isPinned && <PinOff className="size-[15px]" />}
                {!props.isPinned && <Pin className="size-[15px]" />}
              </button>
              <ActionDropdown note={props} />
            </div>
          </CardTitle>
          <CardDescription className="mt-1">
            <p className="text-sm text-muted-foreground">Last updated at: {formatDate(props.updatedOn)}</p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm">{props.description}</p>
      </CardContent>
      {props.tags.length > 0 && (
        <CardFooter className="flex items-center flex-wrap gap-1">
          {props.tags.map((tag) => (
            <span
              key={crypto.randomUUID()}
              className="flex items-center bg-primary text-primary-foreground tracking-wider text-xs py-0.5 px-1 rounded-sm"
            >
              <Hash className="size-3" />
              {tag}
            </span>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
