import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";
import General from "../dashboard/General";
import AVAILABILITY from "../dashboard/AVAILABILITY";
import Locations from "../dashboard/Locations";
import Integrations from "../dashboard/Integrations";
import Services from "../dashboard/Services";
import Payment from "../dashboard/Payment";

const MainSetting = () => {
  return (
    <>
      <Head>
        <link href="/settings/assets/css/style.css" rel="stylesheet" />
      </Head>

      <Container>
        <General />
      </Container>

      <Container>
        <AVAILABILITY />
      </Container>

      <Container>
        <Locations />
      </Container>

      <Container>
        <Integrations />
      </Container>

      <Container>
        <Services />
      </Container>

      <Container>
        <Payment />
      </Container>
    </>
  );
};

export default MainSetting;
