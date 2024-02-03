import React, { useContext } from 'react'
import FullLayout from '../../../../../src/layouts/FullLayout'
import Report from '../../../report'
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import DoctorsListForScheduling from '../../../../../src/components/appointment/doctorsListForScheduling';
import MainContext from '../../../../../src/app/context/context';

const Schedule = ({ questionnaireId, appointmentId }) => {
    const global = useContext(MainContext);
    return (
        <>
            <FullLayout>
            {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
            </div>}
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                                <div className="card-header">
                                    <h3 style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card-title">Available Doctors</h3>
                                </div>
                                <div className="card-body">
                                  <DoctorsListForScheduling appointmentId={appointmentId} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Schedule</h3>
                                </div>
                                <div className="card-body">
                                    <Report hideFullLayout={true} appointmentId={appointmentId} questionnaireId={questionnaireId} />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </FullLayout>
        </>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const questionnaireId = query.questionnaireId || '';
    const appointmentId = query.appointmentId || '';
    return {
        props: { questionnaireId, appointmentId },
    };
}
export default Schedule