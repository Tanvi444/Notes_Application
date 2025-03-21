import { AxiosError } from "axios";

export const parseGeneticError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string" || typeof error === "number" || typeof error === "boolean") return String(error);
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    (typeof error.message === "string" || typeof error.message === "number" || typeof error.message === "boolean")
  )
    return String(error.message);

  return "Something went wrong!";
};

export const parseHttpError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      return {
        statusCode: null,
        message: "Network Error: Please check your connection and try again.",
      };
    }

    const statusCode = error.response?.status ?? null;
    const message = (error.response?.data?.message as string) || "Something went wrong!";

    return { statusCode, message };
  } else {
    const message = parseGeneticError(error);

    return {
      statusCode: null,
      message,
    };
  }
};
