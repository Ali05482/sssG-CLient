import { useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Appointment from "../../src/components/dashboard/Appointment";
import MainContext from "../../src/app/context/context";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function DailyAppointment({ appointment }) {
  console.log("appointment?.isLive", appointment?.isLive);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointmentDate = new Date(appointment?.date);
  const age = calculateAge(appointment?.patient?.dateOfBirth, appointmentDate);
  const formattedPhoneNumber = appointment?.patient?.phoneNumber
  const startMeeting = async (url) => {
    try {
      await global?.updateInConnectionForAppointment({ type: "inConnection", appointmentId: appointment?._id });
      window.open(url, "_blank");
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong! But can can still Force Join Meeting!',
        icon: 'error',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Force Join Meeting",
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
          navigator(url)
        }
      })

    }
  }
  const navigator = (url) => {
    window.open(url, "_blank");
  }
  const global = useContext(MainContext);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalHeader
          toggle={() =>
            setIsModalOpen(!isModalOpen)
          }
        >
          <h5 className="text-center">Manually Add Appointment</h5>
        </ModalHeader>
        <ModalBody>
          <Appointment appointmentData={appointment} />
        </ModalBody>
      </Modal>
      <div
        data-bs-toggle="collapse"
        href={`#${appointment?._id + 999}`}
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        className="p-2 text-light"
        style={{ background: "#3788d8", borderBottom: "1px solid white", borderRadius: "4px" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fs-6 mb-0">{appointment?.patient && appointment?.patient?.firstName + " " + appointment?.patient?.lastName}</p>
            <p className="fs-5 mb-0">Appointment</p>
          </div>
          <div className="d-flex">
            <div className="me-2">
              {appointment?.appointmentMedium == "audio" ? (
                <i className="bi bi-telephone-fill"></i>
              ) : null}
              {appointment?.appointmentMedium == "video" ? (
                <i className="bi bi-camera-video-fill"></i>
              ) : null}
              {appointment?.appointmentMedium == "inClinic" ? (
                <i className="bi bi-shield-fill-plus"></i>
              ) : null}
            </div>
            <div className="me-2">
              <p>{global?.formatTime(appointment?.time)}</p>
            </div>
            {appointment?.isLive && <div className="me-2">
              <span className="text-danger"><b>Live</b></span>
            </div>}
            <div>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse" id={`${appointment?._id + 999}`}>
        <div className=" text-dark bg-light p-2">
          {appointment?.patient?.dateOfBirth && (
            <div className="d-flex align-items-center my-3">
              <i className="bi bi-credit-card-fill me-2 fs-6"></i>
              <p className=" text-dark bg-light mb-0 fs-6">
                ({appointment?.patient?.dateOfBirth}) {age ? age : 0} years old
              </p>
            </div>
          )}
          <div className="d-flex align-items-center my-3">
            <i className="bi bi-credit-card-fill me-2 fs-6"></i>
            <p className=" text-dark bg-light mb-0 fs-6">
              Health Card: {appointment?.healthCard}
            </p>
          </div>
          <div className="d-flex align-items-center my-3">
            <i className="bi bi-telephone-fill me-2 fs-6"></i>
            <p className=" text-dark bg-light mb-0 fs-6">
              {formattedPhoneNumber}
            </p>
          </div>
          <div className="d-flex align-items-center my-3">
            <i className="bi bi-envelope-fill me-2 fs-6"></i>
            <p className="text-dark bg-light mb-0 fs-6">
              <a href={`mailto:${appointment?.patient?.email}`}>
                {appointment?.patient?.email}
              </a>
            </p>
          </div>
          <div className="d-flex align-items-center my-3">
            <button
              onClick={() =>
                setIsModalOpen(!isModalOpen)
              }
              type="button"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-calendar-check-fill me-2 fs-6"></i>{" "}
              <span>Follow-Up Appointment</span>
            </button>
          </div>
          <hr />
          <div className="d-flex align-items-center my-3 d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-calendar-check-fill me-2 fs-6"></i>
              <span>Reschedule</span>
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-sticky-fill me-2 fs-6"></i>
              <span onClick={() => navigator(`./report?questionnaireId=${encodeURIComponent(appointment?.questionaire?._id)}&&appointmentId=${encodeURIComponent(appointment?._id)}`)}>Notes</span>
            </button>
          </div>
          <hr />
          <div className="d-flex align-items-center my-3 d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-x-circle-fill me-2 fs-6"></i>
              <span>Cancel</span>
            </button>
            <button type="button" className="btn btn btn-primary">
              <i className="bi bi-laptop me-2 fs-6"></i>
              <span onClick={() => startMeeting(`./report?questionnaireId=${encodeURIComponent(appointment?.questionaire?._id)}&&appointmentId=${encodeURIComponent(appointment?._id)}&&meetingId=${encodeURIComponent(appointment?.meeetingId)}`)}>Open Visit</span>              </button>
          </div>
        </div>
      </div>
    </>
  );
}

function calculateAge(dateOfBirth, eventDate) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date(eventDate);
  const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}

// function formatPhoneNumber(phoneNumber) {
//   if (/^\d{11}$/.test(phoneNumber)) {
//     const formattedNumber = `(${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(
//       4
//     )}`;
//     return formattedNumber;
//   } else {
//     return "Invalid phone number format";
//   }
// }