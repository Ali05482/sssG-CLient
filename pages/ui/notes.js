import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import MainContext from "../../src/app/context/context";
import { useRouter } from "next/router";
import FullLayout from '../../src/layouts/FullLayout';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from 'next/link';
import Swal from 'sweetalert2';
const Buttons = () => {
  const router = useRouter();
  const global = useContext(MainContext);
  const [questionaires, setQuestionaires] = useState([]);
  const fetchGetCollectedQuestioanire = async () => {
    try {
      const appointsments = await global?.getCollectedQuestionnaire();
      if (appointsments?.status) {
        setQuestionaires(appointsments?.result?.data);
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
    fetchGetCollectedQuestioanire();
  }, [])

  const navigator = (url)=>{
    router.push(url)
  }
  return (
    <FullLayout>
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
            <h2>Notes</h2>
          </Col>
          {questionaires?.map((x, index) => {
            return (
              <Col key={index} xs="12" md="4" className='notus'>
                <Card style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>
                  <CardTitle tag="h6" className="border-bottom p-3 mb-0 noteshead">
                    <div><h6>{x?.appointment?.patient?.firstName + " " + x?.appointment?.patient?.lastName}</h6><i className="bi bi-archive-fill"></i></div>
                    <h6>Appointment</h6>
                    <h6>{global?.formatDate(new Date(x?.createdAt)) + ",  " + global?.formatTime(x?.appointment?.time)}</h6>
                  </CardTitle>
                  <CardBody className="notesinner">
                    <div>
                      <h6> {x?.appointment?.patient?.gender}, {global?.calculateAge(x?.appointment?.patient?.dateOfBirth)} ({x?.appointment?.patient?.dateOfBirth})</h6>

                      <h6>{x?.appointment?.patient?.email}</h6>
                    </div>
                    <div className="button-group">
                      <Button onClick={()=>navigator(`./report?questionnaireId=${encodeURIComponent(x?._id)}&&appointmentId=${x?.appointment?._id}`)} color="secondary">
                        Open Note
                      </Button>

                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </FullLayout>
  );
};

export default Buttons;
