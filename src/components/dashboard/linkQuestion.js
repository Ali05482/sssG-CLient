import React, { useState, useContext, useEffect } from "react";
import styles from "/styles/Appointment.module.css";
import MainContext from '../../app/context/context';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField } from '@mui/material';

const LinkQuestion = () => {
    const [groups, setGruops] = useState(null)
    const global = useContext(MainContext)
    const fetchAllGroups = async () => {
        const result = await global.fetchAllGroups();
        if (result.status && result.result.status) {
            console.log("result.result.data", result.result.data)
            setGruops(result.result.data);
        }
    }
    useEffect(() => {
        fetchAllGroups()
    }, [])
    
    return (
        <div>

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
                    {/* {tabValue === 0 && groups?.map((group, index) => <QuestionGroups key={index} group={group} />)} */}
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
        </div>
    )
}

export default LinkQuestion
