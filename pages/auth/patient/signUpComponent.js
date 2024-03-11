import React, { useContext, useState, useRef } from "react";

import Head from "next/head";
import Link from "next/link";
import MainContext from "../../../src/app/context/context";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import Swal from "sweetalert2";
const SignUpComponent = () => {
  const global = useContext(MainContext);
  const [gender, setGender] = useState('');
  const [data, setData] = useState({
    firstName: "", lastName: "", dateOfBirth: "", phoneNumber: "",
    gender: "", email: "", password: "", address: "", healthCard: "",
    details: ""
  })
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setData({ ...data, gender: event.target.value })
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await global.patientSignUp(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ops Something Went Wrong",
      })
    }
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/patient/fonts/material-icon/css/material-design-iconic-font.min.css" />
        <link rel="stylesheet" href="/patient/css/style.css" />
      </Head>
      {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
        <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
      </div>}
      <div className="main">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="row">
                  <div className="col-md-6 my-1">
                    <div className="form-group">
                      <label htmlFor="firstName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                      <input onChange={handleChange} type="text" name="firstName" id="firstName" placeholder="Your First Name" />
                    </div>
                  </div>
                  <div className="col-md-6 my-1">
                    <div className="form-group">
                      <label htmlFor="lastName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                      <input onChange={handleChange} type="text" name="lastName" id="lastName" placeholder="Your Last Name" />
                    </div>
                  </div>
                  <div className="col-md-6 my-2">
                    <div className="form-group">
                      <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                      <input onChange={handleChange} type="email" name="email" id="email" placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="col-md-6 my-2">
                    <div className="form-group">
                      <label htmlFor="dateOfBirth"><i className="zmdi zmdi-cake"></i></label>
                      <input onChange={handleChange} type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Your Date of birth" />
                    </div>
                  </div>
                  <div className="col-md-6 my-2">
                    <div className="form-group">
                      <label htmlFor="phoneNumber"><i className="zmdi zmdi-phone-in-talk"></i></label>
                      <input onChange={handleChange} type="text" name="phoneNumber" id="phoneNumber" placeholder="Your Phone Number" />
                    </div>
                  </div>

               
            
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label htmlFor="healthCard"><i className="zmdi zmdi-card"></i></label>
                    <input onChange={handleChange} type="text" name="healthCard" id="healthCard" placeholder="Your Heal Card" />
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label htmlFor="address"><i className="zmdi zmdi-gps-dot"></i></label>
                    <input onChange={handleChange} type="text" name="address" id="address" placeholder="Your Address" />
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label htmlFor="address"></label>
                    <textarea type="text" onChange={handleChange} className="form-control" name="details" id="details" placeholder="Enter Your Details" ></textarea>
                  </div>
                </div>
               
                <div className="form-group my-2">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-5">Male</div>
                        <div className="col-md-5 my-1"> <input
                          type="radio"
                          value="male"
                          checked={gender === 'male'}
                          onChange={handleGenderChange}
                        /></div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-5">Female</div>
                        <div className="col-md-5 my-1 mx-2"><input
                          type="radio"
                          value="female"
                          checked={gender === 'female'}
                          onChange={handleGenderChange}
                        /></div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-5"> Other</div>
                        <div className="col-md-5 my-1">  <input
                          type="radio"
                          value="other"
                          checked={gender === 'other'}
                          onChange={handleGenderChange}
                        /></div>
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <div className="form-group">
                    <input onChange={handleChange} type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                    <label htmlFor="agree-term" className="label-agree-term"><span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-button">
                    <input onChange={handleChange} type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                  </div>
                </div>
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure><img src="/login/images/undraw_remotely_2j6y.svg" alt="sing up image" /></figure>
              <Link href="../login" className="signup-image-link">I am already member</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
