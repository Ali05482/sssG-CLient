import React, { useContext } from 'react'
import GetVitals from '../../../../../src/components/appointment/GetVitals'
import FullLayout from '../../../../../src/layouts/FullLayout';
import MainContext from '../../../../../src/app/context/context';

const CreateVitals = ({ appointmentId, patientId }) => {
    const global = useContext(MainContext);
    return (
        <>
            <FullLayout>
                <div className="container">
                    <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                        <div className="card-header">
                            <h3 className="card-title">Create Vitals</h3>
                        </div>
                        <div className="card-body">
                            <GetVitals appointmentId={appointmentId} patientId={patientId} />
                        </div>
                    </div>
                </div>
            </FullLayout >
        </>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const patientId = query?.patientId || '';
    const appointmentId = query?.appointmentId || '';
    return {
        props: { patientId, appointmentId },
    };
}
export default CreateVitals