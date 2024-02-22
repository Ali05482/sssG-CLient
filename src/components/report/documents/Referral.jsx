import React, { useContext, useEffect, useState } from "react";
import SearchableSelect from "../../../shared/component/SearchableSelect";
import { referralBuilder } from "../../../shared/report/ReferralBuilder";
import MainContext from "../../../app/context/context";
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
  const [SelectedDoctor, setSelectedDoctor] = useState({});
  const [options, setOptions] = useState({});
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
  const handleReferralBuilder = (e) => {
    e.preventDefault();
    const newReferral = referralBuilder(
      appointmentDetails,
      {
        consultTo: SelectedDoctor?.label,
        patientLastAccessed: patientLastAccessed,
      },
      doctor
    );
    setReferral({
      ...referral,
      data: newReferral,
      appointmentId: appointmentId,
      previousDoctorId: doctor?.id,
      referralDoctorId: SelectedDoctor?.value,
      patientId: appointmentDetails?.patient?._id,
      questionnaireId: questionnaireId,
    });
    setIsReferralOpen(false);
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };
  useEffect(() => {
    handleOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors]);
  return (
    <>
      <form onSubmit={handleReferralBuilder}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">
                <b>Search Doctors</b>
              </label>
              <SearchableSelect
                options={options}
                onChange={handleSelectChange}
                placeholder="Select an option"
              />
            </div>

            {/* <div className="col-md-5">
              <div className="form-group">
                <label htmlFor="">Send Via Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
            </div> */}
          </div>
          <div className="my-2"></div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Referral;
