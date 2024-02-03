import React, { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Sample = () => {
  const surveyQuestions = ["Question 1", "Question 2", "Question 3"];
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState(
    new Array(surveyQuestions.length).fill(false)
  );
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCheckboxChange = (index) => {
    const updatedSelectedQuestions = [...selectedQuestions];
    updatedSelectedQuestions[index] = !updatedSelectedQuestions[index];
    setSelectedQuestions(updatedSelectedQuestions);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md">
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
            {/* Radio Inputs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
              }}
            >
              <FormControl component="fieldset">
                <legend>Question 1: Radio Inputs</legend>
                <FormGroup>
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    label="Option 1"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="Option 2"
                  />
                </FormGroup>
              </FormControl>

              {/* Checkboxes */}
              <FormControl component="fieldset">
                <legend>Question 2: Checkboxes</legend>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Checkbox 1" />
                  <FormControlLabel control={<Checkbox />} label="Checkbox 2" />
                </FormGroup>
              </FormControl>
            </div>
            {/* Select Dropdown */}
            <FormControl style={{ width: "100%" }}>
              <legend>Question 3: Select Dropdown</legend>
              <Select style={{ width: "100%" }}>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
            {/* Yes/No Buttons */}
            {[4, 5, 6, 7, 8].map((questionNumber) => (
              <FormControl
                key={questionNumber}
                component="fieldset"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <legend>{`Question ${questionNumber}: Yes/No Buttons`}</legend>
                <div>
                  <Button variant="contained" color="primary">
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "1rem" }}
                  >
                    No
                  </Button>
                </div>
              </FormControl>
            ))}{" "}
            <legend>Question 9</legend>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {/* Table of Survey Questions */}
            <FormControl style={{ width: "100%" }}>
              <legend>Question 10: Select Survey Questions</legend>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surveyQuestions.map((question, index) => (
                    <TableRow key={index}>
                      <TableCell>{question}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={selectedQuestions[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Sample;
