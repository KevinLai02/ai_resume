import React, { useEffect } from "react";
import RootStore from "@/store";
// import { SessionProvider } from 'next-auth/react';
import "@/globals.css";
import { NextUIProvider } from "@nextui-org/react";

const MyApp = (props: any) => {
  const { Component, pageProps } = props;
  useEffect(() => {}, []);

  return (
    <NextUIProvider>
      <RootStore>
        {/* <SessionProvider session={session} basePath="/api/auth"> */}
        <Component {...pageProps} />
        {/* </SessionProvider> */}
      </RootStore>
    </NextUIProvider>
  );
};
export default MyApp;
