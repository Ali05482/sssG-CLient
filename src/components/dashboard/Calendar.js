import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Appointment from "./Appointment";
import { useRouter } from "next/router";
import _ from "lodash";

const MyFullCalendar = ({ allAppointments }) => {
  const router = useRouter();
  const [questionnaireIdToRedirect, setQuestionnaireIdToRedirect] = useState(null);
  const [meetingIds, setMeetingId] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [events, setEvents] = useState([]);
  const [gridView, setGridView] = useState("dayGridMonth");
  const calendarRef = useRef(null);
  const [appointmentMedium, setAppointmentMedium] = useState({
    virtual: true,
    inClinic: true,
  });

  const handleDateSelect = (selectInfo) => {
    calendarRef.current.getApi().changeView("dayGridDay", selectInfo.startStr);
    setGridView("dayGridDay");
  };

  const handleEventClick = (clickInfo) => {
    ;
    calendarRef.current.getApi().changeView("dayGridDay", clickInfo.event.start);
    setGridView("dayGridDay");
    setSelectedEventId(clickInfo.event.id);
    const selectedId = clickInfo.event.id;
    const selected = events.find((event) => event.id === selectedId);
    setSelectedAppointment(selected);
  };

  const handleAppointmentMedium = (event) => {
    const { name, checked } = event.target;
    if (!checked) {
      setAppointmentMedium({
        ...appointmentMedium,
        [name]: false,
      });
    } else {
      setAppointmentMedium({
        ...appointmentMedium,
        [name]: true,
      });
    }
    appointmentSetter();
  };

  const appointmentSetter = () => {
    if (!allAppointments.docs) {
      return;
    }
    const filteredAppointments = allAppointments.docs.filter((item) => {
      if (
        (appointmentMedium.virtual && (item.appointmentMedium === "video" || item.appointmentMedium === "audio")) ||
        (appointmentMedium.inClinic && item.appointmentMedium === "inClinic")
      ) {
        return item;
      }
      return null;
    });

    const appointments = filteredAppointments.map((item) => {
      return {
        id: item._id,
        title: item.appointmentMedium,
        start: item.date,
        ...item,
      };
    });
    setEvents([...appointments]);
  };
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    appointmentSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAppointments, appointmentMedium]);

  function renderEventContent(eventInfo) {
    const eventApi = eventInfo.event.extendedProps;
    const appointmentMedium = eventApi.appointmentMedium;
    const appointmentTime = eventApi.time;
    const healthCard = eventApi.healthCard;
    const dateOfBirth = eventApi.patient?.dateOfBirth;
    const email = eventApi.patient?.email;
    const phoneNumber = eventApi?.patient?.phoneNumber;
    const questionnaireId = eventApi?.questionaire?._id;
    const id = eventApi?._id
    const meetingIdEvent = eventApi?.meeetingId
    if (!_.isUndefined(questionnaireId)) {
      if (!meetingIds) setMeetingId(meetingIdEvent);
      if (!questionnaireIdToRedirect) setQuestionnaireIdToRedirect(questionnaireId);
      if (!appointmentId) setAppointmentId(id);
    }
    const eventDate = new Date(eventInfo.event.start);
    const age = calculateAge(dateOfBirth, eventDate);
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const isSelected = selectedEventId === eventInfo.event.id;
    return (
      <>
        <Modal isOpen={isSelected && isModalOpen} className="modal-dialog-centered" size="xl">
          <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>
            <h5 className="text-center">Manually Add Appointment</h5>
          </ModalHeader>
          <ModalBody>
            <Appointment appointmentData={selectedAppointment} />
          </ModalBody>
        </Modal>
        <div
          data-bs-toggle="collapse"
          href={`#${eventInfo.event.id}`}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          className="p-2"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="fs-6 mb-0">{eventInfo.event.title}</p>
              <p className="fs-5 mb-0">Appointment</p>
            </div>
            <div className="d-flex">
              <div className="me-2">
                {appointmentMedium == "audio" ? (
                  <i className="bi bi-telephone-fill"></i>
                ) : null}
                {appointmentMedium == "video" ? (
                  <i className="bi bi-camera-video-fill"></i>
                ) : null}
                {appointmentMedium == "inClinic" ? (
                  <i className="bi bi-shield-fill-plus"></i>
                ) : null}
              </div>
              <div className="me-2">
                <p>{appointmentTime}</p>
              </div>
              <div>
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="collapse" id={`${eventInfo.event.id}`}> */}
        <div className=" text-dark bg-light p-2">
          {dateOfBirth && (
            <div className="d-flex align-items-center my-3">
              <i className="bi bi-credit-card-fill me-2 fs-6"></i>
              <p className=" text-dark bg-light mb-0 fs-6">
                ({dateOfBirth}) {age ? age : 0} years old
              </p>
            </div>
          )}
          <div className="d-flex align-items-center my-3">
            <i className="bi bi-credit-card-fill me-2 fs-6"></i>
            <p className=" text-dark bg-light mb-0 fs-6">
              Health Card: {healthCard}
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
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
          <div className="d-flex align-items-center my-3">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
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
              {/* <span onClick={() => navigator(`./report?questionnaireId=${encodeURIComponent(questionnaireId)}&&appointmentId=${encodeURIComponent(id)}`)}>Notes</span> */}
              <a className="text-dark" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }} target="_blank" href={`./report?questionnaireId=${encodeURIComponent(questionnaireId)}&&appointmentId=${encodeURIComponent(id)}`} rel="noreferrer">
                Notes
              </a>
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
              {/* <span onClick={() => navigator(`./report?questionnaireId=${encodeURIComponent(questionnaireId)}&&appointmentId=${encodeURIComponent(id)}&&meetingId=${encodeURIComponent(meetingIdEvent)}`)}>Open Visit</span> */}
              <a className="text-dark" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }} target="_blank" href={`./report?questionnaireId=${encodeURIComponent(questionnaireId)}&&appointmentId=${encodeURIComponent(id)}&&meetingId=${encodeURIComponent(meetingIdEvent)}`} rel="noreferrer">
                Open Visit
              </a>
            </button>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }

  return (
    <div className="demo-app">
      <div className="demo-app-main position-relative">
        {/* <div className="d-flex position-absolute" style={{ left: "293px" }}>
          <div className="me-2">
            <input
              type="checkbox"
              className="btn-check"
              id="virtual"
              name="virtual"
              autoComplete="off"
              onClick={handleAppointmentMedium}
              checked={appointmentMedium.virtual}
            />
            <label className="btn btn-outline-primary" htmlFor="virtual">
              Virtual
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="btn-check"
              id="inClinic"
              name="inClinic"
              autoComplete="off"
              onClick={handleAppointmentMedium}
              checked={appointmentMedium.inClinic}
            />
            <label className="btn btn-outline-primary" htmlFor="inClinic">
              In clinic
            </label>
          </div>
        </div> */}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            // end: "prev,title,next",
            // start: "dayGridDay,today",
            end: "",
            start: "",
          }}
          initialView={gridView}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          events={events}
          eventDisplay="inline"
          viewDidMount={(view) => {
            if (gridView !== view.view.type) {
              setGridView(view.view.type);
            }
          }}
        />
      </div>
    </div>
  );
};

export default MyFullCalendar;

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

function formatPhoneNumber(phoneNumber) {
  if (/^\d{11}$/.test(phoneNumber)) {
    const formattedNumber = `(${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(
      4
    )}`;
    return formattedNumber;
  } else {
    return "Invalid phone number format";
  }
}
