import {
  Row,
  Col,
  Input,
} from 'reactstrap';
import MainContext from "/src/app/context/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import QuestionGroups from '../../../../src/components/questionaire/QuestionGroups';
import FullLayout from '../../../../src/layouts/FullLayout';


const Group = () => {
  const [groups, setGruops] = useState(null)
  const router = useRouter();
  const global = useContext(MainContext);
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
          <Input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} id="exampleSelect" name="select" type="select">
            <option>New</option>
            <option>New Questionaire</option>
            <option>New Folder</option>
          </Input>
        </Col>
        <div className='my-3'></div>
        {groups?.map((group, index) => <QuestionGroups key={index} group={group} />)}
        <div className='my-3'></div>
      </Row>
    </FullLayout>
  );
};

export default Group;

