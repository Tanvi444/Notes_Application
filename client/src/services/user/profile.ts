import { UserProfileReturn } from "@/types";
import { httpClient, httpRoutes } from "../http";

export const getUserProfile = () => {
  return httpClient
    .setRequestParams({
      requestMethod: "get",
      requestURL: httpRoutes.user.profile,
    })
    .withAuth()
    .request<UserProfileReturn>();
};
