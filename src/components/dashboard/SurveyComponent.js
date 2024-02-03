import React from "react";
import "survey-react/survey.css";
import { Survey, Model, CustomWidgetCollection } from "survey-react";
import styles from "/styles/Settings.module.css";
import MatrixButtonRenderer from "./MatrixButtonRenderer";

const json = {
  elements: [
    {
      type: "boolean",
      name: "virtualCare",
      title: "Virtual Care",
      label: "Virtual Care Disabled",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "phoneCallsPreCallIndividual",
      title: "Pre-call Patients (Individual)",
      label:
        "When there is less than one appointment ahead (<= 5 minute estimated wait), the system will call the patient and ask them to wait on the line for the practitioner to join.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "phoneCallsPreCallCompanyWide",
      title: "Pre-call Patients (Company-Wide)",
      label:
        "When there is less than one appointment ahead (<= 5 minute estimated wait), the system will call the patient and ask them to wait on the line for the practitioner to join.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "matrix",
      name: "AppointmentMedium",
      title: "Appointment Medium",
      columns: [
        { value: 1, text: "Appointment booking at physical locations" },
        { value: 2, text: "Video appointments" },
        { value: 3, text: "Phone appointments" },
        { value: 4, text: "Messaging appointments" },
      ],
      rows: [
        { value: "On", text: "Enabled" },
        { value: "Off", text: "Disabled" },
      ],
      isAllRowRequired: true,
      renderAs: "custom-matrix",
    },
    // Add more questions following a similar structure
    // ...
  ],
  showQuestionNumbers: false,
};

const CustomSliderRenderer = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value === "on");
  };

  return (
    <div>
      <label className={styles["sjs-off-label"]}>Off</label>
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        value={props.question.value ? "1" : "0"}
        onChange={handleChange}
      />
      <label className={styles["sjs-on-label"]}>On</label>
    </div>
  );
};

CustomWidgetCollection.Instance.addCustomWidget({
  name: "custom-matrix",
  widgetIsLoaded: () => true,
  isFit: (question) => question.getType() === "matrix",
  render: (question, el) => {
    return <MatrixButtonRenderer question={question} />;
  },
});

const SurveyComponent = () => {
  const survey = new Model(json);
  const shouldRenderMatrixButton = typeof window !== "undefined";

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  return (
    <Survey model={survey}>
      {shouldRenderMatrixButton && <MatrixButtonRenderer />}
    </Survey>
  );
};

export default SurveyComponent;
