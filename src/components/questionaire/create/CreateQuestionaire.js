import React, { useState, useContext, useEffect, useRef } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "/styles/Appointment.module.css";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";
import BoxFeild from "./BoxFeild";
import AnswerField from "./AnswerFeild";
import { Alert, Badge, Button } from "reactstrap";


const CreateQuestionaire = (props) => {
  const global = useContext(MainContext);
  const [folders, setFolders] = useState([]);
   const questionGroup = useRef();
   const questionFolder = useRef();
   const [answerType, setAnswerType] = useState("radio");
  const changeAnswerType = (e) => {
    const questionName = e.target.getAttribute("data-attribute");
    const newValue = e.target.value;
    setAnswerType(newValue);
    const currentQuestionaire = { ...global?.questionaireState?.questionaire };
    if (currentQuestionaire.hasOwnProperty(questionName)) {
      const updatedQuestion = {
        ...currentQuestionaire[questionName],
        answers: currentQuestionaire[questionName]?.answers?.map((answer) => ({
          ...answer,
          answerType: newValue,
        })),
      };
      currentQuestionaire[questionName] = updatedQuestion;
      global.questionaireState.setQuestionaire(currentQuestionaire);
    }
  };
  const fetchQuestionFolders = async ()=>{
    try {
      const result = await global.getAllFolder();
      if (result?.status && result?.result?.status) {
        setFolders(result.result.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, While Fetching Doctors",
      });
    }
  }
  useEffect(()=>{
    fetchQuestionFolders();
  },[])

  const defaultDate = new Date('2023-10-08');
  const formattedDate = defaultDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const [answerFields, setAnswerFields] = useState([]);

  const [boxFeilds, setBoxFeilds] = useState([]);

  const getQuestions = (e) => {
    const questionName = e.target.name;
    const updatedQuestion = {
      ...global.questionaireState.questionaire[questionName],
      question: e.target.value,
    };

    global.questionaireState.setQuestionaire({
      ...global.questionaireState.questionaire,
      [questionName]: updatedQuestion,
    });
  };

  const getAnswer = (e) => {
    const questionName = e.target.getAttribute("data-attribute");
    const answerName = e.target.name;
    const answerValue = e.target.value;

    // Retrieve the current questionaire state
    const currentQuestionaire = { ...global.questionaireState.questionaire };

    if (currentQuestionaire.hasOwnProperty(questionName)) {
      // If the question exists, create or update the answers array
      if (!currentQuestionaire[questionName].answers) {
        currentQuestionaire[questionName].answers = [];
      }

      // Check if an answer with the same name already exists
      const existingAnswer = currentQuestionaire[questionName].answers.find(
        (answer) => answer[answerName]
      );

      if (existingAnswer) {
        // Update the existing answer
        existingAnswer[answerName].answer = answerValue;
      } else {
        // Create a new answer object
        currentQuestionaire[questionName].answers.push({
          [answerName]: {
            answer: answerValue,
            isLinked: false,
            answerType: answerType,
          },
          answerType: answerType,
        });
      }
    } else {
      // If the question doesn't exist, create a new question with the answer as an array
      currentQuestionaire[questionName] = {
        question: "",
        answers: [
          {
            [answerName]: {
              answer: answerValue,
              isLinked: false,
              answerType: answerType,
            },
            answerType: answerType,
          },
        ],
      };
    }

    // Set the updated questionaire state
    global.questionaireState.setQuestionaire(currentQuestionaire);
  };

  const addBoxx = () => {
    setBoxFeilds([...boxFeilds, <BoxFeild answerType={answerType} changeAnswerType={changeAnswerType} questionRnadomId={global.rand()} randomId={global.rand()} getAnswer={getAnswer} getQuestions={getQuestions} key={boxFeilds.length} />]);
  };
  const addAnswerField = (questionId) => {
    setAnswerFields([...answerFields, <AnswerField answerType={answerType}  randomId={global.rand()} getAnswer={getAnswer} questionId={questionId} key={answerFields.length} />]);
  };
  const isLinked = (e) => {

  }
  const save = async () => {
    try {
      const data = {
        totalQuestion:global.questionaireState.questionaire,
        questionGroup:questionGroup.current.value,
        questionFolderId:questionFolder.current.value
      }
      await global.createQuestionaire(data)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } 
  }
  function currentDate(){
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getUTCDay()];
    const month = months[currentDate.getUTCMonth()];
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
   return `New - ${dayOfWeek}, ${month} ${day}, ${year}`;
     
  }
  return (
    <>
      {global.pageLoader.primeReactLoader && <div className={styles.overlay}>
        <ProgressSpinner style={{ width: '180px', height: '180px' }} animationDuration=".5s" />
      </div>}
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <lable>Enter Questionaire Name</lable>
              <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} ref={questionGroup} type="text" defaultValue={currentDate()} name="questionGroupName" className="form-control my-1" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <lable>Select Folder</lable>
              <select style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} ref={questionFolder} className="form-control">
                {folders && folders.map((folder,index)=>{
                  return (
                    <option key={index} value={folder._id}>{folder.name}</option>
                    )    
                })}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <Button
              color="secondary"
              className="ms-3 my-4"
              outline
              onClick={addBoxx}
            >
              <i className="bi bi-plus-circle"></i> Add More Question
              <Badge color="secondary"></Badge>
            </Button>

          </div>
          <div className="col-md-3">
            <Button
              color="secondary"
              className="ms-3 my-4"
              outline
              onClick={save}
            >
              <i className="bi bi-plus-circle"></i> Save
              <Badge color="secondary"></Badge>
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Question Name</label>
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} type="text" onChange={getQuestions} name="question00" className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Select Answer Type</label>
                  <select style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} data-attribute={`question00`} onChange={changeAnswerType} name="question00" id="" className="form-control">
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="calendar">Calender</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="images">Image</option>
                    <option value="video">Video</option>
                    <option value="table">Table</option>
                    <option value="range">Range</option>
                    <option value="signature">Signature</option>
                    <option value="label">Label First</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check my-4">
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} className="form-check-input" type="checkbox" value="" id="" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    isRequired
                  </label>
                </div>
              </div>
            </div>
            <button type="button" onClick={() => addAnswerField("question00")} className="btn btn-primary my-3">Add More Answers</button>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="">Enter Answer</label>
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} data-attribute="question00" name="answer00" onChange={getAnswer} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check my-4">
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} onChange={isLinked} className="form-check-input" type="checkbox" value="" id="" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    isLinked
                  </label>
                </div>
              </div>
              {answerFields.map((field) => field)}
            </div>
          </div>
        </div>
        {boxFeilds.map((field) => field)}
      </div>
    </>
  );
};
export default CreateQuestionaire;
