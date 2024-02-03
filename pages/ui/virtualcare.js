import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import MyCalendar from "../../src/components/dashboard/Calendar";
import MainContext from "../../src/app/context/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Appointment from "../../src/components/dashboard/Appointment";
import styles from "/styles/Appointment.module.css";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
import FullLayout from "../../src/layouts/FullLayout";
import DailyAppointment from "./DailyAppointment ";
const VirtualCare = () => {
  const router = useRouter();
  const global = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAppointments, setAllAppointments] = useState(false);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const fetchAllAppointments = async () => {
    try {
      const allAppointments = await global.getAllAppointments();
      if (allAppointments.status) {
        setAllAppointments(allAppointments.result.data);
        filterTodaysAppointments(allAppointments.result.data.docs)
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Doctors",
      });
    }
  };

  const filterTodaysAppointments = (allAppointments) => {
    const today = new Date();
    const filteredAppointments = allAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
      );
    });
    setTodaysAppointments(filteredAppointments);
  };

  useEffect(() => {
    if (!global.authenticate) {
      router.push("/auth/login");
    }
    fetchAllAppointments();
    const intervalId = setInterval(() => {
      fetchAllAppointments();
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goto = ()=>{
    window.location.href = "http://localhost:3001/app"
  }
  return (
    <FullLayout>
      <div>
        <Row >
          {global?.user?.currentUser?.role!=="patient"?<>
          <Col xs="12" md="12" sm="12">
            <Card style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>
              <CardBody className="virtualup">
                <div className="virtualitybuttons">
                  {/* <Button  onClick={goto} color="secondary" outline>
                    <i className="bi bi-tv-fill"></i> Preview Virtual Care
                    <Badge color="secondary"></Badge>
                  </Button> */}
                  <Button
                  
                    color="secondary"
                    className="ms-3"
                    outline
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    <i className="bi bi-plus-circle"></i> Manually Add Appointment{" "}
                  <Badge color="secondary"></Badge>
                  </Button>

                  <Modal
                  
                    isOpen={isModalOpen}
                    className="modal-dialog-centered"
                    size="xl"
                  >
                    <ModalHeader style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} toggle={() => setIsModalOpen(!isModalOpen)}>
                      <h5 className="text-center">Manually Add Appointment</h5>
                    </ModalHeader>
                    <ModalBody style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>
                      <Appointment />
                    </ModalBody>
                  </Modal>
                  {/* <Button color="secondary" className="ms-3" outline>
                    <i className="bi bi-cloud-arrow-down-fill"></i> Appointment
                    Report <Badge color="secondary"></Badge>
                  </Button>
                  <Button color="secondary" className="ms-3" outline>
                    Test Virtual Visit <Badge color="secondary"></Badge>
                  </Button> */}
                </div>
                {/* <div className="virtualitybuttons">
                  <Button color="secondary" className="ms-3" outline>
                    <i className="bi bi-gear-fill"></i>
                    <Link href="/ui/general">Settings</Link>
                    <Badge color="secondary"></Badge>
                  </Button>
                </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col  xs="12" md="4" sm="12">
            <Card style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="virtualappoint">
              <CardTitle tag="h6" className="border-bottom mb-0 virtualpage">
                <div className="mx-3">Today s Appointment</div>
                <div className="virtualicon">
                  <i className="bi bi-hourglass"></i>
                </div>
              </CardTitle>
              <CardBody className="virtualappointment">
                <div>
                  {todaysAppointments?.length > 0 ? (
                    todaysAppointments.map((appointment, index) => (
                      <DailyAppointment key={index} appointment={appointment} fromCalendar={true                          }/>
                    ))
                  ) : (
                    <h6>
                      <i className="bi bi-bookmark-fill"></i>
                      You have no appointments today
                    </h6>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          </>:''}
         
          <Col style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} xs="12" md="8">
            <MyCalendar allAppointments={allAppointments} />
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default VirtualCare;
