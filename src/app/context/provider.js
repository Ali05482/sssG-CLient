import login from "./auth/login";
import MainContext from "./context";
import React, { useState } from "react";
import getAllDoctors from "./doctors/getAllDoctors";
import getAllUsers from "./users/getAllUsers";
import addUser from "./users/addUser";
import updateUser from "./users/updateUser";
import getAllClinics from "./clinics/getAllClinics";
import addAppointment from "./Appointment/addAppointment";
import getAllAppointments from "./Appointment/getAllAppointments";
import addClinic from "./clinics/addClinic";
import editClinic from "./clinics/editClinic";
import getCurrentUser from './users/getCurrentUser'
import getAllFolder from "./questionaires/folder/getAllFolder";
import fetchAllGroupsByFolderId from "./questionaires/group/fetchAllGroupsByFolderId";
import addFolder from "./questionaires/folder/addFolder";
import _ from 'lodash'
import createQuestionaire from "./questionaires/createQuestionaire";
import getQuestionaire from "./questionaires/getQuestionaire";
import patientSignUp from "./auth/patientSignUp";
import fetchAllGroups from "./questionaires/group/fetchAllGroups";
import fetchQuestionsAndAnswersOnly from "./questionaires/fetchQuestionsAndAnswersOnly";
import updateQuestion from "./questionaires/updateQuestion";
import searchPatient from "./patients/searchPatient";
import getDoctorsForApointments from "./Appointment/getDoctorsForApointments";
import addAppointmentOnly from "./Appointment/addAppointmentOnly";
import getLinkedQuestions from "./questionaires/getLinkedQuestions";
import linkedQuestions from "./questionaires/linkedQuestions";
import addVitals from "./Appointment/addVitals";
import collectAnswer from "./questionaires/collectAnswer";
import getTodaysAndNonQuestainredAppointment from "./Appointment/getTodaysAndNonQuestainredAppointment";
import { formatDate, formatTime, calculateAge } from './others'
import getCollectedQuestionnaire from "./questionaires/getCollectedQuestionnaire";
import getCollectedQuestionnaireById from "./Appointment/getCollectedQuestionnaireById";
import uploadQuestionreImagesImages from "./questionaires/uploadQuestionreImagesImages";
import saveDoctorChange from "./questionaires/saveDoctorChange";
import addPlatform from "./platform/addPlatform";
import editPlatForm from "./platform/editPlatForm";
import getAllPlatForm from "./platform/getAllPlatForm";
import addAndUpdateSickNote from "./report/addAndUpdateSickNote";
import getSickNote from "./report/getSickNote";
import addAndUpdatePrescription from "./report/addAndUpdatePrescription";
import getPrescription from "./report/getPrescription";
import getVitalsByAppointmentId from "./Appointment/getVitalsByAppointmentId";
import getReferralByAppointmentId from "./report/getReferralByAppointmentId";
import addAndUpdateReferral from "./report/addAndUpdateReferral";
import getReferralByReferDoctorId from "./report/getReferralByReferDoctorId";
import htmlStringToPdf from "./html2PdfDownloader";
import addAndUpdateRequisition from "./report/addAndUpdateRequisition";
import getRequisitionByAppointmentId from "./report/getRequisitionByAppointmentId";
import getAppointmentsForVitals from "./Appointment/getAppointmentsForVitals";
import getAppointmentsForScheduling from "./Appointment/getAppointmentsForScheduling";
import getDoctorsForScheduling from "./doctors/getDoctorsForScheduling";
import getOverAllDoctorAvailability from "./doctors/getOverAllDoctorAvailability"; 
import addDoctorAvailability from "./doctors/addDoctorAvailability";
import updateAppointment from "./Appointment/updateAppointment";
import getDoctorReservedAppointments from "./Appointment/getDoctorReservedAppointments";
import getAppointmentsForCare from "./Appointment/getAppointmentsForCare";
import getQuestionnaireFileByName from "./questionaires/getQuestionnaireFileByName";
import getAppointmentsForMeeting from "./questionaires/getAppointmentsForMeeting";
import updateAppointmentStatus from "./Appointment/updateAppointmentStatus";



// import getAllUsers from "./users/getAllUsers";

let pageLoader;

const Providor = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(0)
  const [primeReactLoader, setPrimeReactLoader] = useState(false);
  const [questionaire, setQuestionaire] = useState([]);
  const [mode, setMode] = useState("dark");
  const darkMode = {
    backgroundColor:"#272B33",
    color:"#6C757D",
    bodyColor:"#0A0C10",
    inputColor:"#FFF"
  };
  const lightMode = {
    backgroundColor:"#F8F9FA",
    color:"#000",
    bodyColor:"#B3B3B3",
    inputColor:"#000"
  }
  const [theme, setTheme] = useState({
    backgroundColor:"#272B33",
    color:"#6C757D",
    bodyColor:"#0A0C10",
    inputColor:"#FFF"
  })
  const toggleMode = ()=>{
    if(mode==="dark"){
      setMode("light")
      setTheme(lightMode)
    } else if(mode==="light"){
      setMode("dark")
      setTheme(darkMode)  
    }
  }
  const questionaireState = {
    questionaire, setQuestionaire
  }
  pageLoader = {
    pageLoading, setPageLoading, primeReactLoader, setPrimeReactLoader
  }
  const user = {
    currentUser, setCurrentUser
  }
  let authenticate = true;

  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken");
  }
  // console.log(token);
  if (!token) {
    authenticate = false;
  } else {
    authenticate = true;
  }
  const rand = () => {
    const randomNumber = Math.floor(Math.random() * 9991) + 10; // Generates a random number between 10 and 10000
    return randomNumber;
  }
  const data = {
    pageLoader,
    login,
    authenticate,
    getAllDoctors,
    getAllUsers,
    getAllClinics,
    addAppointment,
    getAllAppointments,
    addUser,
    updateUser,
    addClinic,
    editClinic,
    getCurrentUser,
    getAllFolder,
    fetchAllGroupsByFolderId,
    addFolder,
    questionaireState,
    rand,
    createQuestionaire,
    getQuestionaire,
    patientSignUp,
    user,
    fetchAllGroups,
    fetchQuestionsAndAnswersOnly,
    updateQuestion,
    searchPatient,
    getDoctorsForApointments,
    addAppointmentOnly,
    getLinkedQuestions,
    linkedQuestions,
    addVitals,
    collectAnswer,
    getTodaysAndNonQuestainredAppointment,
    formatDate,
    formatTime,
    calculateAge,
    getCollectedQuestionnaire,
    getCollectedQuestionnaireById,
    uploadQuestionreImagesImages,
    saveDoctorChange,
    editPlatForm,
    getAllPlatForm,
    addPlatform,
    addAndUpdateSickNote,
    getSickNote,
    addAndUpdatePrescription,
    getPrescription,
    getVitalsByAppointmentId,
    getReferralByAppointmentId,
    addAndUpdateReferral,
    getReferralByReferDoctorId,
    htmlStringToPdf,
    addAndUpdateRequisition,
    getRequisitionByAppointmentId,
    getAppointmentsForVitals,
    getAppointmentsForScheduling,
    getDoctorsForScheduling,
    getOverAllDoctorAvailability,
    addDoctorAvailability,
    updateAppointment,
    getDoctorReservedAppointments,
    getAppointmentsForCare,
    getQuestionnaireFileByName,
    getAppointmentsForMeeting,
    toggleMode,
    theme,
    toggleMode,
    mode,
    updateAppointmentStatus
  };
  return (
    <MainContext.Provider value={data}>{props.children}</MainContext.Provider>
  );
};
export default Providor
export { pageLoader }