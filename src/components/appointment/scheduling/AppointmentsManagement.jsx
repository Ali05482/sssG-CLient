import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import Swal from 'sweetalert2';
import MainContext from '../../../app/context/context';
import EditAppointment from './EditAppointment';
import _ from 'lodash';

const AppointmentsManagement = () => {
  const global = useContext(MainContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [questionaires, setQuestionaires] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [appointment, setAppointment] = useState({});
  const [skipDate, setSkipDate] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);

  const [filter, setFilter] = useState({
    type: "all",
    keyword: "",
    fromDate: "",
    toDate: ""
  });

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getAppointmentForManagement = async (type, keyword, fromDate, toDate, skipDate = false) => {
    try {
      const appointsments = await global?.getAppointmentForManagement(type, keyword, fromDate, toDate, skipDate);
      if (appointsments?.status) {
        setQuestionaires(appointsments?.result?.data);
        setDoctorDetails(appointsments?.result?.doctorDetails);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })
    }
  };

  const handleEditAppointment = (appointment) => {
    setAppointment(appointment);
    setEditAppointment(true);
  };

  useEffect(() => {
    getAppointmentForManagement();
  }, []);

  const navigator = (url) => {
    window.open(url, '_blank');
  };

  const filteredAppointments = questionaires?.filter((x) =>
    x?.patientInfo?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    x?.patientInfo?.lastName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    x?.patientInfo?.phoneNumber?.includes(searchTerm) ||
    x?.patientInfo?.dateOfBirth?.includes(searchTerm) ||
    x?.date?.includes(searchTerm)
  );

  return (
    <>
      {global.pageLoader.primeReactLoader && (
        <div className={styles.overlay}>
          <ProgressSpinner
            style={{ width: "180px", height: "180px" }}
            animationDuration=".5s"
          />
        </div>
      )}
      <Modal
        isOpen={editAppointment}
        className="modal-dialog-centered"
        fullscreen
        size="xxl"
      >
        {global.pageLoader.primeReactLoader && (
          <div className={styles.overlay}>
            <ProgressSpinner
              style={{ width: "180px", height: "180px" }}
              animationDuration=".5s"
            />
          </div>
        )}
        <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setEditAppointment(false)}>
          <h5 className="text-center">Update Appointment</h5>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
          <EditAppointment appointment={appointment} setIsEditAppointment={setEditAppointment} getAppointmentForManagement={getAppointmentForManagement} skipDate={skipDate} filter={filter} />
        </ModalBody>
      </Modal>

      <div style={{
        backgroundColor: global?.theme?.backgroundColor,
        color: global?.theme?.color,
      }} className="card">
        <div className="card-header">
          <h3 className="title">
            Appointments Management
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="">Keyword</label>
              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                type="text"
                className="form-control"
                name='keyword'
                placeholder="Search by Name or Phone Contact"
                onChange={onChangeFilter}
              />
              <span className='text-primary'>Email / Phone# / Cnic / ID</span>
            </div>
            <div className="col-md-3">
              <label htmlFor="">Start Date</label>
              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                type="date"
                name='fromDate'
                className="form-control"
                onChange={onChangeFilter}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="">End Date</label>
              <input
                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                type="date"
                name='toDate'
                className="form-control"
                onChange={onChangeFilter}
              />
            </div>

            <div className="col-md-4 my-2 mx-2">
              <div className="form-check">
                <input value={skipDate} onChange={() => setSkipDate(!skipDate)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Skip Date</label>
              </div>
              {((_?.isEmpty(filter?.fromDate)) && (_?.isEmpty(filter?.toDate))) && <div className='text-primary'>By default last two appointment filter is applied</div>}
              <button
                className="btn btn-primary"
                onClick={() => getAppointmentForManagement((((!_?.isEmpty(filter?.fromDate)) && (!_?.isEmpty(filter?.toDate))) ? "date" : "all"), filter?.keyword, filter?.fromDate, filter?.toDate, skipDate)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <Row>

        <Col xs="12" md="12">
          <div className="mb-3">
            <label htmlFor="">Search</label>
            <input
              style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
              type="text"
              className="form-control"
              placeholder="Search by Name or Phone Contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
        </Col>

        {filteredAppointments?.map((x, index) => {
          return (
            <Col key={index} xs="12" md="4" className='notus'>
              <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0 noteshead">
                  <div><h6>{x?.patientInfo?.firstName + " " + x?.patientInfo?.lastName}</h6></div>
                  <div><h6>Created By <span className='text-primary'>{x?.userInfo?.firstName + " " + x?.userInfo?.lastName} from {x?.clinicInfo?.name}, {x?.clinicInfo?.city} </span></h6></div>
                  <h6>{x?.doctorInfo?.firstName + " " + x?.doctorInfo?.lastName}, ({doctorDetails?.find(y => y?.user?.toString() == x?.doctorInfo?._id)?.specialty}) </h6>
                  <h6>{x?.date + ",  " + global?.formatTime(x?.time)}</h6>
                  <h6>Status: {x?.status == "doctorApproved" ? <span className='text-success'>Completed</span> : <span className='text-danger'>In-Progress</span>}</h6>
                </CardTitle>
                <CardBody className="notesinner">
                  <div>
                    <h6> {x?.patientInfo?.gender}, {global?.calculateAge(x?.patientInfo?.dateOfBirth)} ({x?.patientInfo?.dateOfBirth})</h6>
                    <h6>{x?.patientInfo?.email}</h6>
                  </div>
                  <div className="button-group">
                    <Button onClick={() => navigator(`../report?questionnaireId=${encodeURIComponent(x?._id)}&&appointmentId=${x?._id}&&isRecordView=true`)} color="secondary">
                      Open Note
                    </Button>
                    <Button onClick={() => handleEditAppointment(x)} color="secondary">
                      Edit
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        })}
        {filteredAppointments?.length < 1 && <>
          <h3 className='card-title'>No Previous Appointment Found</h3>
        </>}
      </Row>

    </>
  );
};

export default AppointmentsManagement;
