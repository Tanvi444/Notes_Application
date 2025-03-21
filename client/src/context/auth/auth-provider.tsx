import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, AuthProviderStates, initialStates } from "./auth-context";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Readonly<AuthProviderProps>> = ({ children, ...props }) => {
  const [accessToken, setAccessToken] = useState<AuthProviderStates["accessToken"]>(initialStates.accessToken);
  const [isLoading, setIsLoading] = useState<AuthProviderStates["isLoading"]>(initialStates.isLoading);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("@notes-app/auth-token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (accessToken) {
      localStorage.setItem("@notes-app/auth-token", accessToken);
    }

    if (pathname === "/" && !accessToken) {
      navigate("/login");
    } else if (pathname !== "/" && accessToken) {
      navigate("/");
    }

    setIsLoading(false);
  }, [accessToken, navigate, pathname]);

  const providerStates = useMemo(
    () =>
      ({
        accessToken,
        setAccessToken,
        isLoading,
        setIsLoading,
      } as const satisfies AuthProviderStates),
    [accessToken, isLoading]
  );

  return (
    <AuthContext.Provider {...props} value={providerStates}>
      {isLoading && <p>Authenticating Route...</p>}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
