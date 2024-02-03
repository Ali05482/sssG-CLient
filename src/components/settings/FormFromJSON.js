import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import CustomSwitch from "./CustomSwitch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const   FormFromJSON = ({ json }) => {
  const [formValues, setFormValues] = React.useState({});
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const inputStyle = {
    height: "38px",
    width: "150px",
  };
  const handleSubmit = (values) => {
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    // Update the state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <link href="/settings/assets/css/style.css" rel="stylesheet" />
      </Head>
      <Formik initialValues={formValues} onSubmit={handleSubmit}>
        <Form>
          <div className="container">
            <div className="section-title">
              <h2>General</h2>
            </div>
          </div>
          {json.elements.map((element) => {
            if (
              element.type === "section" &&
              element.name === "MinimumLeadTime"
            ) {
              return (
                <div
                  key={element.name}
                  className={`mainContainer ${
                    isMobile ? "flex-column justify-content-center" : "flex-row"
                  }`}
                >
                  <div className="leftSection">
                    <p  style={{ fontSize: "22px" }}>
                      {element.title}
                    </p>
                    <p style={{ fontSize: "12px" }}>{element.label}</p>
                  </div>
                  <div className="rightSections">
                    {element.sections.map((subsection) => {
                      if (subsection.type === "number") {
                        return (
                          <div key={subsection.name} className="switchSection">
                            <p style={{ fontSize: "12px" }}>
                              {subsection.label}
                            </p>
                            <TextField
                              type="number"
                              label=""
                              variant="outlined"
                              InputProps={{
                                inputProps: {
                                  min: 0,
                                  max: 100,
                                  step: 1, 
                                },
                                style: inputStyle,
                              }}
                            />{" "}
                          </div>
                        );
                      } else if (subsection.type === "select") {
                        return (
                          <>
                            <div
                              key={subsection.name}
                              className="switchSection"
                            >
                              <p style={{ fontSize: "12px" }}>
                                {subsection.label}
                              </p>
                              <Select
                                className="selection"
                                value={selectedValue}
                                onChange={handleChange}
                              >
                                {subsection.options.map((i) => (
                                  <MenuItem key={i.value} value={i.value}>
                                    {i.text}
                                  </MenuItem>
                                ))}
                              </Select>
                            </div>
                          </>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            } else if (element.type === "boolean") {
              return (
                <>
                  <div
                    key={element.name}
                    className={`mainContainer ${
                      isMobile
                        ? "flex-column justify-content-center"
                        : "flex-row"
                    }`}
                  >
                    <div className="leftSection">
                      <p style={{ fontSize: "22px" }}>{element.title}</p>
                    </div>
                    <div className="rightSection">
                      <p style={{ fontSize: "12px" }}>{element.label}</p>
                      <div style={{ fontSize: "10px" }}>
                        <Field
                          name={element.name}
                          as={CustomSwitch}
                          field={{
                            value: formValues[element.name],
                            onChange: (e) =>
                              setFormValues({
                                ...formValues,
                                [element.name]: e.target.checked,
                              }),
                            name: element.name,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                  />{" "}
                </>
              );
            } else if (element.type === "button") {
              return (
                <>
                  <div
                    key={element.name}
                    className={`mainContainer ${
                      isMobile
                        ? "flex-column justify-content-center"
                        : "flex-row"
                    }`}
                  >
                    {" "}
                    <div className="leftSection">
                      <p style={{ fontSize: "22px" }}>
                        {element.title}
                      </p>
                    </div>
                    <div className="rightSection">
                      <p style={{ fontSize: "12px" }}>{element.label}</p>{" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <a style={{ color: "white", textDecoration: "none" }}>
                          Questionnaire
                        </a>
                      </Button>
                    </div>
                  </div>
                  <hr style={{ border: "1px solid #ccc", margin: "16px 0" }} />
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                  >
                    <DialogTitle>Select A Questionnaire</DialogTitle>
                    <DialogContent>
                      <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Practitioner Questionnaires" />
                        <Tab label="Library" />
                      </Tabs>
                      {tabValue === 0 && (
                        <Select fullWidth>
                          {/* Add your options for Practitioner Questionnaires */}
                          <MenuItem value={1}>Questionnaire 1</MenuItem>
                          <MenuItem value={2}>Questionnaire 2</MenuItem>
                          {/* Add more options as needed */}
                        </Select>
                      )}
                      {tabValue === 1 && (
                        <TextField
                          fullWidth
                          placeholder="Search in Library"
                          variant="outlined"
                        />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              );
            }
            return null;
          })}
          <hr style={{ border: "1px solid #ccc", margin: "16px 0" }} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px", width: "100%" }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default FormFromJSON;
