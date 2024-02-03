/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Row, Col } from "reactstrap";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import MainContext from "../../app/context/context";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import QuestionGroups from "../../components/questionaire/QuestionGroups";
import toast, { Toaster } from "react-hot-toast";
import SelectQuestionaire from "../questionaire/SelectQuestionaire";

const Appointment = ({ appointmentData }) => {
  const global = useContext(MainContext);
  const [isRecurring, setIsRecurring] = useState(false);
  const [totalDoctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [groups, setGruops] = useState(null);
  const toastCenter = useRef(null);
  const [appointment, setAppointment] = useState({
    user: "",
    clinic: "",
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
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [questionGroup, setQuestionGroup] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [isVitalTogglerActive, setIsVitalTogglerActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [questionaireOpen, setQuestionaireOpen] = useState(false);
  const [isVitalModelOpen, setIsVitalModalOpen] = useState(false);
  const fetchAllGroups = async () => {
    try {
      const result = await global?.fetchAllGroups();
      if (result?.status && result?.result?.status) {
        setGruops(result.result.data);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Questionaire",
      });
    }
  };
  function getCurrentLocalTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
  }
  const convertToAMPM = (time) => {
    if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
      throw new Error(
        "Invalid time format. Please provide time in the format HH:MM (24-hour time)."
      );
    }

    const [hours, minutes] = time.split(":").map(Number);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error(
        "Invalid time. Hours should be between 0-23 and minutes should be between 0-59."
      );
    }

    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = String(minutes).padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

 
  const fetchClinics = async () => {
    try {
      const allClinics = await global.getAllClinics();
      if (allClinics.status) {
        setAppointment({
          ...appointment,
          clinic: allClinics.result.data.docs[0]?._id,
        });
        setClinics(allClinics.result.data.docs);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Doctors",
      });
    }
  };
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
    fetchClinics();
    fetchAllGroups();
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
  const showMessage = (severity, detail) => {
    toastCenter.current.show({
      severity: severity,
      summary: "Filtered",
      detail: detail,
      life: 3000,
    });
  };
  const handleRecurringChange = (e) => {
    setIsRecurring(!isRecurring);
    const { value } = e.target;
    setAppointment({ ...appointment, isRecuring: isRecurring });
    // console.log(appointment)
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await global.addAppointment(appointment);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleQuestionaireOpen = () => {
    setQuestionaireOpen(true);
  };
  const handleQuestionaireClose = () => {
    setQuestionaireOpen(false);
  };
  const searchQuetion = (e) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filteredGroups = groups.filter((group) =>
      group.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredGroups(filteredGroups);
  };
  const handleVitalToggler = (event) => {
    setIsVitalTogglerActive(event.target.checked);
  };
  const handleVitalCollection = () => {
    setIsVitalModalOpen(!isVitalModelOpen);
  };
  return (
    <>
      <Row style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} >
        <Toaster position="top-center" reverseOrder={false} />
        <Col md={6}>
          <form  onSubmit={handleSubmit}>
            <div></div>
            <div  className={styles.inputContainer}>
              <div className="md-form input-with-pre-icon">
                <labe>
                  <b>Patient First Name</b>
                </labe>
                <input
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
              <i className="fas fa-user input-prefix"></i>
              <input
              style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
                onChange={handleChange}
                value={appointment.lastName}
                type="text"
                name="lastName"
                id="prefixInside"
                className="form-control"
              />
            </div>{" "}
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Health Card Number
              </label>
              <i className="fas fa-user input-prefix"></i>
              <input
              style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
                onChange={handleChange}
                value={appointment.healthCard}
                name="healthCard"
                type="text"
                id="prefixInside"
                className="form-control"
              />
            </div>{" "}
            <div className="md-form input-with-pre-icon">
              <label className="fw-bold" htmlFor="prefixInside">
                Email
              </label>
              <i className="fas fa-user input-prefix"></i>
              <input
              style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
              <i className="fas fa-user input-prefix"></i>
              <input
              style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
                type="text"
                id="prefixInside"
                className="form-control"
                name="phoneNumber"
                value={appointment.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className={styles.radioContainer}>
              <div className={styles.radioGroup}>
                <input
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
              <input
                type="hidden"
                name="questioner"
                value={questionGroup?._id}
                defaultValue={questionGroup?._id}
              />
              <div className={styles.radioGroup}>
                <input
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
            {/*  */}
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </Col>

        <Col md={6}>
          <form className={styles.nextsection}>
             <div className={styles.inputContainer}>
              <div className="md-form md-outline input-with-post-icon datepicker">
                <label><b>Select Clinic</b></label>
                <select
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
                  name="clinic"
                  value={appointment.clinic}
                  onChange={handleChange} className="form-select" id="clinic" required>
                  {clinics && clinics?.map((item, index) => {
                    const isSelected = item._id === global?.user?.currentUser?.clinicId;
                    return (
                      <option key={index} value={item?._id} selected={isSelected ? 'selected' : null}>
                        {item?.name}, {item?.location}
                      </option>
                    )
                  })
                  }
                </select>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="dateField"><b>Select Date</b></label>
                <input
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
              style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}}
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
            {/* <div className="md-form md-outline input-with-post-icon datepicker">
              <div className="form-check">
                <input onChange={handleVitalToggler} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Add Vitals Along
                </label>
              </div>
            </div> */}
          </form>
        </Col>
        {/* second column */}

        <Dialog
          open={open}
          onClose={handleQuestionaireClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Select A Questionnaire</DialogTitle>
          <DialogContent>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Practitioner Questionnaires" />
              <Tab label="Library" />
            </Tabs>
            {tabValue === 0 &&
              groups?.map((group, index) => (
                <QuestionGroups key={index} group={group} />
              ))}
            {tabValue === 1 && (
              <TextField
                fullWidth
                placeholder="Search in Library"
                variant="outlined"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
          {/* <Button color="primary" type="submit">
            Select Questionnaire
          </Button> */}
          <Dialog
            open={questionaireOpen}
            onClose={handleQuestionaireClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Select A Questionnaire</DialogTitle>
            <DialogContent>
              <div className="form-group">
                <label htmlFor="searchQuestion">Search</label>
                <input
                  onChange={searchQuetion}
                  type="search"
                  id="searchQuestion"
                  className="form-control"
                />
              </div>
              <div className="my-3"></div>
              {searchTerm === ""
                ? groups?.map((group, index) => (
                  <div key={index} className="row">
                    <SelectQuestionaire
                      setOpen={setQuestionaireOpen}
                      toast={toast}
                      key={index}
                      group={group}
                      setQuestionGroup={setQuestionGroup}
                    />
                  </div>
                ))
                : filteredGroups.map((group, index) => (
                  <div key={index} className="row">
                    <SelectQuestionaire
                      toast={toast}
                      key={index}
                      group={group}
                      setQuestionGroup={setQuestionGroup}
                    />
                  </div>
                ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleQuestionaireClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleVitalCollection}
              style={{
                color: "white",
                textDecoration: "none",
                display: isVitalTogglerActive ? "block" : "none",
              }}
            >
              <a style={{ color: "white", textDecoration: "none" }}>Vitals</a>
            </Button>
          
          </div>
        </div>
      </Row>
    </>
  );
};
export default Appointment;
