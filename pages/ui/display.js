import React from "react";
import styles from "/styles/layout/Display.module.css";
import { Dropdown } from "react-bootstrap";

import FullLayout from "../../src/layouts/FullLayout";

const Display = () => {
  const bars = [];
  for (let i = 0; i < 6; i++) {
    bars.push(
      <div key={i} className={styles.bars}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <rect
            rx="4.5"
            ry="4.5"
            x="0"
            y="0"
            height="9"
            className="step-next-svg active-step"
            width="40"
            fill="#96C582" // Add the color you want here
          ></rect>
        </svg>{" "}
      </div>
    );
  }

  return (
    <FullLayout>
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.first}>
          <div className={styles.logo}></div>
          <div className={styles.bars}>{bars}</div>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="white"
              id="dropdown-basic"
              className={styles.dropdown}
            >
              English{" "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">English</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Spanish</Dropdown.Item>
              <Dropdown.Item href="#/action-3">French</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className={styles.newContainer}>
        <div>
          <h1 className={styles.texts}>
            How would you like to speak to a practitioner?
          </h1>
          <div className={styles.BtnGroup}>
            {/* <ButtonGroup /> */}
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </FullLayout>
  );
};

export default Display;
