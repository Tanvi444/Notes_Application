import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  children: React.ReactNode;
  type: "login" | "register";
};

export const AuthLayout: React.FC<Readonly<AuthLayoutProps>> = ({ children, type }) => {
  return (
    <main className="relative min-h-dvh flex items-center justify-center px-4 py-8">
      <Link to="/" className="group absolute left-5 top-5 flex items-center gap-2">
        <span className="flex items-center justify-center rounded-md bg-primary p-[0.4rem] text-white shadow transition-colors group-hover:bg-primary/90 group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-ring">
          <ChevronLeft className="h-4 w-4" />
        </span>
        <span>Home</span>
      </Link>
      <div className="mx-auto grid w-full max-w-[420px] gap-6 border px-8 py-6 rounded-xl shadow">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">{type === "login" ? "Login" : "Register"}</h1>
          <p className="text-balance text-muted-foreground">
            {type === "login"
              ? "Enter your credentials to login to your account"
              : "Enter your information to create an account"}
          </p>
        </div>
        {children}
        <div className="text-center text-sm">
          {type === "login" ? "Don't have an account" : "Already have an account"}?{" "}
          {type === "login" ? (
            <Link to="/register" className="underline">
              Sign up
            </Link>
          ) : (
            <Link to="/login" className="underline">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
