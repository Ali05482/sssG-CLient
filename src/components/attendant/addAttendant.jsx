import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import _ from "lodash";
import MainContext from "../../app/context/context";
const AddAttendant = () => {
  const global = useContext(MainContext);
  const [clinics, setClinics] = useState([]);
  const [attendants, setAttendants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendant, setAttendant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    clinicId: "",
    gender: "male",
    dateOfBirth: "",
    password: "",
    retypePassword: "",
  });
  const fetchClinics = async () => {
    try {
      const clinics = await global?.getAllClinics();
      if (clinics?.status) {
        setClinics(clinics?.result?.data);
        setAttendant({
          ...attendant,
          clinicId: clinics?.result?.data[0]?.user?._id,
        });
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
  const fetchAttendants = async () => {
    try {
      const attendants = await global?.getAllAttendants();
      console.log("attendants?.result?.data===>", attendants?.result?.data);
      if (attendants?.status) {
        setAttendants(attendants?.result?.data);
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
  const handleOnChange = (e) => {
    setAttendant({ ...attendant, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchClinics();
    fetchAttendants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (attendant?.password !== attendant?.retypePassword) {
        return Swal?.fire({
          icon: "warning",
          title: "Password does not match",
        });
      } else {
        await global?.addAttendant(attendant);
        await fetchAttendants();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      });
    }
  };
  const filteredAttendants = attendants?.filter(
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
      <div className="container">
        <div
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
          className="card"
        >
          <div className="card-header">
            <h3 className="card-title">Add Attendant</h3>
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
                      required
                      name="clinicId"
                      id=""
                      className="form-control"
                    >
                      {clinics?.map((x, index) => (
                        <option key={index} value={x?._id}>
                          {x?.name + ", " + x?.location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Enter Email</label>
                    <input
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
                    <label htmlFor="">Select Gender</label>
                    <select
                      onChange={handleOnChange}
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.inputColor,
                      }}
                      required
                      name="clinicId"
                      id=""
                      className="form-control"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
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
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
          className="card"
        >
          <div className="card-header">
            <h3 className="card-title">Attendants List</h3>
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
                      <b>Action</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendants?.map((x, index) => (
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
                        <button className="btn btn-success">Edit</button>
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

export default AddAttendant;
