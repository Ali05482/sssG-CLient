import React, { useState, useEffect, useContext } from 'react';
import FullLayout from '../../src/layouts/FullLayout';
import Swal from 'sweetalert2';
import MainContext from '../../src/app/context/context';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner"; 2
import Summary from '../../src/components/report/summary/summary';
import Documents from '../../src/components/report/documents/documents';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Note from '../../src/components/report/note/note';
import Notes from './notes';
import _ from 'lodash';

const Report = ({ questionnaireId, appointmentId, meetingId, hideFullLayout = false, isRecordView = false }) => {
  const global = useContext(MainContext)
  const [config, setConfig] = useState({
    readonly: true,
    placeholder: 'Start typing...',
    className: "dark-mode-background"
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
  }, [meetingId]);

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
            <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 3 ? 'active' : ''}
                onClick={() => handleTabChange(3)}>
                Previous History
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
            <TabPane tabId={3}>
              <Notes appointmentId={appointmentId} />
            </TabPane>
          </TabContent>
        </>
        :
        <FullLayout>
          <Nav style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} tabs>
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
            {isRecordView != "true" ? <NavItem className='cursor-pointer'>
              <NavLink
                className={tabValue === 3 ? 'active' : ''}
                onClick={() => handleTabChange(3)}>
                Previous History
              </NavLink>
            </NavItem> : <></>}
            <NavItem className='cursor-pointer'>
              <NavLink>
                <h6 className='text-success'>Patient: (<strong>{_?.isUndefined(questionnaires?.appointment?.patient?.firstName) ? "Loading...." : questionnaires?.appointment?.patient?.firstName}  {_?.isUndefined(questionnaires?.appointment?.patient?.lastName) ? "Loading..." : questionnaires?.appointment?.patient?.lastName}</strong>), Attendant (<strong>{(_?.isUndefined(questionnaires?.appointment?.user?.firstName) ? "Loading..." : questionnaires?.appointment?.user?.firstName)} {(_?.isUndefined(questionnaires?.appointment?.user?.lastName) ? "Loading..." : questionnaires?.appointment?.user?.lastName)}</strong>) from (<strong>{_?.isUndefined(questionnaires?.appointment?.clinic?.name) ? "Loading..." : questionnaires?.appointment?.clinic?.name} {_?.isUndefined(questionnaires?.appointment?.clinic?.city) ? "Loading..." : questionnaires?.appointment?.clinic?.city}</strong>)</h6>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={tabValue}>
            <TabPane tabId={0}>
              <Note
                appointmentId={appointmentId}
                questionnaires={questionnaires}
                config={config}
                isRecordView={isRecordView} />
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
                isRecordView={isRecordView}
              />
            </TabPane>
            <TabPane tabId={3}>
              {isRecordView != "true" ?
                <Notes questionnaires={questionnaires} appointmentId={appointmentId} /> : <></>
              }
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
  const meetingId = query.meetingId || '';
  const isRecordView = query.isRecordView || false;
  return {
    props: { questionnaireId, appointmentId, meetingId, isRecordView },
  };
}

export default Report;
