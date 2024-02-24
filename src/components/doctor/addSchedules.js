/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../app/context/context';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken'
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from 'primereact/progressspinner';
const AddSchedules = ({day}) => {
    const global = useContext(MainContext);
    const [data, setData] = useState({
        incrementalTime: "1h",
        fromTime: "",
        toTime: "",
        availability: "both",
    });
   
    const handleChanges = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log("data", data);
    };
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const secret = 'weightLoser@3rdEyeSof!@123!';
        const user = jwt.verify(token, secret);
        setData({...data, doctorId: user?.id, day: {day: day, incrementalTime:data?.incrementalTime}})
    }, [day])
    const handleOnChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await global?.addDoctorAvailability( {data:[data]});
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };
  return (
    <>
      <div className="container">
      {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
                <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
            </div>}
        <dov className="card">
            <div className="card-header">
                <h3 className="card-title">Your Schedule For {day}</h3>
            </div>
            <div className="card-body">
               <form onSubmit={handleSubmit}>
               <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label><b>Incremental Time</b></label>
                            <select onChange={handleChanges} name='incrementalTime' className="form-control">
                                <option value="1h">1h</option>
                                <option value="2h">2h</option>
                                <option value="3h">3h</option>
                                <option value="4h">4h</option>
                                <option value="5h">5h</option>
                                <option value="6h">6h</option>
                                <option value="7h">7h</option>
                            </select>
                        </div>  
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label><b>Start Time</b></label>
                            <input required onChange={handleChanges} type="time" name='fromTime' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label><b>End Time</b></label>
                            <input required onChange={handleChanges} type="time" name='toTime' className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label><b>Availability</b></label>
                            <select required onChange={handleChanges} name='availability' className="form-control">
                                <option value="both">Both</option>
                                <option value="virtual">Virtual</option>
                                <option value="clinic">Clinic</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="form-group">
                            <button type='submit' className="btn btn-primary btn-block">Add Schedule</button>
                        </div>
                    </div>
                </div>
               </form>
            </div>
        </dov>
      </div>
    </>
  )
}

export default AddSchedules