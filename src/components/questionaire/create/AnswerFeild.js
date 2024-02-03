import React, { useState, useContext } from 'react';
import MainContext from "../../../app/context/context";
 
function AnswerField(props) {
  const global = useContext(MainContext)
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
            answerType: props.answerType,
          },
          answerType: props.answerType,
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
              answerType: props.answerType,
            },
            answerType: props.answerType,
          },
        ],
      };
    }

    // Set the updated questionaire state
    global.questionaireState.setQuestionaire(currentQuestionaire);
  };
  const [isLinked, setIsLinked] = useState(false);

  return (
    
      <>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="">Enter Answer</label>
            <input style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} onChange={getAnswer} type="text" data-attribute={props?.questionId} name={`answer${props.randomId}`} className="form-control" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-check my-4">
            <input
            style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}
              className="form-check-input"
              type="checkbox"
              value=""
              id=""
              checked={isLinked}
              onChange={(e) => setIsLinked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              isLinked
            </label>
          </div>
        </div>
      </>
   
  );
}

export default AnswerField;
