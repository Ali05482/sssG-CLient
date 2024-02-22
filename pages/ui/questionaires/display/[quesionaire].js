import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { DateRangePicker, Stack } from 'rsuite';

import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  Input,
} from "@mui/material";
import { ProgressSpinner } from "primereact/progressspinner";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainContext from "../../../../src/app/context/context";
import _ from "lodash";
import Swal from "sweetalert2";
import styles from "/styles/Appointment.module.css";
import LoadingBar from "react-top-loading-bar";
const DecisionMaker = React.memo(({ decisionTaker, value, label, questionId, question, ans, linkedQues, questionIndex, selectedAnswer, setSelectedAnswer, handleChange, handleImageUpload }) => {
  const isSelected = selectedAnswer[questionId] === label;
  const handleSelectionChange = () => {
    setSelectedAnswer((prevSelectedAnswer) => ({
      ...prevSelectedAnswer,
      [questionId]: label,
    }));
    handleChange(questionId, label, decisionTaker, question, ans, null, linkedQues, questionIndex);
  };


  if (decisionTaker === "radio") {
    return (
      <div className="col-md-6 my-1">
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value={isSelected ? label : ''}
              checked={isSelected}
              onChange={handleSelectionChange}
              style={{ width: '1.1em', height: '1.1em' }}
              id={value}
            />
            <label style={{ fontWeight: "500" }} className="form-check-label" htmlFor={value}>
              {label}
            </label>
          </div>
          {value === 'other' && (
            <textarea
              className="form-control"
              id={value}
              name={ans?._id}
              value={ans.value}
              onChange={(e) => handleChange(questionId, label, decisionTaker, question, ans, e?.target?.value)}
            />
          )}
        </div>
      </div>


      // <div className="col-md-6">
      // <FormControl component="fieldset">
      //   <RadioGroup value={isSelected ? label : ''} onChange={handleSelectionChange}>
      //     <FormControlLabel
      //       id={value}
      //       value={label}
      //       control={<Radio checked={isSelected} />}
      //       label={label}
      //     />
      //   </RadioGroup>
      //   {value === "other" ?
      //     <>
      //       <textarea
      //         className="form-control"
      //         id={value}
      //         name={ans?._id}
      //         value={ans.value}
      //         onChange={(e) => handleChange(questionId, label, decisionTaker, question, ans, e?.target?.value)}
      //       />
      //     </>
      //     : ""}
      // </FormControl>
      // </div>
    );
  } else if (decisionTaker === "checkbox") {
    return (
      <div className="col-md-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={value}
            checked={ans.checked}
            onChange={(e) => handleChange(questionId, label, decisionTaker, question, ans, null, linkedQues, questionIndex, e?.target?.checked, handleImageUpload)}
          />
          <label style={{ fontWeight: "500" }} className="form-check-label" htmlFor={value}>
            {label}
          </label>
        </div>
      </div>

      // <div className="col-md-3">
      //   <FormControlLabel
      //     value={value}
      //     control={
      //       <Checkbox
      //         checked={ans.checked}
      //         onChange={(e) => handleChange(questionId, label, decisionTaker, question, ans, null, linkedQues, questionIndex, e?.target?.checked, handleImageUpload)}
      //       />
      //     }
      //     label={label}
      //   />
      // </div>
    );
  } else if (decisionTaker === "text" || decisionTaker === "number") {
    return (
      <textarea
        required
        className="form-control"
        id={value}
        name={ans?._id}
        value={ans.value}
        onChange={(e) => handleChange(questionId, label, decisionTaker, question, ans, e?.target?.value)}
      />
    );
  } else if (decisionTaker === "images") {
    return (
      <div style={{ display: 'flex' }}>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Select Files
          <input
            type="file"
            encType="multipart/form-data"
            multiple={true}
            onChange={(e) => handleChange(questionId, e?.target?.files, decisionTaker, question, ans)}
            style={{ display: 'none' }}
          />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          style={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={() => handleImageUpload(ans?._id)}
        >
          Upload
        </Button>
      </div>

    );
  } else if (decisionTaker === "range") {
    return (
      <div className="form-group">
        <input
          type="range"
          id={value}
          name={value}
          min={0}
          max={label}
          step={3}
          value={ans.value}
          defaultValue={0}
          onChange={(e) => handleChange(questionId, e.target.value, decisionTaker, question, ans)}
          className="form-control-range"
        />
      </div>
      // <FormControl>
      //   <Input
      //     type="range"
      //     id={value}
      //     name={value}
      //     min={0}
      //     max={label}
      //     step={3}
      //     value={ans.value}
      //     defaultValue={0}
      //     onChange={(e) => handleChange(questionId, e.target.value, decisionTaker, question, ans)}
      //   />
      // </FormControl>
    );
  } else if (decisionTaker === "calendar") {
    return (
      <FormControl>
        <DateRangePicker />
      </FormControl>
    );
  } else {
    return null;
  }
});


DecisionMaker.displayName = 'DecisionMaker';


const Display = ({ appointment }) => {
  function extractQuestionIds(obj) {
    const questionIds = [];
    function traverse(obj) {
      for (const key in obj) {
        if (key === "questionId") {
          if (typeof obj[key] === "object") {
            questionIds.push(obj[key]._id);
          } else {
            questionIds.push(obj[key]);
          }
        } else if (key === "linkedQuestion" && Array.isArray(obj[key])) {
          obj[key].forEach(linkedQ => {
            traverse(linkedQ.questionId);
          });
        } else if (typeof obj[key] === "object") {
          traverse(obj[key]);
        }
      }
    }

    traverse(obj);

    return questionIds;
  }
  const router = useRouter();
  const global = useContext(MainContext);
  const [questionaires, setQuestionaires] = useState([]);
  const [formData, setFormData] = useState({});
  const [checkboxState, setCheckboxState] = useState([]);
  const [radioQuestion, setRadioQuestion] = useState([]);
  const [imagesState, setImagesState] = useState([]);
  const [rangeState, setRangeState] = useState({})
  const [calenderState, setCalenderState] = useState({})
  const [textState, setTextState] = useState({});
  const [radioState, setRadioState] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const fetchAllQuestion = useCallback(async (questionId) => {
    // const totalQuestonaires = await global.getQuestionaire(questionId);
    // if (totalQuestonaires?.status) {
    //   setQuestionaires(totalQuestonaires?.result?.data?.questionId);
    // }
    const questions = await fetch("https://sssg-server.vercel.app/api/v1/question-group/getAllQuestionAnswer/65c88a026a5a6b1b14cd3a39");
    const data = await questions.json();
    if (data?.status) {
      setQuestionaires(data?.data?.questionId);
    }
  }, [global]);

  useEffect(() => {
    fetchAllQuestion(router.query.quesionaire);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  // Client-side JavaScript function to upload files
  const uploadFiles = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
      console.log("files", files[i])
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch('https://sss-g-server.vercel.app/api/v1/upload/questionnaire', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        return { status: false, message: 'Upload failed', data: null };
      }

      const result = await response.json();
      return result
    } catch (error) {
      return { status: false, message: 'Upload failed', data: null };
    }
  }
  const handleImageUpload = useCallback(async (answerId) => {
    const values = imagesState?.find(x => x?.answerId === answerId);
    if (_.isEmpty(values)) {
      Swal.fire({ icon: "warning", title: "Please Select Files", text: "If you already uploaded files Or uploading first time, please select files to add / update, " });
      return;
    };
    const filesLinks = await uploadFiles(values?.value);
    if (filesLinks?.status) {
      const updatedImageState = [...imagesState];
      const newImagesData = updatedImageState?.filter(x => x?.answerId !== answerId);
      setImagesState(newImagesData);
      const updatedFormData = { ...formData };
      const updatedQuestions = updatedFormData?.data?.filter(x => x?.question_id !== values?.questionId);
      const data = {
        question_id: values?.questionId,
        questionName: values?.questionName,
        answers: [{
          value: filesLinks?.data,
          answerId: values?.answerId,
          answerType: "images",
        }],
      };
      updatedQuestions?.push(data);
      updatedFormData.data = updatedQuestions;
      setFormData(updatedFormData);
      Swal.fire({ icon: "success", title: "Files Saved Successfully" });
    } else {
      Swal.fire({ icon: "error", title: "Something Went Wrong, try again" });
    }
  },
    [imagesState]);
  const handleLink = useCallback((data, customQuestionaires, afterDestruction) => {
    if (data?.linkedQues?.length > 0) {
      const updatedQuestionnaires = customQuestionaires?.slice(0, data?.questionIndex + 1);
      data?.linkedQues?.forEach(x => {
        updatedQuestionnaires.push(x?.questionId);
      });
      const remainingQuestions = customQuestionaires?.slice(data?.questionIndex + 1);
      updatedQuestionnaires.push(...remainingQuestions);
      setQuestionaires(updatedQuestionnaires);
    }
    data?.updateStateAndFormData(data?.radioState, data?.setRadioState, data?.dataType);
    if (!_.isUndefined(afterDestruction)) {
      setFormData({ data: afterDestruction });
    }
  }, [setQuestionaires, setFormData]);

  const handleDestroyQuestions = useCallback((previousAnswerId, questionId, data) => {
    let answerData;
    for (let i = 0; i < questionaires?.length; i++) {
      for (let j = 0; j < questionaires[i]?.answers?.length; j++) {
        if (previousAnswerId?.toString() === questionaires[i]?.answers[j]?._id?.toString()) {
          answerData = questionaires[i]?.answers[j];
          break;
        }
      }
    }

    if (!_.isEmpty(answerData)) {
      const questionIdsToRemove = extractQuestionIds(answerData);
      const uniqueQuestionIds = [...new Set(questionIdsToRemove)];
      const filteredQuestions = uniqueQuestionIds.filter(x => x !== questionId);
      let updatedQuestionaire = [...questionaires];
      updatedQuestionaire = updatedQuestionaire?.filter(obj => !filteredQuestions?.includes(obj._id));
      console.log("updatedQuestionaire", updatedQuestionaire);
      const idsToSearch = updatedQuestionaire?.map(x => x?._id);
      const currentData = formData?.data?.map(x => x?.question_id);
      const filteredData = currentData?.filter(x => idsToSearch?.includes(x));
      // update from data
      const updatedFormData = { ...formData };
      const filteredFormData = updatedFormData?.data?.filter(x => filteredData?.includes(x?.question_id));
      if (!_?.isUndefined(data)) {
        handleLink(data, updatedQuestionaire, filteredFormData);
        if (!(data?.linkedQues?.length > 0)) {
          setQuestionaires(updatedQuestionaire);
        }
      } else {
        setQuestionaires(updatedQuestionaire);
      }

    }
  }, [questionaires]);

  const handleChange = useCallback(async (questionId, value, type, question, ans, textVal, linkedQues, questionIndex, checked) => {
    const updateStateAndFormData = (state, setState, dataType) => {
      // setState((prevState) => ({
      //   ...prevState,
      // }));
      const updatedFormData = { ...formData };
      if (updatedFormData.data === undefined) {
        updatedFormData.data = [];
      }
      const questionIndex = updatedFormData?.data?.findIndex((item) => item?.question_id === questionId);
      if (questionIndex !== -1) {
        updatedFormData.data[questionIndex].answers = dataType;
      } else {
        updatedFormData.data.push({
          question_id: questionId,
          questionName: question?.name,
          answers: dataType,
        });
      }
      setFormData(updatedFormData);
    };

    if (type === 'radio') {
      const dataType = [{
        value: [value],
        answerId: ans._id,
        answerType: type,
      }];

      // New Code Started
      let previousAnswerId = "";
      const previousAnswer = radioQuestion?.find(x => x?.question_id === questionId);
      if (!_?.isUndefined(previousAnswer)) {
        previousAnswerId = previousAnswer?.answer_id;
        const filteredQuestions = radioQuestion?.filter(x => x?.question_id !== questionId);
        const updatedRadioQuestions = [
          ...filteredQuestions,
          {
            question_id: questionId,
            answer_id: ans._id?.toString()
          }
        ];
        setRadioQuestion(updatedRadioQuestions);
        handleDestroyQuestions(previousAnswerId, questionId, { linkedQues, questionaires, questionIndex, questionId, value, radioState, setRadioState, dataType, updateStateAndFormData });
      } else {
        const updatedRadioQuestions = [
          ...radioQuestion,
          {
            question_id: questionId,
            answer_id: ans._id?.toString()
          }
        ];
        setRadioQuestion(updatedRadioQuestions);
        handleLink({ linkedQues, questionaires, questionIndex, questionId, value, radioState, setRadioState, dataType, updateStateAndFormData }, questionaires)
      }
      // New Code Ended
    }
    else if (type === 'checkbox') {
      if (checked) {
        handleLink({ linkedQues, questionaires, questionIndex, questionId, value, radioState, setRadioState, dataType, updateStateAndFormData }, questionaires)
      } else {
        handleDestroyQuestions(ans?._id, questionId);
      }
      const updatedCheckboxState = { ...checkboxState };

      if (!updatedCheckboxState[questionId]) {
        updatedCheckboxState[questionId] = [];
      }
      const existingItemIndex = updatedCheckboxState[questionId].findIndex(item => item.value === value);
      if (existingItemIndex !== -1) {
        updatedCheckboxState[questionId].splice(existingItemIndex, 1);
      } else {
        updatedCheckboxState[questionId].push({
          value: value,
          answerId: ans?._id,
          answerType: type,
        });
      }
      setCheckboxState(updatedCheckboxState);
      const dataType = updatedCheckboxState[questionId].map(item => ({
        value: [item.value],
        answerId: item.answerId,
        answerType: item.answerType,
      }));
      updateStateAndFormData(checkboxState, setCheckboxState, dataType);
    }
    else if (type === 'text' || type === 'number') {
      const updatedTextState = {
        ...textState,
        [ans?._id]: textVal,
      };
      setTextState(updatedTextState);
      const dataType = [{
        value: [textVal],
        answerId: ans._id,
        answerType: type,
      }];
      updateStateAndFormData(textState, setTextState, dataType);
    }
    else if (type === 'files') {
      let updatedImageState = [...imagesState];
      updatedImageState?.filter(x => x?.answerId !== ans?._id);
      updatedImageState?.push({ value: value, answerId: ans?._id, questionId: questionId, questionName: question?.name });
      setImagesState(updatedImageState)
    }
    else if (type === 'range') {
      setRangeState((prevRangeState) => ({
        ...prevRangeState,
        [questionId]: value,
      }));
      const dataType = [{
        value: [value],
        answerId: ans?._id,
        answerType: type,
      }];
      updateStateAndFormData(rangeState, setRangeState, dataType);
    }
    else if (type === 'calendar') {
      setCalenderState((prevRangeState) => ({
        ...prevRangeState,
        [questionId]: value,
      }));
      const dataType = [{
        value: [value],
        answerId: ans?._id,
        answerType: type,
      }];
      updateStateAndFormData(calenderState, setRangeState, dataType);
    }
  }, [questionaires]);

  const submitForm = async () => {
    try {
      if (imagesState?.length > 0) {
        Swal.fire({ icon: "warning", title: "Pending Files", text: "There are some files which are not uploaded, please upload them first" });
        return;
      }
      console.log("appointment", appointment)
      await global?.collectAnswer(formData, appointment);
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Something Went Wrong, contact admin" });
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <LoadingBar
          color="#0000FF"
          progress={global.pageLoader.pageLoading}
          onLoaderFinished={() => global.pageLoader.setPageLoading(0)}
        />
        {global.pageLoader.primeReactLoader && (
          <div className={styles.overlay}>
            <ProgressSpinner
              style={{ width: "180px", height: "180px" }}
              animationDuration=".5s"
            />
          </div>
        )}
        <Card
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <CardContent>
            <form style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <div className="container">
                  {questionaires?.map((questionare, index) => (
                    <div key={index} className="row">
                      <div className="col-md-12">
                        <FormControl component="fieldset">
                          <strong>{questionare?.name}</strong>
                          <FormGroup>
                            <div className="row">
                              {questionare?.answers?.map((answer, ansIndex) => (
                                <DecisionMaker
                                  key={ansIndex}
                                  decisionTaker={answer?.answerType}
                                  value={answer?.answer}
                                  label={answer.answer}
                                  questionId={questionare?._id}
                                  question={questionare}
                                  ans={answer}
                                  linkedQues={answer?.linkedQuestion}
                                  questionIndex={index}
                                  selectedAnswer={selectedAnswer}
                                  setSelectedAnswer={setSelectedAnswer}
                                  handleChange={handleChange}
                                  handleImageUpload={handleImageUpload}
                                />
                              ))}
                            </div>
                          </FormGroup>
                        </FormControl>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    style={{ marginTop: "1rem" }}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const appointment = query.appointment || '';

  return {
    props: { appointment },
  };
}

export default Display;
