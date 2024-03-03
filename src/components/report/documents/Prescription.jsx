import React, { useContext, useState } from "react";
import { prescriptionBuilderV2 } from "../../../shared/report/prescriptionBuilderV2";
import MainContext from "../../../app/context/context";

const Prescription = (props) => {
  const [medications, setMedications] = useState({
    medicineName: "",
    doseInstcruction: "",
    quantity: "",
    repeats: "",
    luCode: "",
    uniqueId: "",
  });
  const medicines = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Codeine",
    "Morphine",
    "Tramadol",
    "Diclofenac",
  ];
  const doses = [
    "1x1",
    "1x2",
    "1x3",
    "1x4",
    "1x5",
    "1x6",
    "1x7",
    "1x8",
    "1x9",
    "1x10",
  ];
  const [searchMedicines, setSearchMedicines] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDoseDropdown, setShowDoseDropdown] = useState(false);
  const global = useContext(MainContext);
  const handleChange = (e) => {
    if (e?.target?.name === "medicineName") {
      setShowDropdown(true);
    } 
    if(e?.target?.name === "doseInstcruction"){
      setShowDoseDropdown(true);
    }
    const { name, value } = e?.target;
    setMedications({ ...medications, [name]: value });
  };
  const handlePrescription = (e) => {
    e.preventDefault();
    const uniqueId = Math.random().toString(36).substr(2, 9)?.toString();
    setMedications({ ...medications, uniqueId: uniqueId });
    const prescriptions = { ...props?.prescription };
    const neWPrescription = (prescriptions.medicalInstruction = [
      ...prescriptions?.medicalInstruction,
      medications,
    ]);
    const content = prescriptionBuilderV2(props, neWPrescription);
    props?.setPrescriptionContent(content);
    props?.setPrescription(prescriptions);
    setMedications({
      medicineName: "",
      doseInstcruction: "",
      quantity: "",
      repeats: "",
      luCode: "",
    });
  };
  const handleDeletePrescription = (uniqueId) => {
    const prescriptions = { ...props?.prescription };
    const neWPrescription = prescriptions?.medicalInstruction?.filter(
      (x) => x?.uniqueId !== uniqueId
    );
    const content = prescriptionBuilderV2(props, neWPrescription);
    props?.setPrescriptionContent(content);
    props?.setPrescription({
      ...prescriptions,
      medicalInstruction: neWPrescription,
    });
  };
  const handlePrescriptionName = (e) => {
    const { name, value } = e?.target;
    props?.setPrescription({ ...props?.prescription, [name]: value });
  };
  const handleMedicineSearch = (value) => {
    setMedications({ ...medications, medicineName: value });
    setShowDropdown(false);
  };
  const filteredMedicines = medicines?.filter((x) =>
    x?.toLowerCase()?.includes(medications?.medicineName?.toLowerCase())
  );
  const handleDosesSearch = (value) => {
    setMedications({ ...medications, doseInstcruction: value });
    setShowDoseDropdown(false);
  };
  const filteredDoses = doses?.filter((x) =>
    x?.toLowerCase()?.includes(medications?.doseInstcruction?.toLowerCase())
  );
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              props?.handleSubmitPrescription();
              props?.setIsPrescriptionOpen(false);
            }}
            type="button"
            className="btn btn-success my-3"
          >
            Save
          </button>
        </div>
        <div className="form-group my-3">
          <label htmlFor="">
            <b>Diagnosis</b>
          </label>
          <input
            value={"Diagnosis"}
            defaultValue={"Diagnosis"}
            type="text"
            required
            onChange={handlePrescriptionName}
            className="form-control d-none"
            name="prescriptionName"
          />
        </div>

        <div
          className="card"
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
        >
          <div className="card-header">
            <h3 className="title">Enter Prescription</h3>
            <form onSubmit={handlePrescription}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="">
                    <b>Medication</b>
                  </label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    value={medications?.medicineName}
                    onChange={handleChange}
                    type="text"
                    required
                    className="form-control"
                    name="medicineName"
                  />
                  <div className="dropdown" style={{ position: "relative" }}>
                    {showDropdown && filteredMedicines?.length > 0 && (
                      <>
                      <span onClick={()=>setShowDropdown(false)} style={{cursor:"pointer"}}>X</span>
                      <ul
                        className="dropdown-menu"
                        role="menu"
                        aria-labelledby="query"
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.inputColor,
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          right: "0",
                          border: "1px solid #ced4da",
                          borderTop: "none",
                          borderRadius: "0 0 0.25rem 0.25rem",
                          animation: "slideDown 0.3s ease",
                        }}
                      >
                        {filteredMedicines?.map((x, index) => {
                          return (
                            <>
                              <li>
                                <button
                                  className="dropdown-item result"
                                  onClick={() => handleMedicineSearch(x)}
                                  style={{
                                    backgroundColor:
                                      global?.theme?.backgroundColor,
                                    color: global?.theme?.inputColor,
                                    textDecoration: "none",
                                  }}
                                >
                                  {x}
                                </button>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                      </>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    <b>Dose / Frequency</b>
                  </label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    value={medications.doseInstcruction}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    name="doseInstcruction"
                  />
                  <div className="dropdown" style={{ position: "relative" }}>
                    {showDoseDropdown && filteredDoses?.length > 0 && (
                      <>
                      <span onClick={()=>setShowDoseDropdown(false)} style={{cursor:"pointer"}}>X</span>
                      <ul
                        className="dropdown-menu"
                        role="menu"
                        aria-labelledby="query"
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.inputColor,
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          right: "0",
                          border: "1px solid #ced4da",
                          borderTop: "none",
                          borderRadius: "0 0 0.25rem 0.25rem",
                          animation: "slideDown 0.3s ease",
                        }}
                      >
                        {filteredDoses?.map((x, index) => {
                          return (
                            <>
                              <li>
                                <button
                                  className="dropdown-item result"
                                  onClick={() => handleDosesSearch(x)}
                                  style={{
                                    backgroundColor:
                                      global?.theme?.backgroundColor,
                                    color: global?.theme?.inputColor,
                                    textDecoration: "none",
                                  }}
                                >
                                  {x}
                                </button>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                      </>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    <b>Days</b>
                  </label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    value={medications.quantity}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    name="quantity"
                    min={1}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="">
                    <b>Repeats</b>
                  </label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    required
                    value={medications.repeats}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    name="repeats"
                  />
                </div> */}
                {/* <div className="form-group">
                  <label htmlFor="">
                    <b>LU Code</b>
                  </label>
                  <input
                    value={medications.luCode}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    name="luCode"
                  />
                </div> */}
                <button type="submit" className="btn btn-primary my-3">
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="card"
          style={{
            backgroundColor: global?.theme?.backgroundColor,
            color: global?.theme?.color,
          }}
        >
          <div
            style={{
              backgroundColor: global?.theme?.backgroundColor,
              color: global?.theme?.color,
            }}
            className="card-header"
          >
            <h3 className="card-title">Prescriptions</h3>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    Medication
                  </th>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    Dose
                  </th>
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    Days
                  </th>
                  {/* <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    Repeats
                  </th> */}
                  {/* <th>Code</th> */}
                  <th
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props?.prescription?.medicalInstruction?.map((x, index) => {
                  return (
                    <tr key={index}>
                      <td
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                      >
                        {x?.medicineName}
                      </td>
                      <td
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                      >
                        {x?.doseInstcruction}
                      </td>
                      <td
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                      >
                        {x?.quantity}
                      </td>
                      {/* <td
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                      >
                        {x?.repeats}
                      </td> */}
                      {/* <td>{x?.luCode}</td> */}
                      <td
                        style={{
                          backgroundColor: global?.theme?.backgroundColor,
                          color: global?.theme?.color,
                        }}
                      >
                        <button
                          onClick={() => {
                            handleDeletePrescription(x?.uniqueId);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;
