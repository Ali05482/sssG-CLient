/* eslint-disable @next/next/link-passhref */
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import MainContext from "../../app/context/context";
import Swal from "sweetalert2";
import jwt from 'jsonwebtoken'
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
const Schedules = ({ schedulingView = false, doctorId, setSelectedDoctor, setVisible }) => {
  const global = useContext(MainContext);
  const [availabilities, setAvailabilities] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [processDoctorVisible, setProcessDoctorVisible] = useState(false);
  const [doctorAppointments, setDoctorAppointments] = useState([])
  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const secret = 'weightLoser@3rdEyeSof!@123!';
      const user = jwt?.verify(token, secret);
      const availabilities = await global?.getOverAllDoctorAvailability(schedulingView ? doctorId : user?.id);
      if (availabilities.status) {
        setAvailabilities(availabilities.result.data);
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    fetchAvailability();
    const token = localStorage.getItem("authToken")
      const secret = 'weightLoser@3rdEyeSof!@123!';
      const user = jwt?.verify(token, secret);
      setDoctor(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const convertToAMPM = (time24) => {
    var [hours, minutes] = time24.split(':');
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes.padStart(2, '0');
    var time12 = `${hours}:${minutes} ${period}`;
    return time12;
  }
  const handleCheckAppointments = async (doctorId) => {
    try {
      const doctorAppointments = await global?.getDoctorReservedAppointments(doctorId);
      if (doctorAppointments?.status) {
        console.log("doctorAppointments", doctorAppointments?.result?.data);
        setDoctorAppointments(doctorAppointments?.result?.data)
      }
      setProcessDoctorVisible(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  const handleSelectDoctor = (doctorId) => {
    setVisible(false);
    setSelectedDoctor(doctorId);

  }
  return (
    <>
      <main id="main">
        {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
          <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
        </div>}
        <Modal
          fullscreen
          isOpen={processDoctorVisible}
          className="modal-dialog-centered"
          size="xxl"
        >
          <ModalHeader style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} toggle={() => setProcessDoctorVisible(false)}>
            <h5 style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} className="text-center">Doctor Reserved Appointments</h5>
          </ModalHeader>
          <ModalBody style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} scope="col">Patient Name</th>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} scope="col">Patient Phone</th>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} scope="col">Appointment Time</th>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} scope="col">Appointment Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorAppointments?.map((appointment, index) => (
                    <tr key={index}>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}>{appointment?.patient?.firstName + " " + appointment?.patient?.lastName}</td>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}>{appointment?.patient?.phoneNumber}</td>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}>{appointment?.time}</td>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}>{appointment?.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
        </Modal>
        <section id="about" className="about">
          <div className="">
            <div className="section-title">
              <h5>{schedulingView ? "" : "Your Schedules"}</h5>
            </div>
            <Container fluid className="aboutContainer">
              <Row className="contents">
                <div className="row m-2">
                  <div className="col-md-2">
                    <Button onClick={() => handleCheckAppointments(schedulingView?doctorId:doctor?.id)} className="mx-2" variant="primary">Appointments</Button>
                  </div>
                  {schedulingView && <div className="col-md-3">
                    <Button onClick={() => { handleSelectDoctor(doctorId) }} variant="primary">Select</Button>
                  </div>}

                </div>
                {availabilities
                  ?.sort((a, b) => {
                    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    return daysOfWeek.indexOf(a?.day?.day) - daysOfWeek.indexOf(b?.day?.day);
                  })
                  .map((day, index) => (
                    <Col key={index} xs={12} sm={12} md={12} lg={12} xl={3} className="mb-3">
                      <Card>
                        <Card.Header>
                          <Link href={`./create-schedule?day=${day?.day?.day}`}>
                            <Button variant="success">{day?.day?.day}</Button>
                          </Link>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>{day?.timezone}</Card.Title>
                          <Card.Text>
                            {day?.availability === "both" ? "Virtual & Clinic" : day?.availability?.charAt(0).toUpperCase() + day?.availability?.slice(1)} <br /> <b>From</b>: {convertToAMPM(day?.fromTime)} <b>To</b>: {convertToAMPM(day?.toTime)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
        </section>
      </main>
    </>
  );
};

export default Schedules;
