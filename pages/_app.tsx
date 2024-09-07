import React from "react";
// import { SessionProvider } from 'next-auth/react';
import "@/globals.css";
import { NextUIProvider } from "@nextui-org/react";

const MyApp = (props: any) => {
  const { Component, pageProps } = props;

  return (
    <NextUIProvider>
      {/* <SessionProvider session={session} basePath="/api/auth"> */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </NextUIProvider>
  );
};
export default MyApp;
