import React, { useState, useContext, useEffect } from "react";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";

const AddAnswersToQuestions = ({ question, setOpenAddAnswersModal, handleSearchQuestion }) => {

  const global = useContext(MainContext);

  const [updatedData, setUpdatedData] = useState({
    questionId: question?.id,
    answer: "",
    answerType: "radio",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  useEffect(() => {
    setUpdatedData({
      ...updatedData,
      questionId: question?.id,
    });
  }, [question?.id, question?.name]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await global?.addAnswerWithQuestionId(updatedData);
      setOpenAddAnswersModal(false);
      await handleSearchQuestion("non-default");
    } catch (error) {
      console.log("error?.message", error?.message);
      Swal.fire({
        icon: "error",
        text: "Something Went Wrong",
      });
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: global?.theme?.backgroundColor,
          color: global?.theme?.inputColor,
        }}
        className="card"
      >
        <div className="card-header">
          <h4 className="card-title">Add Answer</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Answer Name</label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    name="answer"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Answer Type</label>
                  <select
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    name="answerType"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  >
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
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Question</label>
                   <textarea
                   style={{
                    backgroundColor: global?.theme?.backgroundColor,
                    color: global?.theme?.inputColor,
                  }}
                   className="form-control">
                    {question?.name}
                   </textarea>
                </div>
              </div>
              <div className="col-md-3 my-1">
                <button
                  className="btn btn-primary my-1"
                  onClick={handleSubmit}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default AddAnswersToQuestions;
