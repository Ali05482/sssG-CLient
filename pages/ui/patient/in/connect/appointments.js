
import { MDBDataTable } from 'mdbreact';
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import MainContext from '../../../../../src/app/context/context';
import FullLayout from '../../../../../src/layouts/FullLayout';
import _ from 'lodash';
const Appointments = () => {
    const global = useContext(MainContext);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchAppointments = async () => {
        try {
            const appointments = await global?.getAppointmentsForMeeting();
            if (appointments?.status) {
                setAppointments(appointments?.result?.data);
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
        fetchAppointments();

        const intervalId = setInterval(() => {
            fetchAppointments();
        }, 15000);
        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredAppointments = appointments.filter((x) =>
        x?.patient?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x?.patient?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x?.patient?.phoneNumber.includes(searchTerm)
    );
    return (
        <FullLayout>
            <div className="container">
                <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            <i className="fas fa-text-width"></i>
                            Appointments
                        </h3>
                        <div className="card-body">
                            <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="card-body">
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
                                            <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Phone Contact</b></th>
                                            <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Action</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map((x, index) => (
                                            <tr key={index}>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{index + 1}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.patient?.firstName + " " + x?.patient?.lastName}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.patient?.phoneNumber}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                                                    <a className='btn btn-success' target="_blank" href={`${x?.meeetingId}`} rel="noreferrer">
                                                        Process
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullLayout>
    );
};

export default Appointments;
