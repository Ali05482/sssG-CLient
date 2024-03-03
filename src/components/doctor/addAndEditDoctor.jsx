import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import MainContext from "../../app/context/context";
import _ from "lodash";

const AddAndEditDoctor = ({
  clinics,
  mode = "create",
  doctorToLoad = null,
}) => {
  const global = useContext(MainContext);
  const [doctor, setDoctor] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    clinicId: "",
    gender: "male",
    dateOfBirth: "",
    cnic: "",
    faxNumber: "",
    providerNumber: "",
    province: "",
    city: "",
    licenseNumber: "",
    address: "",
    biography: "",
    meetingId: "",
    specialty: "",
    availability: "",
    password: "",
    retypePassword: "",
  });
  console.log("doctor====>", doctor);
  console.log("clinics====>", clinics);
  useEffect(() => {
    setDoctor({ ...doctor, clinicId: clinics?.[0]?._id });
  }, [clinics]);
  useEffect(() => {
    if (!_?.isNull(doctorToLoad)) {
      setDoctor(doctorToLoad);
    }
  }, [doctorToLoad]);
   const handleOnChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await global?.addAndEditDoctor(doctor);
      } else {
        if (doctor?.password !== doctor?.retypePassword) {
          return Swal?.fire({
            icon: "warning",
            title: "Password does not match",
          });
        } else {
          await global?.addAndEditDoctor(doctor);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      });
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: global?.theme?.backgroundColor,
          color: global?.theme?.color,
        }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Add Doctor</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter First Name</label>
                  <input
                    onChange={handleOnChange}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    defaultValue={doctor?.firstName}
                    required
                    type="text"
                    name="firstName"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Last Name</label>
                  <input
                    onChange={handleOnChange}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    defaultValue={doctor?.lastName}
                    required
                    type="text"
                    name="lastName"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Select Clinic</label>
                  <select
                    onChange={handleOnChange}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    defaultValue={doctor?.clinicId?._id}
                    required
                    value={doctor?.clinicId?._id}
                    name="clinicId"
                    id=""
                    className="form-control"
                  >
                    {clinics?.map((x, index) => {
                      return (
                        <option key={index} value={x?._id}>
                          {x?.name + ", " + x?.location + ", " + x?.city}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Email</label>
                  <input
                    defaultValue={doctor?.email}
                    onChange={handleOnChange}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Date of birth</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.dateOfBirth}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Phone #</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.phoneNumber}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter CNIC #</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.cnic}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="cnic"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Fax #</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.faxNumber}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="faxNumber"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Google Meet Link</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.meetingId}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="meetingId"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter License #</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.licenseNumber}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="licenseNumber"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Select Gender</label>
                  <select
                    onChange={handleOnChange}
                    value={doctor?.gender}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    name="gender"
                    id=""
                    className="form-control"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              {mode === "create" && (
                <>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        onChange={handleOnChange}
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.inputColor,
                        }}
                        required
                        type="password"
                        name="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Re-type Password</label>
                      <input
                        onChange={handleOnChange}
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.inputColor,
                        }}
                        required
                        type="password"
                        name="retypePassword"
                        className="form-control"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter City</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.city}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="city"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Provider #</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.providerNumber}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="providerNumber"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Province</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.province}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="province"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Address</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.address}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="address"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Specialty</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.specialty}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="specialty"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Availability</label>
                  <input
                    onChange={handleOnChange}
                    defaultValue={doctor?.availability}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    type="text"
                    name="availability"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Biography</label>
                  <textarea
                    className="form-control"
                    defaultValue={doctor?.biography}
                    name="biography"
                    onChange={handleOnChange}
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAndEditDoctor;
