
import MainContext from "../../../src/app/context/context";
import React, { useContext, useEffect } from "react";
import FullLayout from "../../../src/layouts/FullLayout";
import { useState } from "react";
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import Swal from "sweetalert2";
import { ErrorMessage, Field, Form, Formik } from "formik";


const Platform = ({platform}) => {
  const global = useContext(MainContext);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
  const [newPlatFormAddition, setNewPlatFormAddition] = useState(false)
  const [platformData, setPlatformData] = useState({
    name: "", phoneNumber: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlatformData({ ...platformData, [name]: value })
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await global.addPlatform(platformData);
      setNewPlatFormAddition(!newPlatFormAddition);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Something Went Wrong" })
    }
  };
  const getAllPlatForms = async () => {
    try {
      const platforms = await global.getAllPlatForm();
      if (platforms?.status) {
        setPlatforms(platforms?.result?.data)
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "SOmething Went Wrong, Whole Fetching Plattforms" })
    }
  };
  useEffect(() => {
    getAllPlatForms()
  }, [newPlatFormAddition])

  const handleSubmitAddUser = async (values) => {
    try {
      const copiedData = {...values, platformId: selectedPlatformId}
      copiedData.other = {
        speciality: values?.speciality,
        availability: values?.availability,
        hospitalLocaltion: values?.hospitalLocaltion,
        hospitalName: values?.hospitalName,
        biography: values?.biography,
        details:values?.details
      }
      await global.addUser(copiedData);
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'Something Went Wrong',
       })
     }
  }

  return (
    <>
      <FullLayout>
        {global.pageLoader.primeReactLoader && (
          <div className={styles.overlay}>
            <ProgressSpinner
              style={{ width: "180px", height: "180px" }}
              animationDuration=".5s"
            />
          </div>
        )}
        <div className="conatiner">
          <div className="wrapper">
            <div className="content">
              <form action="" onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="title">Add New Platform</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="">Enter Platform Name</label>
                      <input value={platformData.name} type="text" onChange={handleChange} name="name" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Land Line Number</label>
                      <input value={platformData.phoneNumber} onChange={handleChange} type="text" name="phoneNumber" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">Upload Platform Profile Image</label>
                      <input onChange={handleChange} className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className="card my-4">
                <div className="card-header">
                  <h3 className="title">Platforms</h3>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Profile</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platforms?.map((x,index) => (
                        <tr key={index}>
                          <td>{x?.name}</td>
                          <td>{x?.phoneNumber}</td>
                          <td><span className={x?.status ? "text-success" : "text-danger"}>{x?.status ? "Active" : "Suspended"}</span></td>
                          <td>
                            <div className="d-flex flex-row flex-nowrap">
                              <div className="img img-responsive">
                                <img className="rounded-circle" width={50} height={50} src={x?.profile} alt="" />
                              </div>
                            </div>
                          </td>
                          <td><button type="button" onClick={() => setSelectedPlatformId(x._id)} className="btn btn-secondary" data-bs-toggle="modal"
                            data-bs-target="#addUserModal" >Create Credentials</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Add User Modal */}
              <div
                className="modal fade modal-lg"
                id="addUserModal"
                data-bs-backdrop="static"
                data-bs-keyboard={false}
                tabIndex="-1"
                aria-labelledby="addUserModalLabel"
                aria-hidden={true}
              >
         {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
              </div>}
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="staticBackdropLabel">
                New User
              </h1>

              <button
                onClick={() => {}}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik 
                initialValues={{ firstName: "", lastName: "", email: "", password: "", dateOfBirth: "", phoneNumber: "", gender: "", role: ""}}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstName) {
                    errors.firstName = "Required";
                  }
                  if (!values.lastName) {
                    errors.lastName = "Required";
                  }
                  if (!values.email) {
                    errors.email = "Email is Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "Password is required!";
                  }
                  if (!values.dateOfBirth) {
                    errors.dateOfBirth = "DOB is required!";
                  }
                  if (!values.phoneNumber) {
                    errors.phoneNumber = "Phone number is required!";
                  }
                  if (!values.gender) {
                    errors.gender = "Gender is required!";
                  }
                  if (!values.role) {
                    errors.role = "Role is required!";
                  }
                  if(values.role === "doctor"){
                    if(!values.hospitalName)
                    errors.hospitalName = "Hospital Name is required!";
                  }
                  if(values.role === "patient"){
                    if(!values.patientHistory)
                    errors.patientHistory = "Patient History is required!";
                  }
                  return errors;
                }}
                onSubmit={handleSubmitAddUser}>
                  {({values}) => (
                    <Form>
                      <div className="mb-2">
                        <Field type="text" className="form-control" name="firstName" placeholder="Enter first name" />
                        <ErrorMessage name="firstName" render={() => <div className="text-danger">Firstname is required!</div>} />
                      </div>
                      <div className="mb-2">
                        <Field type="text" className="form-control" name="lastName" placeholder="Enter last name" />
                        <ErrorMessage name="lastName" render={() => <div className="text-danger">Lastname is required!</div>} />
                      </div>
                      <div className="mb-2">
                        <Field type="email" className="form-control" name="email" placeholder="Enter address" />
                        <ErrorMessage name="email" className="text-danger" component="div" />
                      </div>
                      <div className="mb-2">
                        <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                        <ErrorMessage className="text-danger" name="password" component="div" />
                      </div>
                      <div className="mb-2">
                        <Field type="date" name="dateOfBirth" placeholder="Enter date of birth" className="form-control" />
                        <ErrorMessage className="text-danger" name="dateOfBirth" component="div" />
                      </div>
                      <div className="mb-2">
                        <Field type="tel" name="phoneNumber" placeholder="Enter phone number" className="form-control" />
                        <ErrorMessage className="text-danger" name="dateOfBirth" component="div" />
                      </div>
                      <div id="my-radio-group">Gender</div>
                      <div role="group" className="mb-2" aria-labelledby="my-radio-group">
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="gender" value="male" />
                          Male
                        </label>
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="gender" value="female" />
                          Female
                        </label>
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="gender" value="other" />
                          Other
                        </label>
                        <ErrorMessage className="text-danger" name="gender" component="div" />
                      </div>
                      <div id="my-radio-group">Role</div>
                      <div role="group" className="mb-2" aria-labelledby="my-radio-group">
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="role" value="admin" />
                          Admin
                        </label>
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="role" value="doctor" />
                          Doctor
                        </label>
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="role" value="patient" />
                          Patient
                        </label>
                        <label className="me-2">
                          <Field type="radio" className="form-check-input me-2" name="role" value="user" />
                          User
                        </label>
                        <ErrorMessage className="text-danger" name="role" component="div" />
                      </div>
                      {values.role === "doctor" && (
                        <div className="col-12 row g-3 mb-2">
                          <div className="col-12">
                            <Field
                              type="text"
                              name="speciality"
                              id="speciality"
                              className="form-control p-3"
                              placeholder="Speciality"
                            />
                            <ErrorMessage className="text-danger" name="speciality" component="div" />
                          </div>
                          <div className="col-12">
                            <Field
                              type="text"
                              name="availability"
                              id="availability"
                              className="form-control p-3"
                              placeholder="Availability"
                            />
                            <ErrorMessage className="text-danger" name="availability" component="div" />
                          </div>
                          <div className="col-12">
                            <Field
                              type="text"
                              name="hospitalLocation"
                              id="hospitalLocation"
                              className="form-control p-3"
                              placeholder="Hospital Location"
                            />
                            <ErrorMessage className="text-danger" name="hospitalLocation" component="div" />
                          </div>
                          <div className="col-12">
                            <Field
                              type="text"
                              name="hospitalName"
                              id="hospitalName"
                              className="form-control p-3"
                              placeholder="Hospital Name *"
                            />
                            <ErrorMessage className="text-danger" name="hospitalName" component="div" />
                          </div>
                          <div className="col-12">
                            <Field
                              type="text"
                              name="biography"
                              id="biography"
                              className="form-control p-3"
                              placeholder="Biography"
                            />
                            <ErrorMessage className="text-danger" name="biography" component="div" />
                          </div>
                        </div> 
                      )}
                      {values.role === "patient" && (
                        <div className="col-12 form-floating">
                          <Field
                            type="textarea"
                            className="form-control"
                            name="patientHistory"
                            id="patientHistory"
                            placeholder="Detail or History"
                            style={{height: "100px"}}
                          />
                          <label htmlFor="patientHistory" className="ms-1">Detail or History</label>
                          <ErrorMessage className="text-danger" name="patientHistory" component="div" />
                        </div>
                      )}
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                  )}

              </Formik>
            </div>
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      </FullLayout>
    </>
  );
}

export default Platform