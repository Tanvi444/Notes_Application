import React from "react";

import { Footer } from "./footer";
import { Header } from "./header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<Readonly<AppLayoutProps>> = ({ children }) => {
  return (
    <div>
      <div className="relative flex min-h-svh flex-col bg-background">
        <div data-wrapper className="border-grid flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1 flex-col">
            <div className="container-wrapper flex-1 flex flex-col">
              <div className="container flex-1 flex flex-col items-center py-6 lg:py-8">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
