import Head from "next/head";
import "../styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "../src/app/context/provider";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Head>
        <title>Welll Clinics</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <Provider>
            <Component {...pageProps} />
        </Provider>
    </>
  );
}

export default MyApp;
