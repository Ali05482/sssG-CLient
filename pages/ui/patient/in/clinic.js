import React, { useRef, useEffect, useState, useContext } from 'react'
import FullLayout from '../../../../src/layouts/FullLayout'
import Appointment from '../../../../src/components/dashboard/Appointment'
import MainContext from '../../../../src/app/context/context'
import Swal from 'sweetalert2'
import SearchedPatient from '../../../../src/components/patient/SearchedPatient'
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
const Clinic = () => {
    const searchPatient = useRef()
    const global = useContext(MainContext);
    const [searchedPatient, setSearchedPatient] = useState({})
    const [isPatientSearchedModal, setIsModalOpen] = useState(false)
    const handleSearchPatient = async () => {
        try {
            if (_?.isEmpty(searchPatient?.current?.value)) {
                return Swal.fire({
                    icon: "warning",
                    text: "Please enter an email OR a mobile/landline number"
                })
            }
            const res = await global?.searchPatient(searchPatient?.current?.value);
            if (res?.status) {
                if (res?.result?.status) {
                    setSearchedPatient(res?.result?.data);
                    openAppointmentOnly();
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: res?.result?.msg,
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: res?.result?.msg
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something Went Wrong",
            });
        }
    };
    const openAppointmentOnly = (patientId) => {
        setIsModalOpen(true)
    };
    
    return (
        <FullLayout>
            <SearchedPatient patient={searchedPatient} setIsModalOpen={setIsModalOpen} isPatientSearchedModal={isPatientSearchedModal} />
            {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
            </div>}
            <div className="row">
                <div className="col-md-12">
                    <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                        <div className="card-header">
                            <h3 className="title">Search Patient</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="SearchPatient">Search Patient</label>
                                <input style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor}} ref={searchPatient} type="search" name="SearchPatient" id="SearchPatient" placeholder='' className="form-control" />
                                <small className='text-primary'>Search with Mobile/LandLine/ Number OR Email</small>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button onClick={handleSearchPatient} type='button' className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
                        <div className="card-header">
                            <h3 className="card-title">Direct Patient</h3>
                        </div>
                        <div className="card-body">
                            <Appointment />
                        </div>
                    </div>
                </div>
            </div>
        </FullLayout>
    );
}

export default Clinic