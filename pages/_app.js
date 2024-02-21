import Head from "next/head";
import "../styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "../src/app/context/provider";
import React, { useEffect } from "react";
import { jwt } from "jsonwebtoken";
import _ from 'lodash'
function MyApp({ Component, pageProps }) {
  const ROUTES = {
    supperAdmin: [],
    admin: [],
    schedulingTeam: ['scheduling'],
    attendant: ['patient', 'profile'],
    doctor: ['virtualcare', 'referrals', 'notes', 'availability', 'profile'],
    patient: ['virtualcare', 'notes']
  }
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    // middleware()
  }, []);
  const checkRole = (url, role) => {
    if (role === "admin" || role === "superAdmin") {
      return true;
    } else if (role === "compodar") {
      if (ROUTES?.attendant?.includes(url)) {
        return true;
      } else {
        return false;
      }
    } else if (role === "doctor") {
      if (ROUTES?.doctor?.includes(url)) {
        return true;
      } else {
        return false;
      }
    } else if (role === "schedulingTeam") {
      if (ROUTES?.schedulingTeam?.includes(url)) {
        return true;
      } else {
        return false;
      }
    } else if (role === "patient") {
      if (ROUTES?.patient?.includes(url)) {
        return true;
      } else {
        return false;
      }
    }
  }
  const middleware = () => {
    const token = localStorage?.getItem("authToken")
    const secret = 'weightLoser@3rdEyeSof!@123!';
    const user = jwt?.verify(token, secret);
    const url = new URL(window.location.href);
    const regexUrl = /\b404\b/;
    const regex = /\/[^/]+\/([^/]+)/;
    const match = url?.pathname.match(regex);

    alert(match)
    if (match != null) {
      if(match[1]!=="login"){
        if (!regexUrl?.test(url)) {
          const access = checkRole(match[1], user?.role);
          if (!access) {
            window.location.href = '404'
          }
        }
      }
    }


  }
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
