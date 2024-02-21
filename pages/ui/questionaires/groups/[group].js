import {
  Row,
  Col,
  Input,
  InputGroup,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import MainContext from "/src/app/context/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionGroups from '../../../../src/components/questionaire/QuestionGroups';
import FullLayout from '../../../../src/layouts/FullLayout';
import Link from 'next/link';


const Group = () => {
  const [groups, setGruops] = useState(null)
  const router = useRouter();
  const global = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const fetchAllGroups = async () => {
    const result = await global.fetchAllGroupsByFolderId(router.query.group);
    if (result.status && result.result.status) {
      setGruops(result.result.data);
    }
  }
  useEffect(() => {
    fetchAllGroups();
    if (!(global.authenticate)) {
      router.push('/auth/login')
    }
  }, [router.query.group])

  return (
    <FullLayout>
      <Row>
        <Col md="1" className='questo'>
          <div className='col-md-1'>
            <InputGroup>
              <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                  <DropdownItem><Link className='btn btn-danger' style={{ color: "inherit", textDecoration: "none", border: "none !important" }} href="../create">New Questionaire</Link></DropdownItem>
                  <DropdownItem><Link className='btn btn-danger' style={{ color: "inherit", textDecoration: "none", border: "none !important" }} href="../update">Update Questionaire</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
          </div>
        </Col>
        <div className='my-3'></div>
        {groups?.map((group, index) => <QuestionGroups key={index} group={group} />)}
        <div className='my-3'></div>
      </Row>
    </FullLayout>
  );
};

export default Group;

