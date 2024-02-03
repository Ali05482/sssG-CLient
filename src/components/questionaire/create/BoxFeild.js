import React, {useState, useContext} from 'react'
import AnswerField from './AnswerFeild';
import MainContext from "../../../app/context/context";

const BoxFeild = (props) => {
  const global = useContext(MainContext)
    const [answerFields, setAnswerFields] = useState([]);
    const [answerType, setAnswerType] = useState("radio")
  const addAnswerField = (questionId) => {
    const randomId = global.rand();
   
    setAnswerFields([...answerFields, <AnswerField answerType={answerType} randomId={randomId} getAnswer={props.getAnswer} questionId={questionId} key={answerFields.length} />]);
  };
  const changeAnswerType = (e) => {
    const questionName = e.target.getAttribute("data-attribute");
    const newValue = e.target.value;
    setAnswerType(newValue);
    // Retrieve the current questionaire state
    const currentQuestionaire = { ...global.questionaireState.questionaire };

    // Check if the question already exists in the state
    if (currentQuestionaire.hasOwnProperty(questionName)) {
      // If the question exists, update the answerType for all answers in that question
      const updatedQuestion = {
        ...currentQuestionaire[questionName],
        answers: currentQuestionaire[questionName].answers?.map((answer) => ({
          
          ...answer,
          answerType: newValue,
        })),
      };

      // Update the questionaire state with the updated question
      currentQuestionaire[questionName] = updatedQuestion;

      // Set the updated questionaire state
      global.questionaireState.setQuestionaire(currentQuestionaire);
    }
  };
  const isLinked = (e) => {

  }
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
              answerType: "radio",
            },
            answerType: answerType,
          },
        ],
      };
    }

    // Set the updated questionaire state
    global.questionaireState.setQuestionaire(currentQuestionaire);

  };
  return (
    <>
         <div className="row">
          <div className="col-md-12">
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Enter Question Name</label>
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} type="text" onChange={getQuestions} name={`question${props.questionRnadomId}`} className="form-control" />
                </div>
              </div>
            
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Select Answer Type</label>
                  <select style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} data-attribute={`question${props.questionRnadomId}`} onChange={changeAnswerType} name="answerType" id="answerType" className="form-control">
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="boolean">Yes / No</option>
                    <option value="calendar">Calender</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="images">Image</option>
                    <option value="video">Video</option>
                    <option value="table">Table</option>
                    <option value="range">Range</option>
                    <option value="signature">Signature</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check my-4">
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} className="form-check-input" type="checkbox" value="" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    isRequired
                  </label>
                </div>
              </div>
            </div>
            <button type="button" onClick={()=>addAnswerField(`question${props.questionRnadomId}`)} className="btn btn-primary my-3">Add More Answers</button>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="">Enter Answer</label>
                  <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} onChange={getAnswer} type="text" data-attribute={`question${props.questionRnadomId}`} name={`answer${props.randomId}`} className="form-control" />
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
    </>
  )
}

export default BoxFeild
