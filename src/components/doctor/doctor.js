import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import _ from "lodash";
import MainContext from "../../app/context/context";
import AddAndEditDoctor from "./addAndEditDoctor";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
const Doctor = () => {
    const global = useContext(MainContext);
    const [clinics, setClinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [visible, setVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({})
    const fetchClinics = async () => {
        try {
            const clinics = await global?.getAllClinics();
            if (clinics?.status) {
                setClinics(clinics?.result?.data);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Something Went Wrong, try again",
                });
            }
        } catch (error) {
            console.log("error?.message", error?.message)
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong, contact adminssss",
            });
        }
    };
    const fetchDoctors = async () => {
        try {
            const doctorData = await global?.getAllDoctorsForDoctors();
            if (doctorData?.status) {
                setDoctors(doctorData?.result?.data);
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Something Went Wrong, try again",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong, contact admin",
            });
        }
    };

    useEffect(() => {
        fetchClinics();
        fetchDoctors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
console.log("doctors",doctors)

    const filteredDoctors = doctors?.filter(
        (x) =>
            x?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x?.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x?.phoneNumber?.includes(searchTerm)
    );

    return (
        <>
            {global.pageLoader.primeReactLoader && (
                <div className={styles.overlay}>
                    <ProgressSpinner
                        style={{ width: "180px", height: "180px" }}
                        animationDuration=".5s"
                    />
                </div>
            )}
            <Modal
                isOpen={visible}
                className="modal-dialog-centered"
                size="xxl"
                fullscreen
            >
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setVisible(!visible)}>
                    <h5 style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className="text-center">Doctor {selectedDoctor?.firstName + " " + selectedDoctor?.lastName + " " + selectedDoctor?.phoneNumber}</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <AddAndEditDoctor clinics={clinics} mode="edit" doctorToLoad={selectedDoctor} />
                </ModalBody>
            </Modal>
            <div className="container">
                <AddAndEditDoctor clinics={clinics} mode="create" />
                <div
                    style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                    }}
                    className="card"
                >
                    <div className="card-header">
                        <h3 className="card-title">Doctor List</h3>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="">Search</label>
                                <input
                                    style={{
                                        backgroundColor: global?.theme?.backgroundColor,
                                        color: global?.theme?.inputColor,
                                    }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Name or Phone Contact"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <table
                                style={{
                                    backgroundColor: global?.theme?.backgroundColor,
                                    color: global?.theme?.color,
                                }}
                                className="table"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>#</b>
                                        </th>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>Name</b>
                                        </th>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>Phone</b>
                                        </th>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>Clinic</b>
                                        </th>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>Specialty</b>
                                        </th>
                                        <th
                                            style={{
                                                backgroundColor: global?.theme?.backgroundColor,
                                                color: global?.theme?.inputColor,
                                            }}
                                        >
                                            <b>Action</b>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDoctors?.map((x, index) => (
                                        <tr key={index}>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                {index + 1}
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                {x?.firstName + " " + x?.lastName}
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                {x?.phoneNumber}
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                {x?.clinicId?.name + ", " + x?.clinicId?.location}
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                {x?.doctor?.specialty}
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: global?.theme?.backgroundColor,
                                                    color: global?.theme?.inputColor,
                                                }}
                                            >
                                                <button onClick={()=> {setSelectedDoctor(x); setVisible(true)}} className="btn btn-success">Edit</button>
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

export default Doctor;
