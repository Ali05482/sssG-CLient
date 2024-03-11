import React, { useEffect, useState, useContext } from "react";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";
import { noteBuilder } from "../../../shared/report/noteBuilder";
import { summaryBuilder } from "../../../shared/report";
import Reporter from "../Reporter";

const Note = ({ config, appointmentId, questionnaires, isRecordView }) => {
  const global = useContext(MainContext);
  const [noteContent, setNoteContent] = useState(``);
  const [vitals, setVitals] = useState({});
  const [sickNote, setSickNote] = useState({});
  const [doctorNote, setDoctorNote] = useState({});
  const [prescription, setPrescription] = useState({});
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastVisit, setLastVisit] = useState({});
  const [appointmentReferral, setAppointmentReferral] = useState({
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

  const getAppointment = async (appointmentId) => {
    try {
      const report = await global?.getReport(appointmentId);
      if (report?.status) {
        if (report?.result?.data) {
          setAppointmentReferral({
            wasBefore: true,
            appointmentId: appointmentId,
            id: report?.result?.data?.referral?._id,
            previousDoctorId: report?.result?.data?.referral?.previousDoctorId,
            referralDoctorId: report?.result?.data?.referral?.referralDoctorId,
            patientId: report?.result?.data?.referral?.patientId,
            data: report?.result?.data?.referral?.data,
            questionnaireId: report?.result?.data?.referral?.questionnaireId,
          });
          setRequisition({
            wasBefore: true,
            appointmentId: appointmentId,
            id: report?.result?.data?.requisition?._id,
            data: report?.result?.data?.requisition?.data,
          });
          setDoctorNote({
            wasBefore: true,
            appointmentId: appointmentId,
            id: report?.result?.data?.doctorNote?._id,
            data: report?.result?.data?.doctorNote?.data,
          });
          setSickNote({
            wasBefore: true,
            appointmentId: appointmentId,
            id: report?.result?.data?.sickNote?._id,
            data: report?.result?.data?.sickNote?.data,
            startDate: report?.result?.data?.sickNote?.startDate,
            endDate: report?.result?.data?.sickNote?.endDate,
          });
          setPrescription({
            wasBefore: true,
            appointmentId: appointmentId,
            id: report?.result?.data?.prescription?._id,
            prescriptionName:
              report?.result?.data?.prescription?.prescriptionName,
            medicalInstruction:
              report?.result?.data?.prescription?.medicalInstruction,
            data: report?.result?.data?.prescription?.data,
          });
          setVitals(report?.result?.data?.vitals);
          setAppointment(report?.result?.data);
          setLastVisit(report?.result?.lastVisit);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Appointment",
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
  const getReferral = async (appointmentId) => {
    try {
      const referral = await global?.getReferralByAppointmentId(appointmentId);
      if (referral?.status) {
        if (referral?.result?.data) {
          setAppointmentReferral({
            wasBefore: true,
            appointmentId: appointmentId,
            id: referral?.result?.data?._id,
            previousDoctorId: referral?.result?.data?.previousDoctorId,
            referralDoctorId: referral?.result?.data?.referralDoctorId,
            patientId: referral?.result?.data?.patientId,
            data: referral?.result?.data?.data,
            questionnaireId: referral?.result?.data?.questionnaireId,
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
        text: "Something went wrong!, While Fetching SickNote",
      });
    }
  };
  const getVitalsByAppointmentId = async (appointmentId) => {
    try {
      const vitals = await global?.getVitalsByAppointmentId(appointmentId);
      if (vitals?.status) {
        setVitals(vitals?.result?.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching SickNote",
      });
    }
  };
  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/download-pdf", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ htmlString: noteContent }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Downloading PDF, Please try again....",
      });
    }
  };
  const handleChangeAppointmentStatus = async () => {
    try {
      await global?.updateAppointmentStatus(
        { status: "doctorApproved" },
        appointmentId
      );
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Downloading PDF, Please try again....",
      });
    }
  };
  useEffect(() => {
    // getSickNote(appointmentId);
    // getPrescription(appointmentId);
    // getVitalsByAppointmentId(appointmentId);
    // getReferral(appointmentId);
    // getRequisition(appointmentId);
    getAppointment(appointmentId);
  }, [appointmentId]);

  useEffect(() => {
    const summary = summaryBuilder(questionnaires, global);
    setNoteContent(
      noteBuilder(
        { vitals },
        sickNote?.data,
        prescription?.data,
        summary,
        appointmentReferral?.data,
        requisition?.data,
        appointment,
        lastVisit,
        doctorNote?.data
      )
    );
  }, [
    questionnaires,
    sickNote?.data,
    prescription?.data,
    appointmentReferral?.data,
    requisition?.data,
    doctorNote?.data,
    appointment,
    lastVisit,
    vitals,
  ]);
  return (
    <>
      {isRecordView !="true" ? <button
        onClick={handleChangeAppointmentStatus}
        type="button"
        className="ml-2 mb-2 mt-2 btn btn-primary"
      >
        <i className="bi bi-arrow-down-circle "></i> Mark as Complete
        {loading && (
          <span
            className="spinner-border spinner-border-sm mx-1"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </button>: <></>}
      <Reporter htmlString={noteContent}/>
    </>
  );
};

export default Note;
