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
import React, { useContext, useEffect, useRef, useState } from "react";
import Appointment from "../../src/components/dashboard/Appointment";
import Swal from "sweetalert2";
import FullLayout from "../../src/layouts/FullLayout";
import DailyAppointment from "./DailyAppointment ";


const VirtualCare = () => {
  const audioRef = useRef(null);
  const router = useRouter();
  const global = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAppointments, setAllAppointments] = useState(false);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [liveAppointmentsSounds, setLiveAppointmentsSounds] = useState([]);
  const getDoctorsTodaysAppointments = async () => {
    try {
      const allAppointments = await global?.getDoctorsTodaysAppointments();
      if (allAppointments?.status) {
        setTodaysAppointments(allAppointments?.result?.data)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Doctors",
      });
    }
  }
  const fetchAllAppointments = async () => {
    try {
      const allAppointments = await global?.getAllAppointments();
      if (allAppointments?.status) {
        setAllAppointments(allAppointments?.result?.data);
        filterTodaysAppointments(allAppointments?.result?.data?.docs)
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
    const filteredAppointments = allAppointments?.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
      );
    });
    // setTodaysAppointments(filteredAppointments);
  };

  useEffect(() => {
    if (!global.authenticate) {
      router.push("/auth/login");
    }
    fetchAllAppointments();
    getDoctorsTodaysAppointments();
    const intervalId = setInterval(() => {
      getDoctorsTodaysAppointments();
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkIfAnyAppointmentIsLive = () => {

    const liveAppointments = todaysAppointments?.filter(x => x?.isLive == true && x?.inConnection == false);
    if (liveAppointments?.length > 0) {
      for (let i = 0; i < liveAppointments?.length; i++) {
        if (!liveAppointmentsSounds?.includes(liveAppointments[i]?._id)) {
          console.log("liveAppointments[i]", liveAppointments[i]);
          playAudio()
          setLiveAppointmentsSounds([...liveAppointmentsSounds, liveAppointments[i]?._id]);
        }
      }
    }
  };
  useEffect(() => {
    checkIfAnyAppointmentIsLive();
    const intervalId = setInterval(() => {
      checkIfAnyAppointmentIsLive();
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysAppointments]);
  const playAudio = () => {
    audioRef.current.play();
  };
  return (
    <FullLayout>
      <div>
        <Row >

          <Col xs="18" md="18" sm="18">
            <audio
              style={{ display: "none" }}
              src="/audio/notification.wav"
              controls
              ref={audioRef}
              autoPlay={false}
            ></audio>
            <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
              <CardBody className="virtualup">
                <div className="virtualitybuttons">
                  <Button
                    color="secondary"
                    className="ms-3"
                    outline
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    <i className="bi bi-plus-circle"></i> Manually Add Appointment
                    <Badge color="secondary"></Badge>
                  </Button>

                  <Modal

                    isOpen={isModalOpen}
                    className="modal-dialog-centered"
                    size="xl"
                  >
                    <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setIsModalOpen(!isModalOpen)}>
                      <h5 className="text-center">Manually Add Appointment</h5>
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                      <Appointment />
                    </ModalBody>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="18" md="18" sm="18">
            <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="virtualappoint">
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
                      <>
                        <div className="my-3">
                          <DailyAppointment key={index} appointment={appointment} fromCalendar={true} />
                        </div>
                      </>
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

          <Col style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} xs="12" md="8">
            <MyCalendar allAppointments={allAppointments} />
          </Col>
        </Row>
      </div>
    </FullLayout>
  );
};

export default VirtualCare;
