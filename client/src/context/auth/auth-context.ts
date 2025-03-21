import React, { createContext, useContext } from "react";

export type AuthProviderStates = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialStates = {
  accessToken: null,
  setAccessToken: () => null,
  isLoading: true,
  setIsLoading: () => true,
} as const satisfies AuthProviderStates;

export const AuthContext = createContext<Readonly<AuthProviderStates>>(initialStates);
export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthProvider must be used within an AuthProvider.");
  return context;
};
