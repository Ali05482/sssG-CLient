import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import MainContext from "../../src/app/context/context";
import { useRouter } from "next/router";
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import Swal from 'sweetalert2';
const Notes = ({ questionnaires }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [updateQuestionnaires, setUpdatedQuestionnaires] =
    useState(questionnaires);
  const router = useRouter();
  const global = useContext(MainContext);
  const [questionaires, setQuestionaires] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  useEffect(() => {
    setUpdatedQuestionnaires(questionnaires)
  }, [questionnaires])
  const fetchGetCollectedQuestioanire = async (patientId) => {
    try {
      const appointsments = await global?.getNotesByDoctorId(patientId);
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
  }
  useEffect(() => {
    if (!_?.isUndefined(updateQuestionnaires?.appointment?.patient?._id)) {
      fetchGetCollectedQuestioanire(updateQuestionnaires?.appointment?.patient?._id);
    }
  }, [updateQuestionnaires?.appointment?.patient?._id])

  const navigator = (url) => {
    window.open(url, '_blank');
  }
  const filteredAppointments = questionaires?.filter((x) =>
    x?.patient?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    x?.patient?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    x?.patient?.phoneNumber.includes(searchTerm) ||
    x?.patient?.dateOfBirth.includes(searchTerm) ||
    x?.date?.includes(searchTerm) ||
    x?.patient?.email.includes(searchTerm)
  );
  console.log('doctorDetails===>', doctorDetails)
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
      <div>
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
          <Col xs="12" md="12">
            <h2>Medical History: {updateQuestionnaires?.appointment?.patient?.firstName + "  " + updateQuestionnaires?.appointment?.patient?.lastName}</h2>
          </Col>
          {filteredAppointments?.map((x, index) => {
            return (
              <Col key={index} xs="12" md="4" className='notus'>
                <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0 noteshead">
                    <div><h6>{x?.patient?.firstName + " " + x?.patient?.lastName}</h6></div>
                    <div><h6>Created By <span className='text-primary'>{x?.user?.firstName + " " + x?.user?.lastName} from {x?.clinic?.name}, {x?.clinic?.city} </span></h6></div>
                    <h6>{x?.doctor?.firstName + " " + x?.doctor?.lastName}, ({doctorDetails?.find(y => y?.user?.toString() == x?.doctor?._id)?.specialty}) </h6>
                    <h6>{x?.date + ",  " + global?.formatTime(x?.time)}</h6>
                    <h6>Status: {x?.status == "doctorApproved" ? <span className='text-success'>Completed</span> : <span className='text-danger'>In-Progress</span>}</h6>
                  </CardTitle>
                  <CardBody className="notesinner">
                    <div>
                      <h6> {x?.patient?.gender}, {global?.calculateAge(x?.patient?.dateOfBirth)} ({x?.patient?.dateOfBirth})</h6>
                      <h6>{x?.patient?.email}</h6>
                    </div>
                    <div className="button-group">
                      <Button onClick={() => navigator(`./report?questionnaireId=${encodeURIComponent(x?._id)}&&appointmentId=${x?._id}&&isRecordView=true`)} color="secondary">
                        Open Note
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          })}z
          {filteredAppointments?.length < 1 && <>
            <h3 className='card-title'>No Previous Appointment Found</h3>
          </>}
        </Row>
      </div>
    </>
  );
};

export default Notes;
