import React from "react";

type LogoutButtonProps = {
  children: React.ReactNode;
};

export const LogoutButton: React.FC<Readonly<LogoutButtonProps>> = ({ children }) => {
  return <button className="tracking-wide font-medium text-[15px]">{children}</button>;
};
