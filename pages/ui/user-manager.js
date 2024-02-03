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
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ name: "", email: "", role: "" });
  const [selectSubscription, setSelectSubscription] = useState("");
  const [addUserInfo, setAddUserInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    role: "",
    password: "",
    specialty: "",
    availability: "",
    hospitalLocation: "",
    hospitalName: "",
    biography: "",
    cnic:"",  
    faxNumber:"", 
    province:"",
    city:"",  
    address:"",
    licenseNumber:"",
    providerNumber:"",
    email: "",
    details:""
    
  });
  const [isPlatformToggle, setIsPlatformToggle] = useState(false);
  const global = useContext(MainContext);

  useEffect(() => {
    const getAllUsers = async () => {
      const result = await global.getAllUsers();
      if (result.status && result.result.status) {
        setUsers(result.result.data.docs);
      }
    };
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterUsers = (user) => {
    const fullName = user.firstName + " " + user.lastName;
    const nameMatch = fullName
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(filter.email.toLowerCase());
    const roleMatch = user.role
      .toLowerCase()
      .includes(filter.role.toLowerCase());
    return nameMatch && emailMatch && roleMatch;
  };

  function handleChangeFilter(event) {
    let { value, name } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  const handlePlatform = (e)=>{
    setIsPlatformToggle(e.target.checked);
  };
  const sortUsers = (column) => {
    const sorted = [...users].sort((a, b) => {
      if (column === "name") {
        const fullNameA = a.firstName + " " + a.lastName;
        const fullNameB = b.firstName + " " + b.lastName;
        return fullNameA.localeCompare(fullNameB);
      }
      if (column === "email") {
        return a.email.localeCompare(b.email);
      }
    });
    setUsers(sorted);
  };

  function handleChange(event) {
    let { value, name } = event.target;
    setAddUserInfo({
      ...addUserInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const copiedData = {...addUserInfo}
      delete copiedData._id
      copiedData.other = {
        specialty: addUserInfo.specialty,
        availability: addUserInfo.availability,
        hospitalLocation: addUserInfo.hospitalLocation,
        hospitalName: addUserInfo.hospitalName,
        biography: addUserInfo.biography,
        details:addUserInfo.details
      }
      if (editable) {
        await global.updateUser(copiedData);
      } else {
        await global.addUser(copiedData);
      }
     } catch (error) {
       Swal.fire({
         icon: 'error',
         title: 'Something Went Wrong',
       })
     }
  };

  const handleClear = () => {
    setAddUserInfo({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      gender: "",
      role: "",
      password: "",
      specialty: "",
      availability: "",
      hospitalLocation: "",
      hospitalName: "",
      biography: "",
      email: "",
      details:""
      
    });
  };
  return (
    <FullLayout>
       <div>
      <Col lg="12">
        <Card>
          <CardTitle
            tag="h6"
            className="border-bottom p-3 mb-0 d-flex align-items-center justify-content-between"
          >
            <div>
              <i className="bi bi-card-text me-2"> </i>
              Users Name 
            </div>
            <div style={{ width: "200px" }}>
              <select
                onChange={handleChangeFilter}
                name="role"
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
              >
                <option selected value="">
                  All
                </option>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </CardTitle>
          {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
              </div>}
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
                        onClick={() => sortUsers("name")}
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
                        placeholder="Email"
                        aria-label="Search"
                        name="email"
                        onChange={handleChangeFilter}
                      />
                      <button
                        onClick={() => sortUsers("email")}
                        className="btn btn-outline-primary"
                      >
                        AZ
                      </button>
                    </div>
                  </th>
                  <th className="text-center">
                    <h5>Role</h5>
                  </th>
                  <th className="text-center">
                    <h5>Subscription</h5>
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
                {users
                  .filter((user) => filterUsers(user))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <th className="text-center" scope="row">
                          {index + 1}
                        </th>
                        <td>{item.firstName + " " + item.lastName}</td>
                        <td>{item.email}</td>
                        <td className="text-center">{item.role}</td>
                        <th className="text-center">
                          <button
                            className="btn btn-outline-primary text-center"
                            data-bs-toggle="modal"
                            data-bs-target="#userSubscription"
                            onClick={() => {
                              setAddUserInfo(item);
                            }}
                          >
                            <i className="bi bi-plus-circle-fill"></i>
                          </button>
                        </th>
                        <th className="text-center">
                          <button
                            onClick={() => {
                              setAddUserInfo(item);
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
                onClick={() => {
                  setEditable(false);
                  handleClear();
                }}
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
                
              >
                <div className="col-12">
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control p-3"
                    value={addUserInfo.firstName}
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    onChange={handleChange}
                    className="form-control p-3"
                    value={addUserInfo.lastName}
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Email"
                    value={addUserInfo.email}
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="password"
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Password"
                    value={addUserInfo.password}
                    name="password"
                    id="password"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="date"
                    className="form-control p-3"
                    value={addUserInfo.dateOfBirth}
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="Date of Birth "
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo?.cnic}
                    name="cnic"
                    id="cnic"
                    placeholder="Cnic * "
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo?.faxNumber}
                    name="faxNumber"
                    id="faxNumber"
                    placeholder="Fax Number"
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo?.province}
                    name="province"
                    id="province"
                    placeholder="province "
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo?.city}
                    name="city"
                    id="city"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo.phoneNumber}
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Cell Phone Number *"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo.address}
                    name="address"
                    id="address"
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo.licenseNumber}
                    name="licenseNumber"
                    id="licenseNumber"
                    placeholder="License Number"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control p-3"
                    value={addUserInfo.providerNumber}
                    name="providerNumber"
                    id="providerNumber"
                    placeholder="Provider Number"
                    required
                  />
                </div>
                <div className="col-12 px-3">
                  <label className=" me-3" htmlFor="gender">
                    Gender
                  </label>
                  <div className="form-check form-check-inline" id="gender">
                    <input
                      className="form-check-input"
                      onChange={handleChange}
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={addUserInfo.gender === "male" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="gender"
                      id="female"
                      value="female"
                      checked={addUserInfo.gender === "female" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="gender"
                      id="other"
                      value="other"
                      checked={addUserInfo.gender === "other" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="col-12 px-3">
                  <label className=" me-3" htmlFor="role">
                    Role
                  </label>
                  <div className="form-check form-check-inline" id="role">
                    <input
                      className="form-check-input"
                      onChange={handleChange}
                      type="radio"
                      name="role"
                      id="admin"
                      value="admin"
                      checked={addUserInfo.role === "admin" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="admin">
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="role"
                      id="doctor"
                      value="doctor"
                      checked={addUserInfo.role === "doctor" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="doctor">
                      Doctor
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="role"
                      id="patient"
                      value="patient"
                      checked={addUserInfo.role === "patient" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="patient">
                      Patient
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="role"
                      id="compodar"
                      value="compodar"
                      checked={addUserInfo.role === "compodar" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="user">
                      Attendant
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={handleChange}
                      name="role"
                      id="schedulingTeam"
                      value="schedulingTeam"
                      checked={addUserInfo.role === "schedulingTeam" ? true : false}
                      required
                    />
                    <label className="form-check-label" htmlFor="user">
                      Scheduling Team
                    </label>
                  </div>
                 
                </div>
                {addUserInfo.role === "doctor" && (
                  <div className="col-12 row g-3">
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={addUserInfo.specialty}
                        name="specialty"
                        id="specialty"
                        className="form-control p-3"
                        placeholder="specialty"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={addUserInfo.availability}
                        name="availability"
                        id="availability"
                        className="form-control p-3"
                        placeholder="Availability"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={addUserInfo.hospitalLocation}
                        name="hospitalLocation"
                        id="hospitalLocation"
                        className="form-control p-3"
                        placeholder="Hospital Location"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={addUserInfo.hospitalName}
                        name="hospitalName"
                        id="hospitalName"
                        className="form-control p-3"
                        placeholder="Hospital Name *"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={addUserInfo.biography}
                        name="biography"
                        id="biography"
                        className="form-control p-3"
                        placeholder="Biography"
                        required
                      />
                    </div>
                  </div>
                )}
                {addUserInfo.role === "patient" && (
                  <div className="col-12 form-floating">
                    <textarea
                      className="form-control"
                      id="patientHistory"
                      placeholder="Detail or History"
                      style={{height: "100px"}}
                    ></textarea>
                    <label htmlFor="patientHistory" className="ms-1">Detail or History</label>
                  </div>
                )}

                <div className="col-12 d-flex justify-content-between mt-5">
                  <button
                    onClick={() => {setEditable(false); handleClear();}}
                    type="button"
                    className="btn btn-lg btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-lg btn-primary">
                    {editable ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Subscription modal */}
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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Subscription -{" "}
                {addUserInfo.firstName + " " + addUserInfo.lastName}
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
                  onClick={() => {setEditable(false); handleClear();}}
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
