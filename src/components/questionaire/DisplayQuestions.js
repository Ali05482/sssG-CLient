import Link from "next/link";
import React from "react";
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const DisplayQuestions = (props) => {
  return (
    <>
      <div className="row">
        <div style={{ cursor: "pointer", }} className="col-md-4">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{props?.question?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {props?.question?.answers?.map((x, index) => {
                  return (
                    <Typography key={index}>
                      <li>
                        {x?.answer}
                      </li>
                    </Typography>
                  )
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};



export default DisplayQuestions;
