// SideBar.js

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidLocationPlus, BiLink } from "react-icons/bi";
import { HiVideoCamera } from "react-icons/hi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import Head from "next/head";
import '../../../styles/Settings.module.css'
const SideBar = () => {
  return (
    <header id="header">
      <Head>
        {/* <link href="/settings/assets/css/style.css" rel="stylesheet" /> */}
      </Head>
      <div className="newClass">
        <nav id="navbar" className="nav-menu">
          <ul>
            <li>
              <a href="#hero" className="nav-links scrollto active">
                <FaUserCircle className="icons" />
                <span>GENERAL</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-links scrollto">
                <HiVideoCamera className="icons" /> <span>AVAILABILITY</span>
              </a>
            </li>
            <li>
              <a href="#resume" className="nav-links scrollto">
                <BiSolidLocationPlus className="icons" /> <span>LOCATIONS</span>
              </a>
            </li>
            <li>
              <a href="#portfolio" className="nav-links scrollto">
                <BiLink className="icons" /> <span>INTEGRATIONS</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nav-links scrollto">
                <BsFillCalendarCheckFill className="icons" />
                <span>SERVICES</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-links scrollto">
                <MdPayments className="icons" />
                <span>PAYMENTS</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SideBar;
