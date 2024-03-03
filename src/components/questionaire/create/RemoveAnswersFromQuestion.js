import React, { useState, useContext, useEffect } from "react";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";
import _ from "lodash";

const RemoveAnswersFromQuestion = ({ answerToDeleteQuestions, deleteQuestionById, setOpenRemoveQuestionFromAnswers }) => {
  const global = useContext(MainContext);
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    if (!_?.isEmpty(answerToDeleteQuestions?._id)) {
      setAnswer(answerToDeleteQuestions);
    }
  }, [answerToDeleteQuestions])

  const unLinkQuestionsFromAnswers = async (questionId) => {
    try {
      await global?.unLinkQuestionsFromAnswers(answerToDeleteQuestions?._id,questionId);
      await getQuestionsOfAnswer();
    } catch (error) {
      console.log("error.message", error.message)
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })

    }
  }
  const [questionsOfAnswers, setQuestionsOfANswers] = useState([]);
  const getQuestionsOfAnswer = async () => {
    try {
      const questionsOfAnswer = await global?.getQuestionsOfAnswer(answerToDeleteQuestions?._id);
      if (questionsOfAnswer?.status) {
        setQuestionsOfANswers(questionsOfAnswer?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try againer",
          text: `${appointments?.result?.msg}`,
        })
      }
    } catch (error) {
      console.log("error.message", error.message)
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })
    }
  };

  useEffect(() => {
    getQuestionsOfAnswer()
  }, []);


  return (
    <>
      <div
        style={{
          backgroundColor: global?.theme?.backgroundColor,
          color: global?.theme?.inputColor,
        }}
        className="card">
        <div className="card-header">
          <h4 className="card-title">Questions for <b>{answer?.answer}</b></h4>
        </div>
        <div className="card-body">
          <table className="table">
            <tbody>
              {questionsOfAnswers?.linkedQuestion?.map(x => (
                <>
                  <tr>
                    <td 
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}>{x?.questionId?.name}</td>
                    <td style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}></td>
                    <td style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.color,
                    }}><i onClick={() => unLinkQuestionsFromAnswers(x?.questionId?._id)} className="bi bi-trash"></i></td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default RemoveAnswersFromQuestion;
