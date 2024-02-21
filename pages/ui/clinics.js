import {
  Col,
  Card,
  Table,
  CardBody,
  CardTitle,
} from "reactstrap";

import MainContext from "../../src/app/context/context";
import React, { useContext, useState, useEffect, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import FullLayout from "../../src/layouts/FullLayout";
const UserManager = () => {
  const [editable, setEditable] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [filter, setFilter] = useState({ name: "", email: "" });
  const [selectSubscription, setSelectSubscription] = useState("");
  const [addClinicInfo, setAddClnicInfo] = useState({
    name: "", location: "", type: "clinic", city: "", _id: ""
  });
  console.log(clinics);

  const modelClose = useRef();
  const global = useContext(MainContext);
  const getAllClinics = async () => {
    const result = await global.getAllClinics();
    if (result?.status && result?.result.status) {
      setClinics(result.result.data);
    }
  };
  useEffect(() => {
    getAllClinics();
  }, []);

  const filterUsers = (clinic) => {
    const fullName = clinic.name;
    const nameMatch = fullName
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const locationMatch = clinic.location
      .toLowerCase()
      .includes(filter.email.toLowerCase());
    return nameMatch && locationMatch;
  };

  function handleChangeFilter(event) {
    let { value, name } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  }

  const sortClinics = (column) => {
    const sorted = [...clinics].sort((a, b) => {
      if (column === "name") {
        const fullNameA = a.firstName + " " + a.lastName;
        const fullNameB = b.firstName + " " + b.lastName;
        return fullNameA.localeCompare(fullNameB);
      }
      if (column === "localtion") {
        return a.location.localeCompare(b.column);
      }
    });
    setClinics(sorted);
  };

  function handleChange(event) {
    let { value, name } = event.target;
    setAddClnicInfo({
      ...addClinicInfo,
      [name]: value,
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!editable) {
        const copiedClinicInfo = { ...addClinicInfo };
        delete copiedClinicInfo._id;
        await global.addClinic(copiedClinicInfo);
      } else {
        await global.editClinic(addClinicInfo, addClinicInfo._id);
      }
      modelClose.current.click()
      getAllClinics();
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong',
      })
    }

  }

  return (
    <FullLayout>
      <div>
        {global?.pageLoader?.primeReactLoader && <div className={styles.overlay}>
          <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
        </div>}
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Users Name
            </CardTitle>

            <CardBody className="userstableinner">
              <Table bordered>
                <thead>
                  <tr>
                    <th className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addUserModal"
                      >
                        <i className="bi bi-person-plus"></i>
                      </button>
                    </th>
                    <th>
                      <div className="d-flex align-items-center">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Name"
                          aria-label="Search"
                          onChange={handleChangeFilter}
                          name="name"
                        />
                        <button
                          onClick={() => sortClinics("name")}
                          className="btn btn-outline-primary"
                        >
                          AZ
                        </button>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex align-items-center">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Location"
                          aria-label="Search"
                          name="Location"
                          onChange={handleChangeFilter}
                        />
                        <button
                          onClick={() => sortClinics("email")}
                          className="btn btn-outline-primary"
                        >
                          AZ
                        </button>
                      </div>
                    </th>
                    <th className="text-center">
                      <h5>City</h5>
                    </th>
                    <th className="text-center">
                      <h5>Type</h5>
                    </th>

                    <th className="text-center">
                      <h5>Edit</h5>
                    </th>
                    <th className="text-center">
                      <h5>Delete</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clinics
                    ?.filter((user) => filterUsers(user))
                    ?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th className="text-center" scope="row">
                            {index + 1}
                          </th>
                          <td>{item.name}</td>
                          <td>{item.location}</td>
                          <td className="text-center">{item.city}</td>
                          <td className="text-center">{item.type}</td>
                          <th className="text-center">
                            <button
                              onClick={() => {
                                setAddClnicInfo(item);
                                setEditable(true);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#addUserModal"
                              className="btn btn-outline-primary text-center"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                          </th>
                          <th className="text-center">
                            <button className="btn btn-outline-primary text-center">
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        {/* Add user modal */}
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
                  {editable ? "Edit User" : "New User"}
                </h1>

                <button
                  onClick={() => setEditable(false)}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit}
                  className="row g-3 needs-validation"
                  noValidate
                >

                  <div className="col-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      value={addClinicInfo.name}
                      name="name"
                      className="form-control p-3"
                      id="name"
                      placeholder="Clinic Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      className="form-control p-3"
                      value={addClinicInfo.location}
                      name="location"
                      id="location"
                      placeholder="Clinic Location"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      onChange={handleChange}
                      className="form-control p-3"
                      value={addClinicInfo.city}
                      name="city"
                      id="city"
                      placeholder="Clinic City"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <select
                      className="form-control p-3"
                      onChange={handleChange}
                      value={addClinicInfo.type}
                      name="type"
                      id="type"
                      placeholder="Clinic Type"
                      required
                    >
                      <option value="clinic">Clinic</option>
                      <option value="hospital">Hospital</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="lab">Lab</option>
                      <option value="diagnostic center">Diagnostic Center</option>
                      <option value="other">Other</option>

                    </select>
                  </div>
                  <input
                    type="text"
                    hidden={true}
                    onChange={handleChange}
                    className="form-control p-3"
                    value={addClinicInfo._id}
                    name="_id"
                    id="_id"
                    required
                  />
                  <div className="col-12 d-flex justify-content-between mt-4">
                    <button
                      ref={modelClose}
                      onClick={() => setEditable(false)}
                      type="button"
                      className="btn btn-lg btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-lg btn-primary">
                      {editable ? "Update Clinic" : "Add Clinic"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade "
          id="userSubscription"
          data-bs-backdrop="static"
          data-bs-keyboard={false}
          tabIndex="-1"
          aria-labelledby="addUserModalLabel"
          aria-hidden={true}
        >
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex mt-2 ">
                  <Card
                    className="p-3 mx-3 bg-primary text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectSubscription("Purchase Monthly")}
                  >
                    <div className="text-center mb-0 h-100">
                      <h1 className="fs-3">$120/Month</h1>
                      <p className="mt-4 fs-6 mb-0">Paid Monthly</p>
                    </div>
                  </Card>
                  <Card
                    className="p-3 mx-3 bg-success text-white "
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectSubscription("Purchase Yearly")}
                  >
                    <div className="text-center mb-0 h-100">
                      <h1 className="fs-3">$100/Month</h1>
                      <p className="mt-4 fs-6 mb-0">Paid Yearly</p>
                    </div>
                  </Card>
                </div>
                <div className="modal-footer  justify-content-start  mb-2 pt-4">
                  <button
                    onClick={() => setEditable(false)}
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn  btn-outline-secondary mx-2"
                    disabled={selectSubscription ? false : true}
                  >
                    {selectSubscription ? selectSubscription : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullLayout>

  );
};

export default UserManager;
