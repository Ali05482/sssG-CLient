import {
  Badge,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Link from "next/link";
import MainContext from "../../../../src/app/context/context";
import React, { useContext, useEffect, useState } from "react";
import styles from "/styles/Appointment.module.css";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import CreateQuestionaire from "../../../../src/components/questionaire/create/CreateQuestionaire";
import FullLayout from "../../../../src/layouts/FullLayout";

const Main = () => {
  const global = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <FullLayout>
    <div>
      <Row>
        <Col xs="12" md="12" sm="12">
          <Card style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color}}>
            {global.pageLoader.primeReactLoader && (
              <div className={styles.overlay}>
                <ProgressSpinner
                  style={{ width: "180px", height: "180px" }}
                  animationDuration=".5s"
                />
              </div>
            )}
            <CardBody className="virtualup">
              <CreateQuestionaire />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </FullLayout>
  );
};

export default Main;
