
import { MDBDataTable } from 'mdbreact';
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import _, { set } from 'lodash';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Schedules from '../doctor/Schedules';
import MainContext from '../../app/context/context';
const DoctorsListForScheduling = ({ appointmentId }) => {

    const global = useContext(MainContext);
    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [visible, setVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const fetchDoctors = async () => {
        try {
            const doctors = await global?.getDoctorsForScheduling();
            if (doctors?.status) {
                setDoctors(doctors?.result?.data);
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
    const handleDoctor = (doctor) => {
        setDoctor(doctor);
        setVisible(true);
    }
    useEffect(() => {
        fetchDoctors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Phone Contact',
                field: 'phoneContact',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Specialty',
                field: 'specialty',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 270
            }
        ],
        rows: doctors?.map(x => {
            return {
                name: x?.user?.firstName + " " + x?.user?.lastName,
                phoneContact: x?.user?.phoneNumber,
                specialty: x?.specialty,
                action: <button className='btn btn-success' onClick={() => handleDoctor(x)} >
                    Schedule
                </button>
            }
        })
    }
    const handleAppointment = async (e) => {
        e.preventDefault();
        try {
            const data = {
                doctorId: selectedDoctor,
                time: e.target?.time?.value,
                duration: e?.target?.duration.value,
                appointmentId: appointmentId
            }
            await global?.updateAppointment(data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong, contact admin",
            })
        }
    }
    const filteredAppointments = doctors.filter((x) =>
        x?.user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x?.user?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x?.user?.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x?.user?.phoneNumber.includes(searchTerm)
    );
    return (
        <>
            {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
            </div>}
            <Modal
                isOpen={visible}
                className="modal-dialog-centered"
                size="xxl"
                fullscreen
            >
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setVisible(!visible)}>
                    <h5 style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="text-center">Doctor {doctor?.user?.firstName + " " + doctor?.user?.lastName + " " + doctor?.user?.phoneNumber}</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <Schedules setSelectedDoctor={setSelectedDoctor} setVisible={setVisible} schedulingView={true} doctorId={doctor?.user?._id} />
                </ModalBody>
            </Modal>
            <div className="container">
                <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            Choose Doctor
                        </h3>
                    </div>
                    <form onSubmit={handleAppointment}>
                        <div className="card-body">
                            {selectedDoctor && <h5>Selected Doctor : {doctor?.user?.firstName + " " + doctor?.user?.lastName + " " + doctor?.user?.phoneNumber}</h5>}
                            <div className="form-group">
                                <label htmlFor="">Start Time</label>
                                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} type="time" name='time' className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Enter Duration</label>
                                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} type="number" name='duration' className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type='submit' className="btn btn-primary">
                                Assign
                            </button>
                        </div>
                    </form>
                </div>
                <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            Doctor List
                        </h3>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="">Search</label>
                                <input
                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Name or Phone Contact"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <table style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className='table'>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>#</b></th>
                                        <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Name</b></th>
                                        <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Phone</b></th>
                                        <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Specialty</b></th>
                                        <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Action</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments?.map((x, index) => (
                                        <tr key={index}>
                                            <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{index + 1}</td>
                                            <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.user?.firstName + " " + x?.user?.lastName}</td>
                                            <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.user?.phoneNumber}</td>
                                            <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.specialty}</td>
                                            <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                                                <button className='btn btn-success' onClick={() => handleDoctor(x)} >
                                                    Schedule
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorsListForScheduling;
