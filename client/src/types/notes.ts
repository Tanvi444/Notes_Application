export type GetAllNotesReturn = {
  notes: Array<Note>;
};

export type Note = {
  _id: string;
  user: string;
  title: string;
  description: string;
  tags: Array<string>;
  isPinned: boolean;
  updatedOn: string;
};
