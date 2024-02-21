/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Row, Col } from "reactstrap";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import MainContext from "../../app/context/context";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";

const Appointment = ({ appointmentData }) => {
  const global = useContext(MainContext);
  const [appointment, setAppointment] = useState({
    user: "",
    clinic: global?.user?.currentUser?.clinicId,
    questioner: "L1-Triage",
    healthCard: "",
    date: new Date().toISOString().substr(0, 10),
    duration: 7,
    isRecuring: false,
    repeat: "",
    frequency: "",
    numberOfOccurences: "",
    appointmentMedium: "",
    appiontmentType: "default",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "1234560548",
    repeat: "",
    doctorName: "",
    details: ""
  });
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "isRecuring") {
    } else if (name === "repeat") {
      const isValid = /^[1-9][0-9]?$|^99$/.test(value);
      setEnteredValueError(!isValid);
    } else if (name === "doctor") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const optionText = selectedOption.innerHTML;
      setAppointment({ ...appointment, doctorName: optionText });
    }
    setAppointment({ ...appointment, [name]: value });

  };

  useEffect(() => {
    if (appointmentData) {
      setAppointment({
        user: appointmentData.user,
        clinic: appointmentData.clinic._id,
        doctor: appointmentData.doctor,
        questioner: "L1-Triage",
        healthCard: appointmentData.healthCard,
        date: appointmentData.date,
        time: appointmentData.time,
        duration: appointmentData.duration,
        isRecuring: appointmentData.isRecuring,
        repeat: appointmentData.repeat,
        frequency: appointmentData.frequency,
        numberOfOccurences: appointmentData.numberOfOccurences,
        appointmentMedium: appointmentData.appointmentMedium,
        appiontmentType: appointmentData.appiontmentType,
        firstName: appointmentData.user?.firstName,
        lastName: appointmentData.user?.lastName,
        dateOfBirth: appointmentData.user?.dateOfBirth,
        phoneNumber: appointmentData.user?.phoneNumber,
        gender: appointmentData.user?.gender,
        email: appointmentData.user?.email,
        password: appointmentData.user?.password,
        repeat: appointmentData.repeat,
        doctorName: appointmentData.doctorName,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addAppointment = await global.addAppointment(appointment, "callback");
      if (addAppointment?.status) {
        if (addAppointment?.result?.status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: addAppointment?.result?.msg,
          });
          // reset the form 
          setAppointment({
            user: "",
            clinic: global?.user?.currentUser?.clinicId,
            questioner: "L1-Triage",
            healthCard: "",
            date: new Date().toISOString().substr(0, 10),
            duration: 7,
            isRecuring: false,
            repeat: "",
            frequency: "",
            numberOfOccurences: "",
            appointmentMedium: "",
            appiontmentType: "default",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            phoneNumber: "",
            details: "",
            password: "1234560548",
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: addAppointment?.result?.msg,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          text:addAppointment?.result?.msg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };
  useEffect(() => {
    setAppointment({ ...appointment, clinic: global?.user?.currentUser?.clinicId });
  }, [global?.user?.currentUser?.clinicId]);
  return (
    <>
      <Row style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} >
        <Toaster position="top-center" reverseOrder={false} />
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <div className="md-form input-with-pre-icon">
                <labe>
                  <b>Patient First Name</b>
                </labe>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="firstName"
                  onChange={handleChange}
                  value={appointment.firstName}
                  type="text"
                  id="firstName"
                  className="form-control"
                />
              </div>
            </div>
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Patient Last Name
              </label>

              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                onChange={handleChange}
                value={appointment.lastName}
                type="text"
                name="lastName"
                id="prefixInside"
                className="form-control"
              />
            </div>
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Health Card Number
              </label>

              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                onChange={handleChange}
                value={appointment.healthCard}
                name="healthCard"
                type="text"
                id="prefixInside"
                className="form-control"
              />
            </div>
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Email
              </label>

              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                name="email"
                onChange={handleChange}
                value={appointment.email}
                type="text"
                id="prefixInside"
                className="form-control"
              />
            </div>
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Cell Phone
              </label>
              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                type="text"
                id="prefixInside"
                className="form-control"
                name="phoneNumber"
                value={appointment.phoneNumber}
                onChange={handleChange}
              />
              
            </div>
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Chief Complaint
              </label>

              <textarea
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                type="text"
                id="prefixInside"
                className="form-control"
                name="details"
                value={appointment.details}
                onChange={handleChange}
                cols="10" rows="3"></textarea>
            </div>
            <div className={styles.radioContainer}>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  defaultValue={"female"}
                  name="gender"
                  type="radio"
                  id="female"
                  value="female"
                  checked={appointment.gender === "female"}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  defaultValue={"female"}
                  name="gender"
                  type="radio"
                  id="male"
                  value="male"
                  checked={appointment.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  defaultValue={"female"}
                  name="gender"
                  type="radio"
                  id="other"
                  value="other"
                  checked={appointment.gender === "other"}
                  onChange={handleChange}
                />
                <label htmlFor="male">Other</label>
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </Col>
        <Col md={6}>
          <form className={styles.nextsection}>
            <div className={styles.inputContainer}>
              <div className="md-form md-outline input-with-post-icon datepicker">
                <label><b>Your Clinic</b></label>
                <select
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="clinic"
                  value={appointment.clinic}
                  disabled
                  onChange={handleChange} className="form-select" id="clinic" required>
                  <option value={global?.user?.currentUser?.clinicId}>{global?.user?.currentUser?.clinicName}</option>
                </select>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="dateField"><b>Select Date</b></label>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  onChange={handleChange}
                  type="date"
                  className="form-control"
                  name="date"
                  value={appointment.date}
                  id="date"
                  placeholder="Date Field"
                  min={getCurrentDate}
                />
              </div>
            </div>
            {global.pageLoader.primeReactLoader && (
              <div className={styles.overlay}>
                <ProgressSpinner
                  style={{ width: "180px", height: "180px" }}
                  animationDuration=".5s"
                />
              </div>
            )}
            <div className={styles.inputContainer}>
              <div className="md-form md-outline input-with-post-icon datepicker">
                <labe>
                  <b>Appointment Type</b>
                </labe>
                <select
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="appiontmentType"
                  id="appiontmentType"
                  value={appointment.appiontmentType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="default">Default</option>
                  <option value="adult">Adult</option>
                  <option value="children">Children</option>
                </select>
              </div>
            </div>
            <div className="md-form md-outline input-with-post-icon datepicker">
              <labe>
                <b>Enter Date of Birth</b>
              </labe>
              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                name="dateOfBirth"
                onChange={handleChange}
                placeholder="Select date"
                value={appointment.dateOfBirth}
                type="date"
                id="dateOfBirth"
                className="form-control"
              />
            </div>
            <div className={styles.radioContainer}>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="appointmentMedium"
                  type="radio"
                  id="video"
                  value="video"
                  checked={appointment.appointmentMedium === "video"}
                  onChange={handleChange}
                />
                <label htmlFor="video">Video</label>
              </div>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="appointmentMedium"
                  type="radio"
                  id="phone"
                  value="phone"
                  checked={appointment.appointmentMedium === "phone"}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className={styles.radioGroup}>
                <input
                  style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                  name="appointmentMedium"
                  type="radio"
                  id="inClinic"
                  value="inClinic"
                  checked={appointment.appointmentMedium === "inClinic"}
                  onChange={handleChange}
                />
                <label htmlFor="inClinic">In-Clinic</label>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </>
  );
};
export default Appointment;
