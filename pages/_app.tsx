import React, { useEffect } from "react";
import RootStore from "@/store";
// import { SessionProvider } from 'next-auth/react';
import "@/globals.css";

const MyApp = (props: any) => {
  const { Component, pageProps } = props;
  useEffect(() => {}, []);

  return (
    <RootStore>
      {/* <SessionProvider session={session} basePath="/api/auth"> */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </RootStore>
  );
};
export default MyApp;
