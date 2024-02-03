import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
// import ProjectTables from "../../src/components/dashboard/ProjectTable";
import MainContext from "../../src/app/context/context";
import { useRouter } from "next/router";
import React, {useContext, useEffect} from "react"; 
import FullLayout from "../../src/layouts/FullLayout";
const Tables = () => {
  const router = useRouter()
  const global = useContext(MainContext);
  useEffect(()=>{
    if(!(global.authenticate)){
   router.push('/auth/login')
 }
  }, [])
  
  return (
    <FullLayout>
    <Row>
      <Col lg="12">
        <center><h2 style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}>Help & Getting Started</h2></center>
      </Col>
      <Col md="6" sm="12">
      <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            
            Medical Note Automation & Questionnaires
          </CardTitle>
          <CardBody className="">
          Sending questionnaires to patients and setting up the questionnaire kiosk
            </CardBody></Card>

      </Col>
      <Col md="6" sm="12">
      <Card style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Virtual Care
          </CardTitle>
          <CardBody className="">
          Sending questionnaires to patients and setting up the questionnaire kiosk
            </CardBody></Card>

      </Col>
      
      {/* --------------------------------------------------------------------------------*/}
      {/* table-2*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Table with Border
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col> */}
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Table with Striped
          </CardTitle>
          <CardBody className="">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col> */}
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Table with Hover
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col> */}
    </Row>
    </FullLayout>
  );
};

export default Tables;
