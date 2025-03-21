import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "@/types";
import { EllipsisVertical, Hash, Pin, PinOff } from "lucide-react";
import { formatDate } from "@/utils";

export const NoteCard: React.FC<Readonly<Note>> = ({ _id, title, description, tags, isPinned, updatedOn }) => {
  return (
    <Card key={_id}>
      <CardHeader className="flex items-start w-full">
        <div className="flex flex-1 flex-col">
          <CardTitle className="flex items-center">
            <h2 className="text-xl flex-1">{title}</h2>
            <div className="flex gap-2">
              <button className="">
                {isPinned && <PinOff className="size-[15px]" />}
                {!isPinned && <Pin className="size-[15px]" />}
              </button>
              <button className="">
                <EllipsisVertical className="size-[15px]" />
              </button>
            </div>
          </CardTitle>
          <CardDescription className="mt-1">
            <p className="text-sm text-muted-foreground">Last updated at: {formatDate(updatedOn)}</p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm">{description}</p>
      </CardContent>
      {tags.length > 0 && (
        <CardFooter className="flex items-center flex-wrap gap-1">
          {tags.map((tag) => (
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
