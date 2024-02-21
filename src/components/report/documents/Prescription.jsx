import React, { useState } from "react";
import { prescriptionBuilderV2 } from "../../../shared/report/prescriptionBuilderV2";

const Prescription = (props) => {
  const [medications, setMedications] = useState({
    medicineName: "",
    doseInstcruction: "",
    quantity: "",
    repeats: "",
    luCode: "",
    uniqueId: "",
  });
  const handleChange = (e) => {
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
      uniqueId: "",
    });
  };
  const handleEditPrescription = (nodeId) => {};
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
        <div className="card">
          <div className="card-header">
            <h3 className="title">Enter Prescription</h3>
            <form onSubmit={handlePrescription}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="">
                    <b>Medication</b>
                  </label>
                  <input
                    value={medications.medicineName}
                    onChange={handleChange}
                    type="text"
                    required
                    className="form-control"
                    name="medicineName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    <b>Dose / Frequency</b>
                  </label>
                  <input
                    required
                    value={medications.doseInstcruction}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    name="doseInstcruction"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    <b>Quantity</b>
                  </label>
                  <input
                    required
                    value={medications.quantity}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    name="quantity"
                    min={1}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">
                    <b>Repeats</b>
                  </label>
                  <input
                    required
                    value={medications.repeats}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    name="repeats"
                  />
                </div>
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Prescriptions</h3>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dose</th>
                  <th>Quantity</th>
                  <th>Repeats</th>
                  {/* <th>Code</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props?.prescription?.medicalInstruction?.map((x, index) => {
                  return (
                    <tr key={index}>
                      <td>{x?.medicineName}</td>
                      <td>{x?.doseInstcruction}</td>
                      <td>{x?.quantity}</td>
                      <td>{x?.repeats}</td>
                      {/* <td>{x?.luCode}</td> */}
                      <td>
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
