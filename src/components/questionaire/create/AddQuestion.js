import React, { useState, useContext, useEffect } from "react";
import MainContext from "../../../app/context/context";
import Swal from "sweetalert2";

const AddQuestion = ({ group, setOpenAddQuestionModal, handleSearchQuestion }) => {

  const global = useContext(MainContext);

  const [checkState, setCheckState] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    questionGroupId: group?.id,
    name: "",
    isRequired: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  useEffect(() => {
    setUpdatedData({
      ...updatedData,
      questionGroupId: group?.id,
    });
  }, [group?.id, group?.name]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await global?.addQuestionWIthGroupId(updatedData);
      setOpenAddQuestionModal(false);
      await handleSearchQuestion("non-default");
    } catch (error) {
      console.log("error?.message", error?.message);
      Swal.fire({
        icon: "error",
        text: "Something Went Wrong",
      });
    }
  };
  const handCheckChange = () => {
    setCheckState(!checkState);
    setUpdatedData({ ...updatedData, isRequired: !checkState });
  };
  const [selectedOption, setSelectedOption] = useState("all");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
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
          <h4 className="card-title">Add Question</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Question Name</label>
                  <input
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Group</label>
                  <select
                    style={{
                      backgroundColor: global?.theme?.backgroundColor,
                      color: global?.theme?.inputColor,
                    }}
                    disabled
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleSelectChange}
                  >
                    <option value={group?.id}>{group?.name}</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check my-4">
                  <input
                    type="checkbox"
                    name="isRequired"
                    onChange={handCheckChange}
                    checked={checkState}
                    className="form-check-input"
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Is Required
                  </label>
                </div>
              </div>
              <div className="col-md-3 my-1">
                <button
                  className="btn btn-primary my-1"
                  onClick={handleSubmit}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default AddQuestion;
