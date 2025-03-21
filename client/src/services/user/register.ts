import { UserRegisterPayload, UserRegisterReturn } from "@/types";
import { httpClient, httpRoutes } from "../http";

export const registerUser = (payload: UserRegisterPayload) => {
  return httpClient
    .setRequestParams({
      requestMethod: "post",
      requestURL: httpRoutes.user.register,
    })
    .request<UserRegisterReturn, UserRegisterPayload>(payload);
};
