import React, { useContext, useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import MainContext from '../../app/context/context'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField } from '@mui/material'
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import SelectQuestionaire from '../questionaire/SelectQuestionaire';
import Swal from 'sweetalert2';
import toast, { Toaster } from "react-hot-toast";
const SearchedPatient = (props) => {
    const global = useContext(MainContext)
    const [totalDoctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [groups, setGruops] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(false);
    const [questionGroup, setQuestionGroup] = useState({})
    const [appointment, setAppointment] = useState({
        patient: props?.patient?._id, clinic: "", healthCard: "", date: new Date().toISOString().substr(0, 10), time: getCurrentLocalTime(),
        duration: 7, isRecuring: false, repeat: "", frequency: "", numberOfOccurences: "", appointmentMedium: "", appiontmentType: "default",
        repeat: "", doctorName: ""
    });
    const [isVitalModelOpen, setIsVitalModalOpen] = useState(false);
    const [isVitalTogglerActive, setIsVitalTogglerActive] = useState(false);
    const [createdAppointment, setCreatedAppointment] = useState({
        appointmentId: '',
        patientId: '',
        doctorId: ''
    })
    const fetchClinics = async () => {
        try {
            const allClinics = await global.getAllClinics();
            if (allClinics.status) {
                setAppointment({ ...appointment, clinic: allClinics.result.data.docs[0]?._id })
                setClinics(allClinics.result.data.docs)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, While Fetching Doctors',
            })
        }
    };
    const fetchAllGroups = async () => {
        try {
            const result = await global.fetchAllGroups();
            if (result?.status && result?.result?.status) {
                setGruops(result.result.data);
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, While Fetching Questionaire',
            })
        }
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const searchQuetion = (e) => {
        const { value } = event.target;
        setSearchTerm(value);

        const filteredGroups = groups.filter((group) =>
            group.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredGroups(filteredGroups);
    };
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
    const fetchAvailableDoctors = async () => {
        try {
            const selectedDate = appointment.date;
            const date = new Date(selectedDate);
            const dayOfWeek = date.getDay();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayName = daysOfWeek[dayOfWeek];
            dayName = dayName?.toString().toLocaleLowerCase();
            const time = appointment?.time;
            const doctors = await global.getDoctorsForApointments(dayName, time, appointment.clinic, appointment.duration, appointment.date);
            if (doctors.status) {
                if (doctors?.result?.data?.length > 0) {
                    toast.success("Doctors are available for this time period.");
                } else {
                    toast.error("Doctors are un-available for this time period.");
                }
                setDoctors(doctors?.result.data);
            }
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrongggg!',
            })
        }
    };
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const convertToAMPM = (time) => {
        if (typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
            throw new Error('Invalid time format. Please provide time in the format HH:MM (24-hour time).');
        }

        const [hours, minutes] = time.split(':').map(Number);

        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error('Invalid time. Hours should be between 0-23 and minutes should be between 0-59.');
        }

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = String(minutes).padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${ampm}`;
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
            await global.addAppointmentOnly(appointment)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong',
            })
        }
    };
    const handleVitalCollection = () => {
        setIsVitalModalOpen(!isVitalModelOpen)
    };
    const handleVitalToggler = (event) => {
        setIsVitalTogglerActive(event.target.checked);
    };
    useEffect(() => {
        // fetchAvailableDoctors();
    }, [clinics]);
    useEffect(() => {
        // fetchDoctors();
        fetchClinics();
        fetchAllGroups();
    }, []);
    useEffect(() => {
        setAppointment({ ...appointment, patient: props?.patient?._id });
    }, [props?.patient]);
    return (
        <>
            <Modal
                isOpen={props?.isPatientSearchedModal}
                className="modal-dialog-centered"
                size="xl"
            >
                <ModalHeader style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color }}
                  toggle={() => props?.setIsModalOpen(!props?.isPatientSearchedModal)}>
                    <h5 className="text-center">You are making appointment for: <span className="text-success">{props?.patient?.firstName} {props?.patient?.lastName}, {props?.patient?.phoneNumber}, {props?.patient?.email}</span></h5>
                </ModalHeader>
                <ModalBody style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color }}>
                    <Toaster />
                    {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                        <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
                    </div>}
                    <div className="container">
                        <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color }} className="card">
                            <div className="card-header">
                                <h5 className="card-title">Create Appointment</h5>
                                {/* <button type='button' className="btn btn-secondary">Search Doctor</button> */}
                            </div>
                            <form onSubmit={handleSubmit} >
                                <div className="card-body">
                                    <div className="d-flex justify-content-center align-items-end ">
                                        <div className={styles.radioContainer}>
                                            <div className={styles.radioGroup}>
                                                <input
                                                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
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
                                                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
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
                                                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
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
                                                <lable className="form-label"><b>Select Clinic</b></lable>
                                                <select
                                                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
                                                    name="clinic"
                                                    value={appointment.clinic}
                                                    onChange={handleChange} className="form-select" id="clinic" required>
                                                    {clinics && clinics?.map((item, index) => {
                                                        const isSelected = item._id === global?.user?.currentUser?.clinicId;
                                                        return (
                                                            <option key={index} value={item?._id} selected={isSelected ? 'selected' : null}>
                                                                {item?.name}, {item?.location}
                                                            </option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <lable className="form-label"><b>Select Date</b></lable>
                                                <input
                                                style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
                                                    onChange={handleChange}
                                                    type="date"
                                                    className="form-control"
                                                    name="date"
                                                    value={appointment.date}
                                                    id="date"
                                                    placeholder="Date Field"
                                                    min={getCurrentDate}
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
                                            style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.inputColor }}
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