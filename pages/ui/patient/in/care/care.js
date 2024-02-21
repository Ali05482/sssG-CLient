import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../../../../src/app/context/context';
import FullLayout from '../../../../../src/layouts/FullLayout';
import Documents from '../../../../../src/components/report/documents/documents';

const Care = ({ questionnaireId, appointmentId, patientName, patientContact, gender }) => {
    const global = useContext(MainContext)
    const [questionnaires, setQuestionnaires] = useState({});
    const [config, setConfig] = useState({
        readonly: true,
        placeholder: 'Start typing...',
    });
    const fetchGetCollectedQuestionnaire = async (questionnaireId) => {
        try {
            const fetchedQuestionnaire = await global?.getCollectedQuestionnaireById(questionnaireId);
            if (fetchedQuestionnaire?.status) {
                setQuestionnaires(fetchedQuestionnaire?.result?.data);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Something Went Wrong, try again",
                })
            }
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong, contact admin",
            })
        }
    };
    const handleChangeAppointmentStatus = async () => {
        try {
            await global?.updateAppointmentStatus({ status: "doctorApproved" }, appointmentId);
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
        setConfig({
            readonly: false,
            placeholder: 'Start typing...',
        });
        fetchGetCollectedQuestionnaire(questionnaireId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionnaireId]);
    return (
        <>
            <FullLayout>
                <div className="container">
                    <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={() => {
                                    handleChangeAppointmentStatus()
                                }}
                                type="button"
                                className="btn btn-success my-3"
                            >
                                Mark As Complete
                            </button>
                        </div>
                        <div className="card-header">
                            <h5 className="card-title">
                                Patient Name: <b>{gender == "male" ? "Mr. " : "Mrs. "} {patientName}</b>

                            </h5>
                            <h5 className="card-title">
                                Patient Contact: <b>{patientContact}</b>

                            </h5>
                        </div>
                        <div className="card-body">
                            <Documents
                                care={true}
                                appointmentId={appointmentId}
                                questionnaireId={questionnaireId}
                                questionnaires={questionnaires}
                                config={config}
                            />
                        </div>
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
    const patientName = query?.patientName || '';
    const patientContact = query?.patientContact || '';
    const gender = query?.gender || '';
    return {
        props: { questionnaireId, appointmentId, patientName, patientContact, gender },
    };
}
export default Care