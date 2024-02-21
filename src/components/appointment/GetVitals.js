import React, { useContext, useState, useEffect, useRef } from 'react'
import MainContext from '../../app/context/context'
import Swal from 'sweetalert2';

const GetVitals = (props) => {
    const global = useContext(MainContext)
    const [formData, setFormData] = useState({
        patient: props?.patientId,
        appointment: props?.appointmentId,
        bodyTemperature: 0,
        heartRate: 0,
        respiratoryRate: 0,
        bloodPressure: 0,
        oxygenSaturation: 0,
        height: 0,
        weight: 0,
        bloodGlucose: 0,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };
    const handleSubmit = async (e) => {
        try {
            console.log(formData)
            e?.preventDefault();
            const vitals = await global.addVitals(formData, "callback");
            console.log("vitals", vitals)
            if (vitals?.status) {
                if (vitals?.result?.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Vitals Added Successfully",
                    });
                    setTimeout(() => {
                        window.close()
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Something Went Wrong, contact admin",
                        text: vitals?.result?.msg
                    });
                    if (vitals?.result?.msg == "Vitals already collected against this appointment") {
                        setTimeout(() => {
                            window.close()
                        }, 1500);
                    }
                }
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Something Went Wrong, contact admin",
                    text: vitals?.result?.msg
                })
                if (vitals?.result?.msg == "Vitals already collected against this appointment") {
                    setTimeout(() => {
                        window.close()
                    }, 1500);
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something Went Wrong, contact admin",
            })
        }
    };
    useEffect(() => {
        setFormData({ ...formData, patient: props?.patientId, appointment: props?.appointmentId })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.appointmentId, props?.patientId])
    return (
        <>
            <div className="container">
                <div className="main">
                    <h3 className=' text-primary' >Health Measurements Form:</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="bodyTemperature">Body Temperature (°F):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="bodyTemperature"
                                        value={formData.bodyTemperature}
                                        onChange={handleChange}
                                        placeholder="e.g. 98.6"
                                        min="0"
                                        defaultValue={0}
                                        step="any"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="heartRate">Heart Rate (bpm):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="heartRate"
                                        value={formData.heartRate}
                                        onChange={handleChange}
                                        placeholder="e.g. 72"
                                        min="0"
                                        defaultValue={0}

                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="respiratoryRate">Respiratory Rate (breaths per minute): </label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="respiratoryRate"
                                        value={formData.respiratoryRate}
                                        onChange={handleChange}
                                        placeholder="e.g. 18"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="bloodPressure">Blood Pressure (mmHg):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="text"
                                        className="form-control"
                                        name="bloodPressure"
                                        value={formData.bloodPressure}
                                        onChange={handleChange}
                                        placeholder="e.g. 128/80"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="oxygenSaturation">Oxygen Saturation (%):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="oxygenSaturation"
                                        value={formData.oxygenSaturation}
                                        onChange={handleChange}
                                        placeholder="e.g. 95"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="height">Height (inches):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="e.g. 5.8"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="weight">Weight (lbs):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="e.g. 180"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="bloodGlucose">Blood Glucose (mg/dL):</label>
                                    <input
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        type="number"
                                        className="form-control"
                                        name="bloodGlucose"
                                        value={formData.bloodGlucose}
                                        onChange={handleChange}
                                        placeholder="e.g. 70"
                                        min="0"
                                        defaultValue={0}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-block btn-primary mb-2 my-3" type="submit">
                            Save
                        </button>
                    </form>

                </div>
            </div>

        </>
    )
}

export default GetVitals