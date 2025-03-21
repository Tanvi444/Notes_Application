import { GetAllNotesReturn } from "@/types";
import { httpClient, httpRoutes } from "../http";

export const getUserNotes = () => {
  return httpClient
    .setRequestParams({
      requestMethod: "get",
      requestURL: httpRoutes.notes.get,
    })
    .withAuth()
    .request<GetAllNotesReturn>();
};
