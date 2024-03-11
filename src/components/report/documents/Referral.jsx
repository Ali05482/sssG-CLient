import React, { useContext, useEffect, useState } from "react";
import { referralBuilder } from "../../../shared/report/ReferralBuilder";
import MainContext from "../../../app/context/context";
import _ from "lodash";
import Swal from "sweetalert2";
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";

const Referral = ({
  isReferralOpen,
  setIsReferralOpen,
  doctor,
  appointmentId,
  questionnaireId,
  setReferral,
  referral,
  doctors,
  appointmentDetails,
  patientLastAccessed,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState({});
  const [inviteDoctorEmail, setInviteDoctorEmail] = useState("");
  const handleChangeInviteDoctor = (e) => {
    setInviteDoctorEmail(e.target.value);
  };
const handleInviteNewDoctor = async (e)=>{
  try {
    e.preventDefault();
      await global?.inviteDoctor({email:inviteDoctorEmail});
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
}
  const global = useContext(MainContext);
  const handleOptions = () => {
    const options = doctors?.map((doctor) => {
      return {
        value: doctor._id,
        label:
          doctor.firstName +
          " " +
          doctor.lastName +
          ", (" +
          doctor?.doctor?.specialty +
          ")",
      };
    });
    setOptions(options);
  };
  const handleReferralBuilder = (consultTo, referralDoctorId) => {
    const newReferral = referralBuilder(
      appointmentDetails,
      {
        consultTo,
        patientLastAccessed: patientLastAccessed,
      },
      doctor
    );
    setReferral({
      ...referral,
      data: newReferral,
      appointmentId: appointmentId,
      previousDoctorId: doctor?.id,
      referralDoctorId,
      patientId: appointmentDetails?.patient?._id,
      questionnaireId: questionnaireId,
    });
    setIsReferralOpen(false);
  };
  const handleChooseDoctor = (consultTo, doctor) => {
    handleReferralBuilder(consultTo, doctor);
  };
  useEffect(() => {
    handleOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors]);
  const filteredDoctors = doctors?.filter(
    (x) =>
      x?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      x?.lastName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      x?.phoneNumber?.includes(searchTerm) ||
      x?.doctor?.specialty.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      x?.clinicId?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      x?.clinicId?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      x?.clinicId?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <>
    {global?.pageLoader?.primeReactLoader && (
        <div className={styles.overlay}>
          <ProgressSpinner
            style={{ width: "180px", height: "180px" }}
            animationDuration=".5s"
          />
        </div>
      )}
      <div className="container">
        <div className="row">
          <form onSubmit={handleInviteNewDoctor}>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="inviteDoctor">Enter Email</label>
              <input
              style={{
                backgroundColor: global?.theme?.backgroundColor,
                color: global?.theme?.inputColor,
              }}
               onChange={handleChangeInviteDoctor} type="email" className="form-control" />
            </div>
            <div className="col-md-2 my-2">
              <button type="submit"  className="btn btn-primary">Invite</button>
            </div>
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
          <div
            style={{
              backgroundColor: global?.theme?.backgroundColor,
              color: global?.theme?.color,
            }}
            className="card-body"
          >
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
                      color: global?.theme?.color,
                    }}
                  >
                    <b>#</b>
                  </th>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    <b>Name</b>
                  </th>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    <b>Clinic</b>
                  </th>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    <b>Specialty</b>
                  </th>

                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    <b>Select</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((x, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                      }}
                    >
                      {x?.firstName + " " + x?.lastName}
                    </td>
                    <td
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                      }}
                    >
                      <textarea
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                        disabled
                        className="form-control"
                        cols="15"
                        rows="3"
                      >
                        {!_?.isUndefined(x?.clinicId?.name)
                          ? x?.clinicId?.name +
                            ", " +
                            x?.clinicId?.city +
                            ", " +
                            x?.clinicId?.location
                          : "Clinic Not Allocated Yet"}
                      </textarea>
                    </td>
                    <td
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                      }}
                    >
                      <strong className="text-primary">
                        {x?.doctor?.specialty}
                      </strong>
                    </td>
                    <td
                      style={{
                        backgroundColor: global?.theme?.backgroundColor,
                        color: global?.theme?.color,
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleChooseDoctor(
                            x?.firstName +
                              " " +
                              x?.lastName +
                              ", (" +
                              x?.doctor?.specialty +
                              ")",
                            x?._id
                          );
                        }}
                      >
                        ✅
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referral;
