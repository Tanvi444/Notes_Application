import { parseHttpError } from "@/utils";
import axios, { AxiosInstance } from "axios";

type HttpClientConfig = {
  baseURL: string;
  //   apiKey: string;
};

type HttpRequestParams = {
  requestURL: string;
  requestMethod: "delete" | "get" | "post" | "put";
};

type HttpResponseWithData<TReturn = unknown> =
  | {
      success: true;
      message: string;
      data: TReturn;
    }
  | {
      success: false;
      message: string;
      errors: Array<unknown> | null;
    };

export class HttpClient {
  private readonly axiosClient: AxiosInstance;
  private useAuthToken: boolean;
  private requestParams: HttpRequestParams | undefined;

  constructor(config: HttpClientConfig) {
    if (!config) throw new Error("Http client config is required when instantiating HttpClient");

    this.axiosClient = axios.create({
      baseURL: config.baseURL,
    });
    this.useAuthToken = false;
    this.requestParams = undefined;
  }

  getConfigs() {
    return { config: this.axiosClient };
  }

  setRequestParams(params: HttpRequestParams) {
    this.requestParams = params;
    this.useAuthToken = false;
    return this;
  }

  withAuth() {
    this.useAuthToken = true;
    return this;
  }

  async request<TReturn, TPayload = unknown>(payload?: TPayload) {
    if (!this.requestParams)
      throw new Error(
        "Request parameters are not set before calling request(). Use setRequestParams() method to set request parameters first."
      );

    try {
      const axiosRequestMethod = this.axiosClient[this.requestParams.requestMethod];
      const requestURL = this.requestParams.requestURL;

      let response;
      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (this.useAuthToken) {
        const authToken = localStorage.getItem("@notes-app/auth-token");
        if (!authToken) throw new Error("Authorization token not found. Please login first to continue.");
        requestHeaders.Authorization = `Bearer ${authToken}`;
      }

      if (this.requestParams.requestMethod === "get")
        response = await axiosRequestMethod<HttpResponseWithData<TReturn>>(requestURL, {
          headers: requestHeaders,
          params: payload ?? {},
        });
      else
        response = await axiosRequestMethod<HttpResponseWithData<TReturn>>(requestURL, payload, {
          headers: requestHeaders,
        });

      const data = response.data;
      if (!data.success) throw new Error(data.message);

      return { success: true, data: data.data };
    } catch (error: unknown) {
      console.error(`Error making http ${this.requestParams.requestMethod} request: `, {
        requestParams: this.requestParams,
        requestPayload: payload,
        error,
      });

      const httpError = parseHttpError(error);
      return { success: false, error: httpError };
    }
  }
}

export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});
