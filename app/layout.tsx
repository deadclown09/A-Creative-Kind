import React from "react";
import Nav from "@components/Nav";

import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "A Creative Kind",
  description: "Where the creative thoughts pile up",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
