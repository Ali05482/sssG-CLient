import Head from "next/head";
import { Col, Row } from "reactstrap";
import SalesChart from "../src/components/dashboard/SalesChart";
import Feeds from "../src/components/dashboard/Feeds";

import MainContext from "../src/app/context/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import FullLayout from "../src/layouts/FullLayout";



export default function Home() {
  const router = useRouter()
  const global = useContext(MainContext);
  useEffect(() => {
    if (!(global.authenticate)) {
      router.push('/auth/login')
    }
  }, [])


  return (
    <FullLayout>
      <div>
        <Head>
          <title>Fitwell Hub PK</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="icon" href="/headIcon.png" />
        </Head>
      </div>
    </FullLayout>
  );
}
