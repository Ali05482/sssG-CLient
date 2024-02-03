import Link from "next/link";
import React, { useContext } from "react";
import { Col, Card, CardTitle, CardBody } from 'reactstrap';
import MainContext from "../../app/context/context";

const QuestionFolders = (props) => {
  const global = useContext(MainContext);
  return (
    <>
      <div className="row">
      <Col md="6" className='questoari'>
        <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
          <CardTitle tag="h6" className=" questohead border-bottom p-3 mb-0">
            {props.group.name}
          </CardTitle>
          <CardBody>
            <div className='mainquesto'>
              <div className='questoinner'>
                <i className="bi bi-send"> </i>
              </div>
              <div className='questoinner'>
                <i className="bi bi-copy"> </i>
                 <i className="bi bi-laptop"> <Link  href={`../display/${props.group._id}`}>Go</Link></i>
                <i className="bi bi-three-dots-vertical"> </i>
                {/* {props.group._id} */}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      </div>
    </>
  );
};



export default QuestionFolders;
