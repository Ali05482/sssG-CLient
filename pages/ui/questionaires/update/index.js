import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import FullLayout from '../../../../src/layouts/FullLayout';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MainContext from '../../../../src/app/context/context';
import Swal from 'sweetalert2';
import { Checkbox } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import EditQuestion from '../../../../src/components/questionaire/edit/EditQuestion';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';

const CollapsibleTable = () => {
    const global = useContext(MainContext);
    const [openLinkModal, setOpenLinkModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedQuestionToLink, setSelectedQuestionToLink] = useState(null);
    const [currentEditableQuestion, setCurrentEditableQuestion] = useState(null);
    const [linkedQuestions, setLinkedQuestions] = useState([]);
    const [selectedLinkedQuestions, setSelectedLinkedQuestions] = useState([]);
    const [linkedAnswersPayload, setLinkedAnswersPayload] = useState([])
    useEffect(()=>{
        setSelectedLinkedQuestions([])
    }, [openLinkModal])
    const getLinkedQuestions = async () => {
        try {
            const linkedQuestions = await global.getLinkedQuestions()
            if (linkedQuestions.status) {
                setLinkedQuestions(linkedQuestions.result.data);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!,',
            })
        }
    }
    useEffect(() => {
        fetchQuestions()
        getLinkedQuestions()
    }, []);
    const [data, setData] = useState([
        {
            _id: "89a8s9diasbdas",
            name: 'Abdominal pain',
            isRequired: false,
            answers: [
                { answer: "a little bit", answerType: "radio" },
                { answer: "a little bit", answerType: "radio" },
                { answer: "a little bit", answerType: "radio" }
            ]
        },
        {
            _id: "89a8s9diasbdas2",
            name: 'Headache',
            isRequired: true,
            answers: [
                { answer: "severe", answerType: "radio" },
                { answer: "mild", answerType: "radio" },
                { answer: "moderate", answerType: "radio" }
            ]
        }
    ]);
    const [query, setQuery] = useState('');
    const [expandedRow, setExpandedRow] = useState(null);

    const fetchQuestions = async () => {
        try {
            const questions = await global.fetchQuestionsAndAnswersOnly();
            if (questions.status) {
                setData(questions.result.data);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, While Fetching Questions',
            })
        }
    }
    const handleToggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };
    const handleSearch = (e) => {
        setQuery(e.target.value);
    };
    const filteredData = data.filter((question) =>
        question.name.toLowerCase().includes(query.toLowerCase())
    );
    const handleEdit = (data) => {
        setOpen(true);
        setCurrentEditableQuestion(data)
    }
    const collectLinkedQuestion = (e) => {
      
        if (e.target.checked) {
            const updatedSelectedLinkedQuestions = [...selectedLinkedQuestions];
            updatedSelectedLinkedQuestions.push(e.target.value);
            setSelectedLinkedQuestions(updatedSelectedLinkedQuestions);
        } else {
            const updatedSelectedLinkedQuestions = selectedLinkedQuestions.filter(
                (item) => item !== e.target.value
              );
              setSelectedLinkedQuestions(updatedSelectedLinkedQuestions);
        }
    }
    const handleLinkQuestion = (question, answer) => {
        setOpenLinkModal(true);
        setSelectedQuestionToLink(answer);
    };
    const handleSaveLink = async (ansId) =>{
        if((selectedLinkedQuestions?.length > 0)){
            const updatedLinks = linkedAnswersPayload;
            updatedLinks?.push({
                answerId:ansId, 
                questionIds:selectedLinkedQuestions
            })
            setLinkedAnswersPayload(updatedLinks);
            toast.success("Answer question linked successfully.");
        } else {
            toast.error("Please select atleast one question to link answer");
        }
       
    }
    const saveLinks = async()=>{
        if((linkedAnswersPayload?.length > 0)){
           const payload = {data:linkedAnswersPayload}
           await global.linkedQuestions(payload);
        } else {
            toast.error("Answer is not selected to link");
        }
    }

    return (
        <FullLayout>
              <Toaster
          position="top-center"
          reverseOrder={false}
        />
            {global.pageLoader.primeReactLoader && (
                <div className={styles.overlay}>
                    <ProgressSpinner
                        style={{ width: "180px", height: "180px" }}
                        animationDuration=".5s"
                    />
                </div>
            )}
            <TextField
            style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}
                label="Search"
                variant="outlined"
                value={query}
                onChange={handleSearch}
            />
            <Button onClick={saveLinks} className='btn btn-success mx-4'>Save Links</Button>
            <div className='my-3'></div>
            <EditQuestion setOpen={setOpen} fetchQuestions={fetchQuestions} open={open} question={currentEditableQuestion} />
            <TableContainer component={Paper}>
                <Table style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color}}>
                    <TableBody>
                        {filteredData.map((question) => (
                            <React.Fragment key={question._id}>
                                <TableRow>
                                    <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} onClick={() => handleToggleRow(question._id)}>
                                        <IconButton>
                                            {expandedRow === question._id ? (
                                                <KeyboardArrowUpIcon />
                                            ) : (
                                                <KeyboardArrowDownIcon />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>{question?.name}</strong></TableCell>
                                    <TableCell><small className='text-primary'>Is Required</small>{question.isRequired === true ? <DoneIcon className='text-success' /> : <CloseIcon className='text-danger' />}</TableCell>
                                    <TableCell style={{ cursor: "pointer" }} onClick={() => handleEdit({ id: question?._id, name: question?.name, isRequired: question?.isRequired })}><EditRoadIcon /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ padding: 0 }} colSpan={2}>
                                        <Collapse in={expandedRow === question?._id}>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong><QuestionAnswerIcon /></strong></TableCell>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>Answer</strong></TableCell>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>Type</strong></TableCell>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>Linked With<LinkIcon /></strong></TableCell>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>Edit</strong></TableCell>
                                                            <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><strong>Delete</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody style={{ width: 1200 }}>
                                                        {question.answers.map((answer, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}>{index + 1}</TableCell>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}>{answer.answer}</TableCell>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}>{answer.answerType}</TableCell>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><LinkIcon onClick={() => handleLinkQuestion(question, answer)} /></TableCell>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}} ><EditIcon /></TableCell>
                                                                <TableCell style={{backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor}}><DeleteForeverIcon /></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                isOpen={openLinkModal}
                className="modal-dialog-centered"
                size="x"
            >
                <ModalHeader toggle={() => setOpenLinkModal(false)}>{selectedQuestionToLink?.answer}</ModalHeader>
                <ModalBody>
                    {linkedQuestions?.map((x, index) => (
                    <div key={index} className='d-flex justify-content-between'>
                        <div>{x?.name}</div><input value={x?._id} onClick={collectLinkedQuestion} type="checkbox" />
                    </div>
                ))}
                </ModalBody>
                <ModalFooter>
                <button type='button' onClick={()=>handleSaveLink(selectedQuestionToLink?._id)} className="btn btn-secondary d-flex justify-content-between">Link</button>
                </ModalFooter>
            </Modal>
        </FullLayout>
    );
}

export default CollapsibleTable;
