import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import styles from "/styles/Appointment.module.css";
import MainContext from "../../app/context/context";
import { useRouter } from "next/router";

const Clinic = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [doctorsList, setDoctors] = useState([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatsEvery, setRepeatsEvery] = useState("");
  const [enteredValueError, setEnteredValueError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectOption, setSelectOption] = useState(null);

  const router = useRouter();
  const global = useContext(MainContext);
  useEffect(() => {
    if (!global.authenticate) {
      router.push("/auth/login");
    }
    // const fetchDoctors = async () => {
    //   const result = await global.doctors();
    //   console.log("Doctors API Result:", result);
    //   if (result.status && result.result.status) {
    //     setDoctors(result.result.data.docs);
    //   }
    // };
    // fetchDoctors();
  }, []);
  const handlesOptionChange = (event) => {
    setSelectOption(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRecurringChange = () => {
    setIsRecurring(!isRecurring);
  };

  const handleRepeatsEveryChange = (e) => {
    const value = e.target.value;
    setRepeatsEvery(value);

    // Check if the entered value is a valid number (1-99)
    const isValid = /^[1-9][0-9]?$|^99$/.test(value);
    setEnteredValueError(!isValid);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  console.log("Doctors List:", doctorsList);

  return (
    <>
      <Card>
        <CardBody>
          <Button color="primary" onClick={toggleModal}>
            Show Doctors
          </Button>
        </CardBody>
      </Card>

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalHeader toggle={toggleModal}>
          <h5 className="text-center">Manually Add Appointment</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6} className={styles.inputContainer}>
              <form className={styles.inputContainer}>
                <div className="mb-3">
                  <label htmlFor="appointmentType" className="form-label">
                    Select a Practitioner
                  </label>
                  <select className="form-select" id="appointmentType" required>
                    {doctorsList.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.biography}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  */}
                <div className="d-flex justify-content-between gap-2">
                  <div className="w-50">
                    <label htmlFor="apptype">Appointment Type*</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path d="M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M9.71,18L8.29,16.59L12.88,12L8.29,7.41L9.71,6L15.71,12L9.71,18Z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Appointment"
                        id="apptype"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-50">
                    <label htmlFor="dateField">Date Field</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Field"
                      id="dateField"
                    />
                  </div>
                </div>
                {/*  */}
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="recurringCheckbox"
                      checked={isRecurring}
                      onChange={handleRecurringChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="recurringCheckbox"
                    >
                      Recurring
                    </label>
                  </div>

                  {isRecurring && (
                    <div className="d-flex justify-content-between mt-3">
                      <div className="w-50">
                        <label htmlFor="repeatsEvery">Repeats every *</label>
                        <input
                          type="text"
                          className={`form-control ${
                            enteredValueError ? "is-invalid" : ""
                          }`}
                          id="repeatsEvery"
                          value={repeatsEvery}
                          onChange={handleRepeatsEveryChange}
                          placeholder="Enter a value (1 - 99)"
                        />
                        {enteredValueError && (
                          <div className="invalid-feedback">
                            Enter a valid value (1 - 99).
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* ÷ */}
                <div className={styles.inputContainer}>
                  <div className={`${styles.positionRelative} ${styles.mb3}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`${styles.svgIcon} ${
                        isFocused ? styles.svgActive : ""
                      }`}
                    >
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                    <input
                      type="text"
                      className={`${styles.formControl} ${
                        isFocused ? styles.focused : ""
                      }`}
                      placeholder=" "
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="firstName"
                      className={`${styles.placeholderLabel} ${
                        isFocused ? styles.active : ""
                      }`}
                    >
                      Patient First Name
                    </label>
                  </div>
                </div>
                {/*  */}
                <div className="md-form md-outline input-with-post-icon datepicker">
                  <input
                    placeholder="Select date"
                    type="date"
                    id="example"
                    className="form-control"
                  />
                  {/* <label htmlFor="example"><label> */}
                </div>
                {/*  */}
                <div className="text-">
                  NOTE: Completing these fields will send an SMS and/or email
                  confirmation to the patient.
                </div>
                <div className="md-form input-with-pre-icon">
                  <label className="fw-bold" htmlFor="prefixInside">
                    Cell Phone
                  </label>
                  <i className="fas fa-user input-prefix"></i>
                  <input
                    type="text"
                    id="prefixInside"
                    className="form-control"
                  />
                </div>
                {/*  */}
                <div className="mt-2">
                  <select className="form-select" id="appointmentType" required>
                    <option value="">Location</option>
                    <option value="Video">Central Mall</option>
                    <option value="Phone">Central Mall</option>
                    <option value="In-Clinic">Central Mall</option>
                  </select>
                </div>
              </form>
            </Col>
            {/* second column */}
            <Col md={6}>
              <form className={styles.nextsection}>
                <div className={styles.radioContainer}>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      id="video"
                      value="video"
                      checked={selectedOption === "video"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="video">Video</label>
                  </div>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      id="phone"
                      value="phone"
                      checked={selectedOption === "phone"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      id="inClinic"
                      value="inClinic"
                      checked={selectedOption === "inClinic"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="inClinic">In-Clinic</label>
                  </div>
                </div>
                {/* ... */}
                <div className="d-flex justify-content-center align-items-end ">
                  <div className={`flex-fill ${styles.csForm}`}>
                    <input
                      type="time"
                      className={styles.formControl}
                      value="10:05"
                    />
                  </div>
                  <div className={`flex-fill ${styles.csForm}`}>
                    <input
                      type="number"
                      className={styles.formControl}
                      id="duration"
                      placeholder="Enter duration in minutes"
                    />
                  </div>
                </div>
                <div></div>
                {/*  */}
                <div className="md-form input-with-pre-icon">
                  <label className="fw-bold" htmlFor="prefixInside">
                    Patient Last Name
                  </label>
                  <i className="fas fa-user input-prefix"></i>
                  <input
                    type="text"
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
                    type="text"
                    id="prefixInside"
                    className="form-control"
                  />
                </div>
                {/*  */}
                <div className={styles.radioContainer}>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      checked={selectedOption === "female"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className={styles.radioGroup}>
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      checked={selectedOption === "male"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                </div>
                {/*  */}
              </form>
            </Col>
            <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
              <Button color="primary" type="submit">
                Select Questionnaire
              </Button>
              <span>L1 - Triage</span>
              <Button color="primary" type="submit" className={styles.buttons}>
                X
              </Button>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Clinic;
