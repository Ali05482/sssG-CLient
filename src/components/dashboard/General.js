import React from "react";
import CustomSwitch from "/src/components/settings/CustomSwitch.js";
import styles from "/styles/Settings.module.css";
import FormFromJSON from "../settings/FormFromJSON";
import Head from "next/head";
import AVAILABILITY from "./AVAILABILITY";

const json = {
  elements: [
    {
      type: "boolean",
      name: "virtualCare",
      title: "Virtual Care",
      label: "Virtual Care Enabled",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "phoneCallsPreCallIndividual",
      title: "Phone Calls",
      label: `Pre-call Patients (Individual): When there is less than one appointment ahead (<= 5 minute estimated wait), the system will call the patient and ask them to wait on the line for the practitioner to join.`,
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "phoneCallsPreCallCompanyWide",
      title: "Phone Calls",
      label:
        "Pre-call Patients (Company-Wide): When there is less than one appointment ahead (<= 5 minute estimated wait), the system will call the patient and ask them to wait on the line for the practitioner to join.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "section", // This is a new type to represent a section
      name: "appointmentMedium",
      title: "Appointment Medium",
      sections: [
        {
          name: "physicalLocations",
          label: "Appointment booking at physical locations",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
        {
          name: "videoAppointments",
          label: "Video appointments",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
        {
          name: "phoneAppointments",
          label: "Phone appointments",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
        {
          name: "messagingAppointments",
          label: "Messaging appointments",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
      ],
    },
    {
      type: "boolean",
      name: "QuickBook",
      title: "Quick Book",
      label:
        "Enable the 'Quick Book' button on the virtual care portal to make it easier for patients to select the earliest appointment.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "PatientPharmacySelection",
      title: "Patient Pharmacy Selection",
      label:
        "Require patients to enter their pharmacy upon creating an account to book an appointment.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "boolean",
      name: "PublicBillingHealthcardValidation",
      title: "Public Billing Healthcard Validation",
      label: "Validate healthcards for appointments not requiring payment.",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "section",
      name: "Notifications",
      title: "Notifications",
      sections: [
        {
          name: "BookedAppointments",
          label: "Booked Appointments",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
        {
          name: "Appointments Reminders",
          label: "Appointments Reminders",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
        {
          name: "Cancellations",
          label: "Cancellations",
          type: "boolean",
          valueTrue: "On",
          valueFalse: "Off",
          renderAs: "custom-slider",
        },
      ],
    },
    {
      type: "boolean",
      name: "ReferralRequirement",
      title: "Referral Requirement",
      label: "Require Referral to Book Appointment",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "button",
      name: "DefaultQuestionnaire",
      title: "Default Questionnaire",
      label: "No Default Questionnaire Selected",
    },
    {
      type: "boolean",
      name: "MedicalNotes",
      title: "Medical Notes",
      label: "Default Visiblity to Patient",
      valueTrue: "On",
      valueFalse: "Off",
      renderAs: "custom-slider",
    },
    {
      type: "section",
      name: "MinimumLeadTime",
      title: "Minimum Lead Time",
      label: "(time from booking, to the appointment)",
      sections: [
        {
          type: "number",
          name: "leadTimeHours",
          label: "Number of hours:",
          min: 0,
          max: 24, // Modify the max value as needed
        },
        {
          type: "select",
          name: "leadTimeIncrement",
          label: "Increment:",
          options: [
            { value: "hours", text: "Hours" },
            { value: "minutes", text: "Minutes" },
            { value: "days", text: "Days" },
          ],
        },
      ],
    },
  ],
  showQuestionNumbers: false,
};

const General = () => {
  return (
    <div id="hero">
      <Head>
        <link href="/settings/assets/css/style.css" rel="stylesheet" />
      </Head>
      <FormFromJSON json={json} />
    </div>
  );
};

export default General;
