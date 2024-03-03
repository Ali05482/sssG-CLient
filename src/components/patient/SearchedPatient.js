import React, { useContext, useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import MainContext from '../../app/context/context'
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import Swal from 'sweetalert2';
import { Toaster } from "react-hot-toast";
const SearchedPatient = (props) => {
    const global = useContext(MainContext)
    const [appointment, setAppointment] = useState({
        patient: props?.patient?._id, clinic: global?.user?.currentUser?.clinicId, healthCard: "", date: new Date().toISOString().substr(0, 10), time: getCurrentLocalTime(),
        duration: 7, isRecuring: false, repeat: "", frequency: "", numberOfOccurences: "", appointmentMedium: "", appiontmentType: "default",
        repeat: "", doctorName: "", details: ""
    });
    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === "isRecuring") {
        } else if (name === "repeat") {
            const isValid = /^[1-9][0-9]?$|^99$/.test(value);
            setEnteredValueError(!isValid);
        } else if (name === "doctor") {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const optionText = selectedOption.innerHTML;
            setAppointment({ ...appointment, doctorName: optionText });
        }
        setAppointment({ ...appointment, [name]: value });

    };
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function getCurrentLocalTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours}:${minutes}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await global.addAppointmentOnly(appointment);
            props?.setIsModalOpen(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong',
            })
        }
    };
    useEffect(() => {
        setAppointment({ ...appointment, patient: props?.patient?._id });
    }, [props?.patient]);
    useEffect(() => {
        setAppointment({ ...appointment, clinic: global?.user?.currentUser?.clinicId });
    }, [global?.user?.currentUser?.clinicId]);
    return (
        <>
            <Modal
                isOpen={props?.isPatientSearchedModal}
                className="modal-dialog-centered"
                size="xl">
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}
                    toggle={() => props?.setIsModalOpen(!props?.isPatientSearchedModal)}>
                    <h5 className="text-center">You are making appointment for: <span className="text-success">{props?.patient?.firstName} {props?.patient?.lastName}, {props?.patient?.phoneNumber}, {props?.patient?.email}</span></h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <Toaster />
                    {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                        <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
                    </div>}
                    <div className="container">
                        <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
                            <div className="card-header">
                                <h5 className="card-title">Create Appointment</h5>
                            </div>
                            <form onSubmit={handleSubmit} >
                                <div className="card-body">
                                    <div className="d-flex justify-content-center align-items-end ">
                                        <div className={styles.radioContainer}>
                                            <div className={styles.radioGroup}>
                                                <input
                                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                    name="appointmentMedium"
                                                    type="radio"
                                                    id="video"
                                                    value="video"
                                                    checked={appointment.appointmentMedium === "video"}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="video">Video</label>
                                            </div>
                                            <div className={styles.radioGroup}>
                                                <input
                                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                    name="appointmentMedium"
                                                    type="radio"
                                                    id="phone"
                                                    value="phone"
                                                    checked={appointment.appointmentMedium === "phone"}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="phone">Phone</label>
                                            </div>
                                            <div className={styles.radioGroup}>
                                                <input
                                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                    name="appointmentMedium"
                                                    type="radio"
                                                    id="inClinic"
                                                    value="inClinic"
                                                    checked={appointment.appointmentMedium === "inClinic"}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="inClinic">In-Clinic</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-4"></div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label"><b>Select Clinic</b></label>
                                                <select
                                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                    name="clinic"
                                                    value={appointment?.clinic}
                                                    disabled
                                                    onChange={handleChange} className="form-select" id="clinic" required>
                                                    <option value={global?.user?.currentUser?.clinicId}>{global?.user?.currentUser?.clinicName}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label"><b>Select Date</b></label>
                                                <input
                                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                    onChange={handleChange}
                                                    type="date"
                                                    className="form-control"
                                                    name="date"
                                                    value={appointment.date}
                                                    id="date"
                                                    placeholder="Date Field"
                                                    min={new Date().toISOString().split("T")[0]}
                                                />
                                            </div>
                                        </div>
                                        <div className="my-2"></div>
                                        <div className="my-2"></div>
                                        <div className="col-md-6">
                                            <labe>
                                                <b>Appointment Type</b>
                                            </labe>
                                            <select
                                                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                name="appiontmentType"
                                                id="appiontmentType"
                                                value={appointment.appiontmentType}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="default">Default</option>
                                                <option value="adult">Adult</option>
                                                <option value="children">Children</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="fw-bold" htmlFor="prefixInside">
                                                Chief Complaint
                                            </label>

                                            <textarea
                                                style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                                type="text"
                                                id="prefixInside"
                                                className="form-control"
                                                name="details"
                                                value={appointment.details}
                                                onChange={handleChange}
                                                cols="10" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type='submit' className="btn btn-success">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default SearchedPatient