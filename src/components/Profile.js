import React, { useContext, useState, useEffect } from "react";
import MainContext from "../app/context/context";

import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";

const Profile = ({ currentUser }) => {
  const global = useContext(MainContext)
  return (
    <>
      <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="flex flex-wrap">
        {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
          <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
        </div>}
        <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="w-full">
          <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="px-4 py-5 flex-auto">
              <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="tab-content tab-space">
                <form style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="userform">
                  <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="formrowinner">
                    <div className="forminner">
                      <label><b>First Name</b></label>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.firstName} type="text" name="firstName"></input>
                    </div>
                    <div className="forminner">
                      <label><b>Last Name</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.lastName} type="text" name="lastName"></input>
                    </div>
                  </div>
                  <div className="formrowinner">
                    <div className="forminner">
                      <label><b>Provider no</b></label>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} type="text" className="form-control" defaultValue={currentUser?.providerNumber} name="provider"></input>
                    </div>
                    <div className="forminner">
                      <label><b>License no</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} type="text" className="form-control" defaultValue={currentUser?.licenseNumber} name="license"></input>
                    </div>
                  </div>
                  <div className="formrowinner">
                    <div className="forminner">
                      <label><b>Qualification</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.doctor?.specialty} type="text" name="qualifications"></input>
                    </div>
                    <div className="forminner">
                      <label><b>Specialty</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.doctor?.specialty} type="text" name="speciality"></input>
                    </div>
                  </div>
                  <div className="formrowinner">
                    <div className="forminner">
                      <label><b>Cell Phone Number</b></label>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.phoneNumber} type="text" name="phoneNumber"></input>
                    </div>
                    <div className="forminner">
                      <label><b>Clinic Phone Number</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.phoneNumber} type="phoneNumber" name="phoneNumber"></input>
                    </div>
                  </div>
                  <div className="formrowinner">
                    <div className="forminner">
                      <label><b>Address</b></label>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.address} type="text" name="address"></input>
                    </div>
                    <div className="forminner">
                      <label><b>Fax Number</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.faxNumber} type="text" name="fax"></input>
                    </div>
                  </div>
                  <div className="formrowinner">
                    <div className="forminner">
                      <label><b>Province State</b></label>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.province} type="text" name="province"></input>
                    </div>
                    <div className="forminner">
                      <label><b>City</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.city} type="text" name="city"></input>
                    </div>
                  </div>
                  <div className="btns">
                    <div className="forminner">
                      <label><b>Email</b></label><br></br>
                      <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className="form-control" defaultValue={currentUser?.email} type="text" name="email"></input>
                    </div>
                    <a href="#">Change Password</a>
                    <a href="#">Change Email</a>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;