import React, { useContext } from 'react'
import FullLayout from '../../../src/layouts/FullLayout'
import Report from '../report'
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import DoctorsListForScheduling from '../../../src/components/appointment/doctorsListForScheduling';
import MainContext from '../../../src/app/context/context';

const Schedule = ({ questionnaireId, appointmentId, chiefComplaint, clinic, location, city, patient }) => {
    const appointmentLocation = location + ", " + city;
    const x = JSON.parse(patient || '');
    const patientInfo = x?.firstName + " " + x?.lastName + ', ' + x?.phoneNumber + ', ' + x?.email
    const global = useContext(MainContext);
    return (
        <>
            <FullLayout>
            {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
            </div>}
                <div className="container">
                    <div className="row">

                        <div className="col-md-16">
                            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                                <div className="card-header">
                                    <h3 style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card-title">Appointment Information</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Appointment ID</label>
                                                <input style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} type="text" className="form-control" value={appointmentId} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Chief Complaint</label>
                                                <textarea style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} className="form-control" value={chiefComplaint} readOnly></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Clinic</label>
                                                <textarea style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} className="form-control" value={clinic} readOnly></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <textarea style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} className="form-control" value={appointmentLocation} readOnly></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Patient</label>
                                                <textarea style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} className="form-control" value={patientInfo} readOnly></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-16">
                            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                                <div className="card-header">
                                    <h3 style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card-title">Available Doctors</h3>
                                </div>
                                <div className="card-body">
                                  <DoctorsListForScheduling appointmentId={appointmentId} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Schedule</h3>
                                </div>
                                <div className="card-body">
                                    <Report hideFullLayout={true} appointmentId={appointmentId} questionnaireId={questionnaireId} />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </FullLayout>
        </>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const questionnaireId = query?.questionnaireId || '';
    const appointmentId = query?.appointmentId || '';
    const chiefComplaint = query?.chiefComplaint || '';
    const clinic = query?.clinic || '';
    const location = query?.location || '';
    const city = query?.city || '';
    const patient = query?.patient || '';
    return {
        props: { questionnaireId, appointmentId, chiefComplaint, clinic, location, city, patient},
    };
}
export default Schedule