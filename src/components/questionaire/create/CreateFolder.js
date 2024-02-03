import React, { useState, useContext, useEffect } from "react";
import { Row, Col, } from "reactstrap";
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";

const CreateFolder = (props) => {
  const global = useContext(MainContext)
  const [folder, setFolder] = useState({
    name: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFolder({ ...folder, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await global.addFolder(folder);
      await props.fetchAllFolders()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong',
      })
    }
  }
  return (
    <>
      <Row>
        {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
          <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
        </div>}
        <Col md={12} className={styles.inputContainer}>
          <form className={styles.inputContainer} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className={styles.inputContainer}>
                  <div className="md-form md-outline input-with-post-icon datepicker">
                    <labe>Folder Name</labe>
                    <input
                    style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}
                      name="name"
                      onChange={handleChange}
                      placeholder="First Name"
                      value={folder.name}
                      type="text"
                      id="name"
                      defaultValue={"Untitled folder"}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
           
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </Col>
      </Row>
    </>
  );
};
export default CreateFolder;
