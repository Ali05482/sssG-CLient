/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import React, { useEffect, useState, useContext, useRef } from "react";
import MainContext from "../../../app/context/context";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SickNote from "./SickNote";
import Prescription from "./Prescription";
import Swal from "sweetalert2";
import Referral from "./Referral";
import _, { set } from "lodash";
import { requisitionBuilder } from "../../../shared/report/Requisition";
import { doctorNoteBuilder } from "../../../shared/report/DoctorNote";

const Documents = ({
  config,
  appointmentId,
  questionnaires,
  questionnaireId,
  care = false,
}) => {
  const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
  const global = useContext(MainContext);
  const contentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [sickNoteVisible, setSickNoteVisible] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [updateQuestionnaires, setUpdatedQuestionnaires] =
    useState(questionnaires);
  const [prescriptionContentVisible, setPrescriptionContentVisible] =
    useState(false);
  const [referralContentVisible, setReferralContentVisible] = useState(false);
  const [requisitionContentVisible, setRequisitionContentVisible] =
    useState(false);
  const [doctorNoteContentVisible, setDoctorNoteContentVisible] =
    useState(false);
  const [sickNote, setSickNote] = useState({
    wasBefore: false,
    appointmentId: "",
    id: "",
    data: "",
    startDate: getCurrentDate(),
    endDate: getCurrentDate(),
  });
  const [prescriptionContent, setPrescriptionContent] = useState(``);
  const [prescription, setPrescription] = useState({
    wasBefore: false,
    appointmentId: "",
    id: "",
    prescriptionName: "Diagnosis",
    medicalInstruction: [],
    data: "",
  });
  const [referral, setReferral] = useState({
    id: "",
    wasBefore: false,
    appointmentId: "",
    previousDoctorId: "",
    referralDoctorId: "",
    patientId: "",
    data: "",
    questionnaireId: "",
  });
  const [requisition, setRequisition] = useState({
    data: "",
    wasBefore: false,
    appointmentId: "",
    id: "",
  });
  const [doctorNote, setDoctorNote] = useState({
    data: "",
    wasBefore: false,
    appointmentId: "",
    id: "",
  });
  const [patientLastAccessed, setPatientLastAccessed] = useState({});

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const getSickNote = async (appointmentId) => {
    try {
      const sickNote = await global?.getSickNote(appointmentId);
      if (sickNote?.status) {
        if (sickNote?.result?.data?.data) {
          setSickNote({
            wasBefore: true,
            appointmentId: appointmentId,
            id: sickNote?.result?.data?._id,
            data: sickNote?.result?.data?.data,
            startDate: sickNote?.result?.data?.startDate,
            endDate: sickNote?.result?.data?.endDate,
          });
        } else {
          setSickNote({
            wasBefore: false,
            appointmentId: appointmentId,
            id: "",
            data: "",
            startDate: getCurrentDate(),
            endDate: getCurrentDate(),
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching SickNote",
      });
    }
  };
  const getPrescription = async (appointmentId) => {
    try {
      const prescription = await global?.getPrescription(appointmentId);
      if (prescription?.status) {
        if (prescription?.result?.data) {
          setPrescription({
            wasBefore: true,
            appointmentId: appointmentId,
            id: prescription?.result?.data?._id,
            prescriptionName: prescription?.result?.data?.prescriptionName,
            medicalInstruction: prescription?.result?.data?.medicalInstruction,
            data: prescription?.result?.data?.data,
          });
        } else {
          setPrescription({
            wasBefore: false,
            appointmentId: appointmentId,
            id: "",
            prescriptionName: "",
            medicalInstruction: [],
            data: "",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Prescriptions",
      });
    }
  };
  const getReferral = async (appointmentId) => {
    try {
      const referral = await global?.getReferralByAppointmentId(appointmentId);
      if (referral?.status) {
        if (referral?.result?.data) {
          setReferral({
            wasBefore: true,
            appointmentId: appointmentId,
            id: referral?.result?.data?._id,
            previousDoctorId: referral?.result?.data?.previousDoctorId,
            referralDoctorId: referral?.result?.data?.referralDoctorId,
            patientId: referral?.result?.data?.patientId,
            data: referral?.result?.data?.data,
            questionnaireId: questionnaireId,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Referral",
      });
    }
  };
  const getRequisition = async (appointmentId) => {
    try {
      const requisition = await global?.getRequisitionByAppointmentId(
        appointmentId
      );
      if (requisition?.status) {
        if (requisition?.result?.data) {
          setRequisition({
            wasBefore: true,
            appointmentId: appointmentId,
            id: requisition?.result?.data?._id,
            data: requisition?.result?.data?.data,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Requisition",
      });
    }
  };
  const getDoctorNote = async (appointmentId) => {
    try {
      const requisition = await global?.getDoctorNote(appointmentId);
      if (requisition?.status) {
        if (requisition?.result?.data) {
          setDoctorNote({
            wasBefore: true,
            appointmentId: appointmentId,
            id: requisition?.result?.data?._id,
            data: requisition?.result?.data?.data,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Requisition",
      });
    }
  };
  const fetchDoctors = async () => {
    try {
      const allDoctors = await global?.getAllDoctors(
        updateQuestionnaires?.appointment?.patient?._id
      );
      if (allDoctors.status) {
        setDoctors(allDoctors.result.data);
        setPatientLastAccessed(allDoctors.result.lastAccessed);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Doctors",
      });
    }
  };
  const handleSubmitSickNote = async () => {
    try {
      await global?.addAndUpdateSickNote(sickNote);
      setSickNote({ ...sickNote, wasBefore: true });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Something Went Wrong, Contact Admin Please",
      });
    }
  };
  const handleSubmitPrescription = async () => {
    try {
      await global?.addAndUpdatePrescription(prescription);
      setPrescription({ ...prescription, wasBefore: true });
      await getPrescription(appointmentId);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Something Went Wrong, Contact Admin Please",
      });
    }
  };
  const handleSubmitReferral = async () => {
    try {
      await global?.addAndUpdateReferral(referral);
      setReferral({ ...referral, wasBefore: true });
      await getReferral(appointmentId);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Something Went Wrong, Contact Admin Please",
      });
    }
  };
  const handleSubmitRequisition = async () => {
    try {
      await global?.addAndUpdateRequisition(requisition);
      setRequisition({ ...requisition, wasBefore: true });
      await getRequisition(appointmentId);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Something Went Wrong, Contact Admin Please",
      });
    }
  };
  const handleSubmitDoctorNote = async () => {
    try {
      await global?.createAndUpdateDoctorNote(doctorNote);
      setRequisition({ ...doctorNote, wasBefore: true });
      await getDoctorNote(appointmentId);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Something Went Wrong, Contact Admin Please",
      });
    }
  };
  const newRequisition = () => {
    const newRequisition = requisitionBuilder(
      updateQuestionnaires?.appointment,
      global?.user?.currentUser
    );
    setRequisition({
      ...requisition,
      data: newRequisition,
      appointmentId: appointmentId,
    });
  };
  const newDoctorNote = () => {
    const newDoctorNotes = doctorNoteBuilder(
      updateQuestionnaires?.appointment,
      global?.user?.currentUser
    );
    setDoctorNote({
      ...doctorNote,
      data: newDoctorNotes,
      appointmentId: appointmentId,
    });
  };
  const handleDocuments = (type) => {
    if (type === "sickNote") {
      setIsModalOpen(!isModalOpen);
    } else if (type === "prescription") {
      setIsPrescriptionOpen(!isPrescriptionOpen);
    } else if (type === "referral") {
      setIsReferralOpen(!isReferralOpen);
    } else if (type === "requisition") {
      newRequisition();
    } else if (type === "doctorNoteBuilder") {
      newDoctorNote();
    }
  };
  const handleDownload = async (htmlString, title) => {
    const popupWindow = window?.open(title, "_blank");

    if (popupWindow) {
      popupWindow.document.title = title;
      popupWindow?.document?.write(htmlString);
      popupWindow?.document?.close();
      setTimeout(() => {
        popupWindow?.print();
      }, 50);
    } else {
      console.error("Unable to open new window");
    }
  };

  useEffect(() => {
    if (!_?.isEmpty(questionnaires)) {
      setUpdatedQuestionnaires(questionnaires);
    }
  }, [questionnaires]);
  useEffect(() => {
    getSickNote(appointmentId);
    getPrescription(appointmentId);
    getReferral(appointmentId);
    getRequisition(appointmentId);
    getDoctorNote(appointmentId);
    if (!_?.isEmpty(updateQuestionnaires?.appointment?.patient?._id)) {
      fetchDoctors();
    }
  }, [updateQuestionnaires]);
  useEffect(() => {
    setPrescription({ ...prescription, data: prescriptionContent });
  }, [prescriptionContent]);

  return (
    <>
      <div ref={contentRef} style={{ display: "none" }} />
      {/* <div style={{ height: "90vh" }} className="container bg-light my-3"> */}
      <div className="wrapper">
        {!care && (
          <>
            <br />
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header">
                <h5 className="title">Create Document</h5>
              </div>

              <div className="card-body">
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        onClick={() => handleDocuments("sickNote")}
                        className="btn btn-outline-secondary"
                      >
                        Medical Certificate
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDocuments("prescription")}
                        className="btn btn-outline-success"
                      >
                        Prescription
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDocuments("referral")}
                        className="btn btn-outline-primary"
                      >
                        Referral
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDocuments("requisition")}
                        className="btn btn-outline-info"
                      >
                        Requisition
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5 mt-3">
                    <div className="input-group">
                      <button
                        type="button"
                        onClick={() => handleDocuments("doctorNoteBuilder")}
                        className="btn btn-outline-info"
                      >
                        Doctor Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div id="accordion">
          {sickNote?.data && (
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header" id={`headingSickNote`}>
                <h5 className="mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="glowing-text text-primary">
                        Medical Citification (Sick Note)
                      </span>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSickNoteVisible(!sickNoteVisible)}
                        aria-expanded={sickNoteVisible ? "true" : "false"}
                        aria-controls={`collapseSickNote`}
                      >
                        Medical Certificate
                      </button>
                    </div>
                    <div className="col-md-3">
                      {!care && (
                        <>
                          <button
                            type="button"
                            onClick={handleSubmitSickNote}
                            className="btn btn-primary"
                          >
                            {sickNote?.wasBefore
                              ? "Update Sick Note"
                              : "Add Sick Note"}
                          </button>
                          <div className="mx-1"></div>
                          <div className="my-1"></div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleDownload(sickNote?.data, "Sick Note");
                        }}
                        className="btn btn-success"
                      >
                        Print & Download
                      </button>
                    </div>
                  </div>
                </h5>
              </div>
              <div
                id={`collapseSickNote`}
                className={`collapse ${sickNoteVisible ? "show" : ""}`}
                aria-labelledby={`headingSickNote`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <JoditEditor
                    value={sickNote?.data}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      setSickNote({ ...sickNote, data: newContent })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {prescription?.data && (
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header" id={`headingPrescriptionContent`}>
                <h5 className="mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="glowing-text text-primary">
                        Prescriptions Management
                      </span>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          setPrescriptionContentVisible(
                            !prescriptionContentVisible
                          )
                        }
                        aria-expanded={
                          prescriptionContentVisible ? "true" : "false"
                        }
                        aria-controls={`collapsePrescriptionManagement`}
                      >
                        Prescription
                      </button>
                    </div>
                    <div className="col-md-3">
                      {!care && (
                        <>
                          <button
                            type="button"
                            onClick={handleSubmitPrescription}
                            className="btn btn-primary"
                          >
                            {prescription?.wasBefore
                              ? "Update Prescription"
                              : "Add Prescription"}
                          </button>
                          <div className="mx-1"></div>
                          <div className="my-1"></div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleDownload(prescription?.data, "Prescription");
                        }}
                        className="btn btn-success"
                      >
                        Print & Download
                      </button>
                    </div>
                  </div>
                </h5>
              </div>

              <div
                id={`collapsePrescriptionManagement`}
                className={`collapse ${
                  prescriptionContentVisible ? "show" : ""
                }`}
                aria-labelledby={`headingPrescriptionContent`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <JoditEditor
                    value={prescription?.data}
                    config={config}
                    tabIndex={1}
                    onBlur={(prescriptionContent) =>
                      setPrescription({
                        ...prescription,
                        data: prescriptionContent,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {referral?.data && (
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header" id={`headingReferralContent`}>
                <h5 className="mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="glowing-text text-primary">
                        Referral Management
                      </span>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          setReferralContentVisible(!referralContentVisible)
                        }
                        aria-expanded={
                          referralContentVisible ? "true" : "false"
                        }
                        aria-controls={`collapseReferralManagement`}
                      >
                        Referral
                      </button>
                    </div>
                    <div className="col-md-3">
                      {!care && (
                        <>
                          <button
                            type="button"
                            onClick={handleSubmitReferral}
                            className="btn btn-primary"
                          >
                            {referral?.wasBefore
                              ? "Update Referral"
                              : "Add Referral"}
                          </button>
                          <div className="mx-1"></div>
                          <div className="my-1"></div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleDownload(referral?.data, "Referral");
                        }}
                        className="btn btn-success"
                      >
                        Print & Download
                      </button>
                    </div>
                  </div>
                </h5>
              </div>
              <div
                id={`collapseReferralManagement`}
                className={`collapse ${referralContentVisible ? "show" : ""}`}
                aria-labelledby={`headingReferral`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <JoditEditor
                    value={referral?.data}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      setReferral({ ...referral, data: newContent })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {requisition?.data && (
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header" id={`headingReferralContent`}>
                <h5 className="mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="glowing-text text-primary">
                        Requisition Management
                      </span>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          setRequisitionContentVisible(
                            !requisitionContentVisible
                          )
                        }
                        aria-expanded={
                          requisitionContentVisible ? "true" : "false"
                        }
                        aria-controls={`collapseRequisitionManagement`}
                      >
                        Requisition
                      </button>
                    </div>
                    <div className="col-md-3">
                      {!care && (
                        <>
                          <button
                            type="button"
                            onClick={handleSubmitRequisition}
                            className="btn btn-primary"
                          >
                            {requisition?.wasBefore
                              ? "Update Requisition"
                              : "Add Requisition"}
                          </button>
                          <div className="mx-1"></div>
                          <div className="my-1"></div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleDownload(requisition?.data, "Requisition");
                        }}
                        className="btn btn-success"
                      >
                        Print & Download
                      </button>
                    </div>
                  </div>
                </h5>
              </div>
              <div
                id={`collapseRequisitionManagement`}
                className={`collapse ${
                  requisitionContentVisible ? "show" : ""
                }`}
                aria-labelledby={`headingReferral`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <JoditEditor
                    value={requisition?.data}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      setRequisition({ ...requisition, data: newContent })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {doctorNote?.data && (
            <div
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.color,
              }}
              className="card"
            >
              <div className="card-header" id={`headingReferralContent`}>
                <h5 className="mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <span className="glowing-text text-primary">
                        Doctor Note Management
                      </span>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          setDoctorNoteContentVisible(!doctorNoteContentVisible)
                        }
                        aria-expanded={
                          doctorNoteContentVisible ? "true" : "false"
                        }
                        aria-controls={`collapseDoctorNoteManagement`}
                      >
                        Doctor Note
                      </button>
                    </div>
                    <div className="col-md-3">
                      {!care && (
                        <>
                          <button
                            type="button"
                            onClick={handleSubmitDoctorNote}
                            className="btn btn-primary"
                          >
                            {doctorNote?.wasBefore
                              ? "Update Doctor Note"
                              : "Add Doctor Note"}
                          </button>
                          <div className="mx-1"></div>
                          <div className="my-1"></div>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleDownload(doctorNote?.data, "DoctorNote");
                        }}
                        className="btn btn-success"
                      >
                        Print & Download
                      </button>
                    </div>
                  </div>
                </h5>
              </div>
              <div
                id={`collapseDoctorNoteManagement`}
                className={`collapse ${doctorNoteContentVisible ? "show" : ""}`}
                aria-labelledby={`headingReferral`}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <JoditEditor
                    value={doctorNote?.data}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) =>
                      setDoctorNote({ ...doctorNote, data: newContent })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
      <Modal isOpen={isModalOpen} className="modal-dialog-centered" size="xl">
        <ModalHeader  style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }} toggle={() => setIsModalOpen(!isModalOpen)}>
          <h5 className="text-center">Create Sick Note</h5>
        </ModalHeader>
        <ModalBody  style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}>
          <SickNote
            getCurrentDate={getCurrentDate}
            sickNote={sickNote}
            setSickNote={setSickNote}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            patient={questionnaires?.appointment?.patient}
            doctor={global?.user?.currentUser}
          />
        </ModalBody>
      </Modal>
      <Modal
        isOpen={isPrescriptionOpen}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalHeader  style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }} toggle={() => setIsPrescriptionOpen(!isPrescriptionOpen)}>
          <h5 className="text-center">Prescription Builder</h5>
        </ModalHeader>
        <ModalBody  style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}>
          <Prescription
            handleSubmitPrescription={handleSubmitPrescription}
            setPrescriptionContent={setPrescriptionContent}
            getCurrentDate={getCurrentDate}
            prescription={prescription}
            setPrescription={setPrescription}
            patient={questionnaires?.appointment?.patient}
            doctor={global?.user?.currentUser}
            isPrescriptionOpen={isPrescriptionOpen}
            setIsPrescriptionOpen={setIsPrescriptionOpen}
          />
        </ModalBody>
      </Modal>
      <Modal
        isOpen={isReferralOpen}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalHeader
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
          toggle={() => setIsReferralOpen(!isReferralOpen)}
        >
          <h5 className="text-center">Referral Builder</h5>
        </ModalHeader>

        <ModalBody
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
        >
          <Referral
            questionnaireId={questionnaireId}
            appointmentId={appointmentId}
            appointmentDetails={updateQuestionnaires?.appointment}
            referral={referral}
            setReferral={setReferral}
            doctor={global?.user?.currentUser}
            patientLastAccessed={patientLastAccessed}
            doctors={doctors}
            getCurrentDate={getCurrentDate}
            isReferralOpen={isReferralOpen}
            setIsReferralOpen={setIsReferralOpen}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Documents;
