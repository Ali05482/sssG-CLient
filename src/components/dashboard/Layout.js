import React from "react";
import SideBar from "./SideBar";
import Head from "next/head";
import '../../../styles/Settings.module.css'
const Layout = ({ children }) => {
  return (
    <div className="container d-flex">
      <Head>
        {/* <link href="/settings/assets/css/style.css" rel="stylesheet" /> */}
      </Head>
      <SideBar />
      <div className="content">{children}</div>

      <style>{`
        .content {
          flex: 1;
          height: 89vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Layout;
