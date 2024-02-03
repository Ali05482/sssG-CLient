import React, { useState, useContext, useEffect } from 'react'
import MainContext from "../../../app/context/context";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel, Tabs, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
const EditQuestion = (props) => {
    const global = useContext(MainContext);
    const [checkState, setCheckState] = useState(props?.question?.isRequired)
    const [updatedData, setUpdatedData] = useState()
    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedData({ ...updatedData, [name]: value });
    }
    useEffect(() => {
       setUpdatedData({
        name: props?.question?.name, isRequired: props?.question?.isRequired, 
        id:props?.question?.id
    })
    }, [props])
    
    const handleSubmit = async () => {
        try {
        // await global.updateQuestion(updatedData,updatedData.id);
        // await props.fetchQuestions();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Somethng Went Wrong"
            })
        }
    };
    const handCheckChange = ()=>{
        setCheckState(!checkState);
        setUpdatedData({...updatedData , isRequired:!checkState })
    }
    return (
        <>
            <Modal
                isOpen={props?.open}
                className="modal-dialog-centered"
                size="x"
            >
                {global.pageLoader.primeReactLoader && (
                    <div className={styles.overlay}>
                        <ProgressSpinner
                            style={{ width: "180px", height: "180px" }}
                            animationDuration=".5s"
                        />
                    </div>
                )}
                <ModalHeader toggle={() => props?.setOpen(false)}>
                    <h5 className="text-center">Update Question</h5>
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <lable>Question Name</lable>
                                <input name='name' onChange={handleChange} type='text' className='form-control' defaultValue={props?.question?.name} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-check my-4">
                                <input type='checkbox' name='isRequired' onChange={handCheckChange} value={checkState} defaultChecked={props?.question?.isRequired} defaultValue={props?.question?.isRequired} className="form-check-input" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Is Required
                                </label>
                            </div>
                        </div>

                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Update
                    </Button>
                </ModalBody>
            </Modal>

        </>
    )
}

export default EditQuestion
