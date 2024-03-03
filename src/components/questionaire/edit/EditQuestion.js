import React, { useState, useContext, useEffect } from 'react'
import MainContext from "../../../app/context/context";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputLabel, Tabs, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
const EditQuestion = (props) => {

    // alert(props?.question?.questionGroupId)
    const global = useContext(MainContext);
    const [checkState, setCheckState] = useState(props?.question?.isRequired)
    const [updatedData, setUpdatedData] = useState()
    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdatedData({ ...updatedData, [name]: value });
    }
    useEffect(() => {
        setUpdatedData({
            name: props?.question?.name, 
            isRequired: props?.question?.isRequired,
            id: props?.question?.id,
            questionGroupId: props?.question?.questionGroupId
        })
    }, [props])
    useEffect(()=>{
        setCheckState(props?.question?.isRequired)
    }, [props?.question?.isRequired])

    const handleSubmit = async () => {
        try {
            const updateQuestion = await global.updateQuestion(updatedData, updatedData.id, "callback");
            if (updateQuestion.status) {
                if (updateQuestion?.result?.status) {
                    Swal.fire({
                        icon: "success",
                        text: "Question Updated Successfully"
                    })
                    props?.handleSearchQuestion("non-default");
                    props.setOpen(false);
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: updateQuestion?.result?.msg
                    })
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    text: updateQuestion?.result?.msg
                })
            }
            console.log("updateQuestion", updateQuestion)
            // await props.fetchQuestions();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Somethng Went Wrong"
            })
        }
    };
    const handCheckChange = () => {
        setCheckState(!checkState);
        setUpdatedData({ ...updatedData, isRequired: !checkState })
    }
    const [selectedOption, setSelectedOption] = useState('all');
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };
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
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => props?.setOpen(false)}>
                    <h5 className="text-center">Update Question</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>Question Name</label>
                                <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} name='name' onChange={handleChange} type='text' className='form-control' defaultValue={props?.question?.name} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Select an option:</label>
                                <select
                                    style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                    className="form-control"
                                    name='questionGroupId'
                                    value={updatedData?.questionGroupId}
                                    onChange={handleChange}
                                >
                                    {props?.questionGroups?.map((x) => (
                                        <option key={x?._id} value={x?._id}>
                                            {x?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-check my-4">
                                <input type='checkbox' name='isRequired' onChange={handCheckChange} checked = {checkState} className="form-check-input" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Is Required
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary my-1'
                        onClick={handleSubmit}
                        style={{ color: "white", textDecoration: "none" }}>
                        Update
                    </button>
                </ModalBody>
            </Modal>

        </>
    )
}

export default EditQuestion
