import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import DisplayQuestions from "./DisplayQuestions";


const LinkedQuestionaires = (props) => {
    const global = useContext(MainContext);
    const [questions, setQuestions] = useState([])
    const fetchQuestions = async (props) => {
        try {
            const questions = await global.fetchQuestionsOnly();
            if (questions.status) {
                setQuestions(questions.result.data);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, While Fetching Questions',
            })
        }
    }
    useEffect(() => {
        fetchQuestions()
    }, []);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <Dialog
                open={props.open}
                onClose={()=>props.setOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Select A Questionnaire</DialogTitle>
                <DialogContent>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Practitioner Questionnaires" />
                        <Tab label="Library" />
                    </Tabs>
                    {tabValue === 0 && questions?.map((question, index) => <DisplayQuestions key={index} question={question} />)}
                    {tabValue === 1 && (
                        <TextField
                            fullWidth
                            placeholder="Search in Library"
                            variant="outlined"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>props.setOpen(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};



export default LinkedQuestionaires;
