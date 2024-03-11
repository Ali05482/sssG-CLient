
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import MainContext from '../../../../../src/app/context/context';
import FullLayout from '../../../../../src/layouts/FullLayout';
import _ from 'lodash';
const CollectHistory = () => {
    const global = useContext(MainContext);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchVitals = async () => {
        try {
            const appointments = await global?.getAppointmentsForVitals();
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
        fetchVitals();
        const intervalId = setInterval(() => {
            fetchVitals();
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
                            Get Vitals
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
                                            <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Date</b></th>
                                            <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Time</b></th>
                                            <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><b>Action</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map((x, index) => (
                                            <tr key={index}>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{index + 1}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.patient?.firstName + " " + x?.patient?.lastName}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{x?.patient?.phoneNumber}</td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><strong className="text-primary">{x?.date}</strong></td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><strong className="text-danger">{global?.formatTime(x?.time)}</strong></td>
                                                <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                                                    <a className='btn btn-success' target="_blank" href={`./create-vitals?patientId=${encodeURIComponent(x?.patient?._id)}&&appointmentId=${x?._id}&&patientName=${encodeURIComponent(x?.patient?.firstName + " " + x?.patient?.lastName)}&&patientContact=${encodeURIComponent(x?.patient?.phoneNumber)}&&gender=${encodeURIComponent(x?.patient?.gender)}`} rel="noreferrer">
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

export default CollectHistory;
