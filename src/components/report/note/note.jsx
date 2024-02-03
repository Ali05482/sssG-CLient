import React, { useEffect, useState, useContext } from 'react'
import dynamic from 'next/dynamic';
import MainContext from '../../../app/context/context';
import Swal from 'sweetalert2';
import { noteBuilder } from '../../../shared/report/noteBuilder';
import { summaryBuilder } from '../../../shared/report';

const Note = ({ config, appointmentId, questionnaires }) => {
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const global = useContext(MainContext);
  const [noteContent, setNoteContent] = useState(``);
  const [vitals, setVitals] = useState({});
  const [sickNote, setSickNote] = useState({});
  const [prescription, setPrescription] = useState({});
  const [loading, setLoading] = useState(false)
  const [appointmentReferral, setAppointmentReferral] = useState({
    id: "",
    wasBefore: false,
    appointmentId: "",
    previousDoctorId: "",
    referralDoctorId: "",
    patientId: "",
    data: "",
    questionnaireId: ""
  });
  const [requisition, setRequisition] = useState({
    data: "",
    wasBefore: false,
    appointmentId: "",
    id: ""
  });



  const getRequisition = async (appointmentId) => {
    try {
      const requisition = await global?.getRequisitionByAppointmentId(appointmentId);
      if (requisition?.status) {
        if (requisition?.result?.data) {
          setRequisition({
            wasBefore: true,
            appointmentId: appointmentId,
            id: requisition?.result?.data?._id,
            data: requisition?.result?.data?.data
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Fetching Requisition',
      })
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
            questionnaireId: referral?.result?.data?.questionnaireId
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Fetching SickNote',
      })
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
            endDate: sickNote?.result?.data?.endDate
          })
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Fetching SickNote',
      })
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
            data: prescription?.result?.data?.data
          })
        } else {
          setPrescription({
            wasBefore: false,
            appointmentId: appointmentId,
            id: "",
            prescriptionName: "",
            medicalInstruction: [],
            data: ""
          })
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Fetching SickNote',
      })
    }
  };
  const getVitalsByAppointmentId = async (appointmentId) => {
    try {
      const vitals = await global?.getVitalsByAppointmentId(appointmentId);
      if (vitals?.status) {
        setVitals(vitals?.result?.data)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Fetching SickNote',
      })
    }
  }
  const handleDownload = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/download-pdf', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ htmlString: noteContent }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Downloading PDF, Please try again....',
      })
    }
  };
  const handleChangeAppointmentStatus = async () => {
    try {
     await global?.updateAppointmentStatus({status:"doctorApproved"}, appointmentId);
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, While Downloading PDF, Please try again....',
      })
    }
  };
  useEffect(() => {
    getSickNote(appointmentId);
    getPrescription(appointmentId);
    getVitalsByAppointmentId(appointmentId);
    getReferral(appointmentId);
    getRequisition(appointmentId);
  }, [appointmentId]);
  useEffect(() => {
    const summary = summaryBuilder(questionnaires, global);
    setNoteContent(noteBuilder({ vitals }, sickNote?.data, prescription?.data, summary, appointmentReferral?.data, requisition?.data))
  }, [questionnaires, sickNote?.data, prescription?.data, appointmentReferral?.data,requisition?.data]);
  return (
    <>
      <button onClick={handleChangeAppointmentStatus}
        type='button'
        className='ml-2 mb-2 mt-2 btn btn-primary' >
        <i className="bi bi-arrow-down-circle "></i> Mark as Complete
        {loading && <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>}
      </button>
      <JoditEditor
        disabled={true}
        value={noteContent}
        config={config}
        tabIndex={1}
        className='text-dark bg-dark'
        onBlur={(newContent) => setNoteContent(newContent)}
      />
    </>
  )
}

export default Note