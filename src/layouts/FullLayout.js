import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";
import LoadingBar from "react-top-loading-bar";
import MainContext from "../app/context/context";
import styles from "/styles/layout/FullLayout.module.css";
import jwt from 'jsonwebtoken'
import Swal from "sweetalert2";
const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const global = useContext(MainContext);
  const showMobilemenu = () => {
    setOpen(!open);
  };
  const [currentUser, setCurrentUser] = useState({
    firstName: "", lastName: "", email: "", role: ""
  })
  const fetchUser = async () => {
    try {
      const token = localStorage?.getItem("authToken")
      const secret = 'weightLoser@3rdEyeSof!@123!';
      const user = jwt?.verify(token, secret);
      setCurrentUser(user)
      global?.user?.setCurrentUser(user)
    } catch (error) {
      if (error.message == "jwt expired") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Your session is expired, please re-login,  redirecting to login in 2 seconds",
        });
        setTimeout(() => {
          localStorage.clear();
          const baseUrl = window.location.origin;
          window.location.href = baseUrl + "/auth/login";
        }, 1500);
      }
    }
  }
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <main style={{ backgroundColor: global?.theme?.bodyColor }} className="main-div">
      <div>
        <LoadingBar
          color="#0000FF"
          progress={global.pageLoader.pageLoading}
          onLoaderFinished={() => global?.pageLoader?.setPageLoading(0)}
        />
      </div>

      <div className={styles.flexContainer}>
        <aside
          id="side-bar" className={`${styles.sidebar} ${!open ? "" : styles.showSidebar} ${global?.mode === "dark" ? "dark-mode-background" : "light-mode-background"} position-relative z-3`}
        >
          <Sidebar currentUser={currentUser} showMobilemenu={() => showMobilemenu()} />
        </aside>
        <div className={`${styles.contentArea} bodyArea`}>
          <Header currentUser={currentUser} showMobmenu={() => showMobilemenu()} />
          <Container className={styles.wrapper}>
            <Row>
              <Col>
                  {/* <div style={{ maxHeight: "120vh", overflowY: "scroll" }}> */}
                    {children}
                  {/* </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
