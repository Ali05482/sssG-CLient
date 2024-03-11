import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import MainContext from '../../../app/context/context';

const EditAppointment = ({ appointment, setIsEditAppointment, getAppointmentForManagement, skipDate, filter }) => {

  const global = useContext(MainContext);
   console.log("filter", filter)
  const [patients, setPatients] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    patient: appointment?.patientInfo?._id,
    doctor: appointment?.doctorInfo?._id,
    appiontmentType: appointment?.appiontmentType,
    clinic: appointment?.clinicInfo?._id,
    healthCard: appointment?.healthCard,
    date: appointment?.date,
    time: appointment?.time,
    duration: appointment?.duration,
    details: appointment?.details,
    meeetingId: appointment?.meeetingId,
    status: appointment?.status,
  });

  const fetchPatients = async () => {
    try {
      const patientsData = await global?.fetchPatients();
      if (patientsData?.status) {
        setPatients(patientsData?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        })
      }
    } catch (error) {
      console.log("error?.message", error?.message)
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })
    }
  };

  const fetchClinics = async () => {
    try {
      const clinics = await global?.getAllClinics();
      if (clinics?.status) {
        setClinics(clinics?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      });
    }
  };

  const fetchDoctors = async () => {
    try {
      const doctorData = await global?.getAllDoctorsForDoctors();
      if (doctorData?.status) {
        setDoctors(doctorData?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      });
    }
  };

  const handleOnChange = (e) => {
    setUpdatedAppointment({
      ...updatedAppointment,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setUpdatedAppointment({
      _id: appointment?._id,
      patient: appointment?.patientInfo?._id,
      doctor: appointment?.doctorInfo?._id,
      appiontmentType: appointment?.appiontmentType,
      clinic: appointment?.clinicInfo?._id,
      healthCard: appointment?.healthCard,
      date: appointment?.date,
      time: appointment?.time,
      duration: appointment?.duration,
      details: appointment?.details,
      meeetingId: appointment?.meeetingId,
      status: appointment?.status,
    });
  }, [appointment?.patient, appointment?.doctor, appointment?.appiontmentType, appointment?.healthCard, appointment?.date, appointment?.time, appointment?.duration, appointment?.details, appointment?.meeetingId]);

  const handleEditAppointment = async () => {
    try {
      await global?.editAppointment(updatedAppointment, updatedAppointment?._id);
      setIsEditAppointment(false);
      await getAppointmentForManagement("all", filter?.keyword, filter?.fromDate, filter?.toDate, skipDate);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      });
    }
  };

  useEffect(() => {
    fetchClinics();
    fetchPatients();
    fetchDoctors();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
        <div className="card-header">
          <h6 className="card-title">{appointment?.appointmentUniqueId}</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label>Patient</label>
                <select style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="patient" id="patient" value={updatedAppointment?.patient} className="form-control">
                  {patients?.map((patient, index) => (
                    <option key={index} value={patient?._id}>{patient?.firstName} {patient?.lastName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Doctor</label>
                <select style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="doctor" id="doctor" value={updatedAppointment?.doctor} className="form-control">
                  {doctors?.map((doctor, index) => (
                    <option key={index} value={doctor?._id}>{doctor?.firstName} {doctor?.lastName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Clinic</label>
                <select style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="doctor" id="doctor" value={updatedAppointment?.clinic} className="form-control">
                  {clinics?.map((clinic, index) => (
                    <option key={index} value={clinic?._id}>{clinic?.name}, {clinic?.city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Appointment Type</label>
                <select style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="appiontmentType" id="appiontmentType" value={updatedAppointment?.appiontmentType} className="form-control">
                  <option value="default">Default</option>
                  <option value="adult">Adult</option>
                  <option value="children">Children</option>
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Appointment Status</label>
                <select style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="status" id="status" value={updatedAppointment?.status} className="form-control">
                  <option value="pending">In-Progress</option>
                  <option value="doctorApproved">Complete</option>
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Health Card</label>
                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} type="text" name='healthCard' id='healthCard' value={updatedAppointment?.healthCard} className="form-control" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Date</label>
                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} type="date" name='date' id='date' value={updatedAppointment?.date} className="form-control" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Time</label>
                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} type="time" name='time' id='time' value={updatedAppointment?.time} className="form-control" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Duration</label>
                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} type="number" name='duration' id='duration' value={updatedAppointment?.duration} className="form-control" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label>Meeting Id</label>
                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} type="text" name='meeetingId' id='meeetingId' value={updatedAppointment?.meeetingId} className="form-control" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Details</label>
                <textarea className='form-control' style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={handleOnChange} name="details" id="details" value={updatedAppointment?.details} cols="60" rows="1">{updatedAppointment?.details}</textarea>
              </div>
            </div>
          </div>
          <div className="col-md-3 my-2">
            <button onClick={handleEditAppointment} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditAppointment