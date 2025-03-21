import React from "react";
import { Login, Register } from "./pages";
import { Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "./components/layouts";
import { Home } from "./pages/home";

export const NotesApplication: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout type="register">
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout type="login">
            <Login />
          </AuthLayout>
        }
      />
    </Routes>
  );
};
