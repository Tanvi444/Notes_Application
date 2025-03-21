import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-grid border-t md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-2 md:py-4">
          <div className="text-balance text-center text-sm leading-7 text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Tanvi444"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tanvi Tomar
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/Tanvi444/Notes_Application"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            {""}.
          </div>
        </div>
      </div>
    </footer>
  );
};
