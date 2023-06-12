import React from "react";
import Nav from "@components/Nav";

import "@styles/globals.css";
import Provider, { SessionType } from "@components/Provider";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "A Creative Kind",
  description: "Where the creative thoughts pile up",
};

const RootLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
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
