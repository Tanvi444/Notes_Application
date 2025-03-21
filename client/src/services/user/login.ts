import { UserLoginPayload, UserLoginReturn } from "@/types";
import { httpClient, httpRoutes } from "../http";

export const loginUser = (payload: UserLoginPayload) => {
  return httpClient
    .setRequestParams({
      requestMethod: "post",
      requestURL: httpRoutes.user.login,
    })
    .request<UserLoginReturn, UserLoginPayload>(payload);
};

export const logoutUser = () => {
  localStorage.removeItem("@notes-app/auth-token");
  return true;
};
