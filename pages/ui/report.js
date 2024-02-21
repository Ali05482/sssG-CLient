import React, { useState, useEffect, useRef, useContext } from 'react';
import FullLayout from '../../src/layouts/FullLayout';
import Swal from 'sweetalert2';
import MainContext from '../../src/app/context/context';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner"; 2
import Summary from '../../src/components/report/summary/summary';
import Documents from '../../src/components/report/documents/documents';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Note from '../../src/components/report/note/note';
const Report = ({ questionnaireId, appointmentId, meetingId, hideFullLayout = false }) => {
  const global = useContext(MainContext)
  const [config, setConfig] = useState({
    readonly: true,
    placeholder: 'Start typing...',
    className:"dark-mode-background"
  });
  const [tabValue, setTabValue] = useState(0);
  const [questionnaires, setQuestionnaires] = useState({});

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const fetchGetCollectedQuestionnaire = async (questionnaireId) => {
    try {
      const fetchedQuestionnaire = await global?.getCollectedQuestionnaireById(questionnaireId);
      if (fetchedQuestionnaire?.status) {
        setQuestionnaires(fetchedQuestionnaire?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        })
      }
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })
    }
  };


  useEffect(() => {
    setConfig({
      readonly: false,
      placeholder: 'Start typing...',
    });
    fetchGetCollectedQuestionnaire(questionnaireId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionnaireId]);
  useEffect(() => {
    if (!_.isEmpty(meetingId)) {
      window.open(meetingId, '_blank');
    }
  }, [meetingId])
  return (
    <>
      {global?.pageLoader?.primeReactLoader && (
        <div className={styles.overlay}>
          <ProgressSpinner
            style={{ width: "180px", height: "180px" }}
            animationDuration=".5s"
          />
        </div>
      )}
      {hideFullLayout ?
        // TODO: Create Component
        <>
          <Nav tabs>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 0 ? 'active' : ''}
                onClick={() => handleTabChange(0)}>
                Note
              </NavLink>
            </NavItem>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 1 ? 'active' : ''}
                onClick={() => handleTabChange(1)}>
                Summary
              </NavLink>
            </NavItem>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 2 ? 'active' : ''}
                onClick={() => handleTabChange(2)}>
                Documents
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={tabValue}>
            <TabPane tabId={0}>
              <Note
                appointmentId={appointmentId}
                questionnaires={questionnaires}
                config={config} />
            </TabPane>
            <TabPane tabId={1}>
              <Summary
                questionnaireId={questionnaireId}
                questionnaires={questionnaires}
                config={config}
              />
            </TabPane>
            <TabPane tabId={2}>
              <Documents
                appointmentId={appointmentId}
                questionnaireId={questionnaireId}
                questionnaires={questionnaires}
                config={config}
              />
            </TabPane>
          </TabContent>
        </>
        :
        <FullLayout>
          <Nav style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} tabs>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 0 ? 'active' : ''}
                onClick={() => handleTabChange(0)}>
                Note
              </NavLink>
            </NavItem>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 1 ? 'active' : ''}
                onClick={() => handleTabChange(1)}>
                Summary
              </NavLink>
            </NavItem>
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 2 ? 'active' : ''}
                onClick={() => handleTabChange(2)}>
                Documents
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={tabValue}>
            <TabPane tabId={0}>
              <Note
                appointmentId={appointmentId}
                questionnaires={questionnaires}
                config={config} />
            </TabPane>
            <TabPane tabId={1}>
              <Summary
                questionnaireId={questionnaireId}
                questionnaires={questionnaires}
                config={config}
              />
            </TabPane>
            <TabPane tabId={2}>
              <Documents
                appointmentId={appointmentId}
                questionnaireId={questionnaireId}
                questionnaires={questionnaires}
                config={config}
              />
            </TabPane>
          </TabContent>
        </FullLayout>
      }
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const questionnaireId = query.questionnaireId || '';
  const appointmentId = query.appointmentId || '';
  const meetingId = query.meetingId || ''
  return {
    props: { questionnaireId, appointmentId, meetingId },
  };
}

export default Report;
