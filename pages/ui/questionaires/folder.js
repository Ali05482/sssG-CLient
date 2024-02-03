import {
  Row,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  InputGroup,
  ModalBody,
  Modal,
  ModalHeader,
} from 'reactstrap';
import MainContext from "/src/app/context/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionFolders from '../../../src/components/questionaire/QuestionFolders';
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "/styles/Appointment.module.css";
import CreateFolder from '../../../src/components/questionaire/create/CreateFolder';
import Link from 'next/link';
import FullLayout from '../../../src/layouts/FullLayout';



const Folder = () => {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const global = useContext(MainContext);
  const fetchAllFolders = async () => {
    const result = await global.getAllFolder();
    if (result?.status && result?.result?.status) {
      setFolders(result.result.data);
    }
  }
  const newAction = (e) => {
    setIsModalOpen(!isModalOpen)
  }
  useEffect(() => {

    if (!(global.authenticate)) {
      router.push('/auth/login')
    }
    fetchAllFolders();
  }, [])

  return (
    <>
    <FullLayout>
      <Row>
        <div  className='row'>
          <div className='col-md-1'>
            <InputGroup>
              <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                  <DropdownItem><Link className='btn btn-danger' style={{ color: "inherit", textDecoration: "none", border: "none !important" }} href="./create">New Questionaire</Link></DropdownItem>
                  <DropdownItem><Link className='btn btn-danger' style={{ color: "inherit", textDecoration: "none", border: "none !important" }} href="./update">Update Questionaire</Link></DropdownItem>
                  <DropdownItem style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onClick={() => newAction('folder')}>New Folder</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
          </div>
          <Modal
            isOpen={isModalOpen}
            className="modal-dialog-centered" 
          >
            <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setIsModalOpen(!isModalOpen)}>
              <h5 className="text-center">Create New Folder</h5>
            </ModalHeader>
            <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
              <CreateFolder fetchAllFolders = {fetchAllFolders} />
            </ModalBody>
          </Modal>
        </div>
        {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
          <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
        </div>}
        <div className='my-3'></div>
      </Row>
      <div className='row'>
        {folders?.map((folder, index) => <QuestionFolders key={index} folder={folder} />)}
      </div>
      </FullLayout>
    </>
  );
};

export default Folder;

