import Link from "next/link";
import { Toast } from "primereact/toast";
import React, {useState, useRef } from "react";
import { Col, Card, CardTitle, CardBody } from 'reactstrap';

const SelectQuestionaire = (props) => {
  const toast = useRef(null);

  


  const toggleQuestion =()=>{
    toast.current.show({severity:'success', summary: 'Success', detail:'Question Selected', life: 3000});
    props.setQuestionGroup(props?.group)
    props.setOpen(false)
  };
  return (
    <>
     <Toast ref={toast} />
      <div onClick={toggleQuestion} style={{cursor:"pointer"}} className ={`col-md-12`}>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">
            {props?.group?.name}
            </h5>
          </div>
          <div className="card-body">
          <div className='mainquesto'>
              <div className='questoinner'>
                <i className="bi bi-send"> </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default SelectQuestionaire;
