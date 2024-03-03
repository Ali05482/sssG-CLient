import React, { useState, useEffect, useContext } from 'react';
import FullLayout from '../../../../src/layouts/FullLayout';
import MainContext from '../../../../src/app/context/context';
import Swal from 'sweetalert2';
import styles from "/styles/Appointment.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import EditQuestion from '../../../../src/components/questionaire/edit/EditQuestion';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';
import _ from 'lodash';
import AddQuestion from '../../../../src/components/questionaire/create/AddQuestion';
import AddAnswersToQuestions from '../../../../src/components/questionaire/create/AddAnswersToQuestions';
import EditAnswersToQuestions from '../../../../src/components/questionaire/create/EditAnswersToQuestions';
import RemoveAnswersFromQuestion from '../../../../src/components/questionaire/create/RemoveAnswersFromQuestion';

const CollapsibleTable = () => {
    const global = useContext(MainContext);

    const [openLinkModal, setOpenLinkModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedQuestionToLink, setSelectedQuestionToLink] = useState(null);
    const [currentEditableQuestion, setCurrentEditableQuestion] = useState(null);
    const [linkedQuestions, setLinkedQuestions] = useState([]);
    const [selectedLinkedQuestions, setSelectedLinkedQuestions] = useState([]);
    const [linkedAnswersPayload, setLinkedAnswersPayload] = useState([]);
    const [questionGroups, setQuestionGroups] = useState([]);
    const [selectedOption, setSelectedOption] = useState('all');
    const [keyword, setKeyword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [addQuestionToGroup, setAddQuestionToGroup] = useState({
        id: "",
        name: ""
    });
    const [addAnswerToQuestion, setAddAnswerToQuestion] = useState({
        id: "",
        name: ""
    });
    const [editAnswerToQuestion, setEditAnswerToQuestion] = useState({
        _id: "",
        answer: "",
        answerType: ""
    });
    const [answerToDeleteQuestions, setAnswerToDeleteQuestions] = useState()
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
    const [openAddAnswersModal, setOpenAddAnswersModal] = useState(false);
    const [openRemoveQuestionFromAnswers, setOpenRemoveQuestionFromAnswers] = useState(false);
    const [openEditAnswersModal, setOpenEditAnswersModal] = useState(false);
    useEffect(() => {
        setSelectedLinkedQuestions([])
    }, [openLinkModal]);

    const getLinkedQuestions = async () => {
        try {
            const linkedQuestions = await global?.getLinkedQuestions()
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
    const fetchAllGroups = async () => {
        try {
            const questions = await global.fetchAllGroups();
            if (questions.status) {
                setQuestionGroups(questions.result.data);
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
        // fetchQuestions()
        getLinkedQuestions()
        fetchAllGroups();

    }, []);
    const [data, setData] = useState([
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
    const handleSaveLink = async (ansId) => {
        if ((selectedLinkedQuestions?.length > 0)) {
            const updatedLinks = linkedAnswersPayload;
            updatedLinks?.push({
                answerId: ansId,
                questionIds: selectedLinkedQuestions
            })
            setLinkedAnswersPayload(updatedLinks);
            toast.success("Answer question linked successfully.");
        } else {
            toast.error("Please select at least one question to link answer");
        }

    }
    const saveLinks = async () => {
        if ((linkedAnswersPayload?.length > 0)) {
            const payload = { data: linkedAnswersPayload }
            const response = await global.linkedQuestions(payload, "callback");
            if (response.status) {
                if (response.result.status) {
                    setSelectedLinkedQuestions([]);;
                    Swal.fire({
                        icon: "success",
                        text: response.result.msg
                    });
                    setOpenLinkModal(false);
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: response.result.msg
                    })
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.result.msg
                })
            }
        } else {
            toast.error("Answer is not selected to link");
        }
    }
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSearchQuestion = async (type = "default") => {
        try {
            let payload = {};
            if (_?.isEmpty(keyword)) {
                if (selectedOption === 'all') {
                    return Swal.fire({
                        icon: 'warning',
                        title: '✋',
                        text: 'You cannot search with empty keyword on All Questions!',
                    });
                } else {
                    if (typeof type === "object") {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "We do not recommend to search with empty keyword, it case performance issue because of large data and are you sure to search with empty keyword?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, search it!'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                payload = { search: "null", type: 'onlyId', id: selectedOption }
                                const questions = await global?.searchQuestion(payload);
                                if (questions?.status) {
                                    setData(questions.result.data);
                                }
                            }
                        })
                    } else {
                        payload = { search: "null", type: 'onlyId', id: selectedOption }
                        const questions = await global?.searchQuestion(payload);
                        if (questions?.status) {
                            setData(questions.result.data);
                        }
                    }
                }
            } else {

                if (selectedOption === 'all') {
                    payload = { search: keyword, type: 'all' }
                    const questions = await global?.searchQuestion(payload);
                    if (questions?.status) {
                        setData(questions.result.data);
                    }
                } else {
                    payload = { search: keyword, type: 'byId', id: selectedOption }
                    const questions = await global?.searchQuestion(payload);
                    if (questions.status) {
                        setData(questions.result.data);
                    }
                }
            }
        } catch (error) {
            console.log(error?.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!, While Fetching Questions',
            })
        }
    }
    const deleteQuestionById = async (id) => {
        try {
            const deleteQuestion = await global?.deleteQuestionById(id);
            if (deleteQuestion.status) {
                if (deleteQuestion?.result?.status) {
                    Swal.fire({
                        icon: "success",
                        text: "Question Deleted Successfully"
                    })
                    await handleSearchQuestion("non-default");
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: deleteQuestion?.result?.msg
                    })
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    text: deleteQuestion?.result?.msg
                })
            }
        } catch (error) {
            console.log("error?.message", error?.message)
            Swal.fire({
                icon: "error",
                text: "Somethng Went Wrong"
            })
        }
    }
    const handleToggleAddQuestionModal = (group) => {
        setAddQuestionToGroup(group);
        setOpenAddQuestionModal(true);
    }
    const handleToggleAddAnswerModal = (group) => {
        setAddAnswerToQuestion(group);
        setOpenAddAnswersModal(true);
    }
    const handleToggleEditAnswerModal = (answerData, questionData) => {
        setEditAnswerToQuestion(answerData);
        setAddAnswerToQuestion(questionData);
        setOpenEditAnswersModal(true);
    }
    const handleDeleteQuestionOfAnswer = (data) => {
        setAnswerToDeleteQuestions(data)
        setOpenRemoveQuestionFromAnswers(true)
    }
    const handleDeleteAnswer = async (id) => {
        try {
            const deleteAnswer = await global?.deleteAnswerById(id);
            if (deleteAnswer.status) {
                if (deleteAnswer?.result?.status) {
                    Swal.fire({
                        icon: "success",
                        text: "Answer Deleted Successfully"
                    })
                    await handleSearchQuestion("non-default");
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: deleteAnswer?.result?.msg
                    })
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    text: deleteAnswer?.result?.msg
                })
            }
        } catch (error) {
            console.log("error?.message", error?.message)
            Swal.fire({
                icon: "error",
                text: "Somethng Went Wrong"
            })
        }
    }
    const filteredLinkedQuestionnaire = linkedQuestions?.filter((x) =>
        x?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            <Modal
                isOpen={openAddQuestionModal}
                className="modal-dialog-centered"
                size='xl'

            >
                {global?.pageLoader?.primeReactLoader && (
                    <div className={styles.overlay}>
                        <ProgressSpinner
                            style={{ width: "180px", height: "180px" }}
                            animationDuration=".5s"
                        />
                    </div>
                )}
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setOpenAddQuestionModal(false)}>
                    <h5 className="text-center">Answers to Questions Management</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <AddQuestion handleSearchQuestion={handleSearchQuestion} group={addQuestionToGroup} setOpenAddQuestionModal={setOpenAddQuestionModal} />
                </ModalBody>
            </Modal>

            <Modal
                isOpen={openAddAnswersModal}
                className="modal-dialog-centered"
                size='xl'

            >
                {global.pageLoader.primeReactLoader && (
                    <div className={styles.overlay}>
                        <ProgressSpinner
                            style={{ width: "180px", height: "180px" }}
                            animationDuration=".5s"
                        />
                    </div>
                )}
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setOpenAddAnswersModal(false)}>
                    <h5 className="text-center">Add Question to Group</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <AddAnswersToQuestions handleSearchQuestion={handleSearchQuestion} question={addAnswerToQuestion} setOpenAddAnswersModal={setOpenAddAnswersModal} />
                </ModalBody>
            </Modal>
            <Modal
                isOpen={openRemoveQuestionFromAnswers}
                className="modal-dialog-centered"
                size='xl'

            >
                {global.pageLoader.primeReactLoader && (
                    <div className={styles.overlay}>
                        <ProgressSpinner
                            style={{ width: "180px", height: "180px" }}
                            animationDuration=".5s"
                        />
                    </div>
                )}
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setOpenRemoveQuestionFromAnswers(false)}>
                    <h5 className="text-center">Questions to Answer Management</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <RemoveAnswersFromQuestion answerToDeleteQuestions={answerToDeleteQuestions} deleteQuestionById={deleteQuestionById} setOpenRemoveQuestionFromAnswers={setOpenRemoveQuestionFromAnswers} />
                </ModalBody>
            </Modal>
            <Modal
                isOpen={openEditAnswersModal}
                className="modal-dialog-centered"
                size='xl'

            >
                {global.pageLoader.primeReactLoader && (
                    <div className={styles.overlay}>
                        <ProgressSpinner
                            style={{ width: "180px", height: "180px" }}
                            animationDuration=".5s"
                        />
                    </div>
                )}
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setOpenEditAnswersModal(false)}>
                    <h5 className="text-center">Add Question to  Group</h5>
                </ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <EditAnswersToQuestions handleSearchQuestion={handleSearchQuestion} question={addAnswerToQuestion} setOpenEditAnswersModal={setOpenEditAnswersModal} answer={editAnswerToQuestion} />
                </ModalBody>
            </Modal>

            <div className='my-3'></div>
            <EditQuestion handleSearchQuestion={handleSearchQuestion} setOpen={setOpen} fetchQuestions={fetchQuestions} open={open} question={currentEditableQuestion} questionGroups={questionGroups} />
            <div className="container">
                <div style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} className='card'>
                    <div className='card-header'>
                        <h2 className='card-title'>Filter</h2>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label>Select an option:</label>
                                    <select
                                        style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                                        className="form-control"
                                        id="exampleFormControlSelect1"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                    >
                                        <option selected value="all">All</option>
                                        {questionGroups?.map((x) => (
                                            <option key={x?._id} value={x?._id}>
                                                {x?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label>Keyword</label>
                                    <input style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onChange={(e) => setKeyword(e?.target?.value)} className='form-control' type='search' />
                                    <span className='text-primary'><b>You can search with or without keyword</b></span>
                                </div>
                            </div>
                            <div className='col-md-3 my-2'><button type='button' onClick={handleSearchQuestion} className='btn btn-primary'>Apply</button></div>
                        </div>
                    </div>
                </div>
                {!_?.isEmpty(filteredData) && <div className='col-md-3'>
                    <div className="form-group">
                        <label><strong><h5>Search</h5></strong></label>
                        <input
                            type='search'
                            className='form-control'
                            style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                            label="Search"
                            value={query}
                            onChange={handleSearch} />

                    </div>
                </div>}

                <div className="table-responsive my-1">
                    {_?.isEmpty(filteredData) && <h5>No Question Found Please apply your filter & Search</h5>}
                    <table className="table" style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                        <tbody>
                            {filteredData?.map((question) => (
                                <React.Fragment key={question._id}>
                                    <tr>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onClick={() => handleToggleRow(question._id)}>
                                            <button className="btn btn-link">
                                                {expandedRow === question._id ? (
                                                    <i className="bi bi-arrow-up"></i>
                                                ) : (
                                                    <i className="bi bi-arrow-down"></i>
                                                )}
                                            </button>
                                        </td>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>{question?.name}, <small className='text-primary'></small>{question.isRequired ? <i className='bi bi-check text-success'></i> : <i className='bi bi-x text-danger'></i>}</strong></td>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor, cursor: "pointer" }} onClick={() => handleToggleAddAnswerModal({ id: question?._id, name: question?.name })}><i className="bi bi-journal-plus"></i></td>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor, cursor: "pointer" }} onClick={() => handleToggleAddQuestionModal({ id: question?.questionGroupId?._id, name: question?.questionGroupId?.name })}><i className="bi bi-plus-square"></i></td>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor, cursor: "pointer" }} onClick={() => handleEdit({ id: question?._id, name: question?.name, isRequired: question?.isRequired, questionGroupId: question?.questionGroupId })}><i className="bi bi-pencil"></i></td>
                                        <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor, cursor: "pointer" }} onClick={() => deleteQuestionById(question?._id)}><i className="bi bi-trash"></i></td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: 0 }} colSpan={2}>
                                            <div className={expandedRow === question?._id ? "collapse show" : "collapse"}>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>#</strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Answer</strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Type</strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Linked With<i className="bi bi-link"></i></strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Edit</strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Delete</strong></th>
                                                                <th style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Search</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{ width: 1200 }}>
                                                            {question.answers.map((answer, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{index + 1}</td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{answer.answer}</td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>{answer.answerType}</td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}><i className="bi bi-link" onClick={() => handleLinkQuestion(question, answer)}></i></td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} onClick={() => handleToggleEditAnswerModal(answer, { id: question?.questionGroupId?._id, name: question?.questionGroupId?.name })} ><i className="bi bi-pencil"></i></td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} onClick={() => handleDeleteAnswer(answer?._id)}><i className="bi bi-trash"></i></td>
                                                                    <td style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} onClick={() => handleDeleteQuestionOfAnswer(answer)}><i className="bi bi-search"></i></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <TableContainer component={Paper}>
                <Table style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>
                    <TableBody>
                        {filteredData.map((question) => (
                            <React.Fragment key={question._id}>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} onClick={() => handleToggleRow(question._id)}>
                                        <IconButton>
                                            {expandedRow === question._id ? (
                                                <KeyboardArrowUpIcon />
                                            ) : (
                                                <KeyboardArrowDownIcon />
                                            )}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>{question?.name}</strong></TableCell>
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
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong><QuestionAnswerIcon /></strong></TableCell>
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Answer</strong></TableCell>
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Type</strong></TableCell>
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Linked With<LinkIcon /></strong></TableCell>
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Edit</strong></TableCell>
                                                            <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><strong>Delete</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody style={{ width: 1200 }}>
                                                        {question.answers.map((answer, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}>{index + 1}</TableCell>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}>{answer.answer}</TableCell>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}>{answer.answerType}</TableCell>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><LinkIcon onClick={() => handleLinkQuestion(question, answer)} /></TableCell>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }} ><EditIcon /></TableCell>
                                                                <TableCell style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}><DeleteForeverIcon /></TableCell>
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
            </TableContainer> */}
            <Modal
                isOpen={openLinkModal}
                className="modal-dialog-centered"
                size="x"
            >
                <ModalHeader style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }} toggle={() => setOpenLinkModal(false)}>{selectedQuestionToLink?.answer}</ModalHeader>
                <ModalBody style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.color }}>

                    <div className='row'>
                        <div className='col-md-2'><button type='button' onClick={() => handleSaveLink(selectedQuestionToLink?._id)} className="btn btn-secondary">Link</button></div>
                        <div className='col-md-3'><Button onClick={saveLinks} className='btn btn-success'>Save Links</Button></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Search</label>
                        <input
                            style={{ backgroundColor: global?.theme?.backgroundColor, color: global?.theme?.inputColor }}
                            type="text"
                            className="form-control"
                            placeholder="Search by Name or Phone Contact"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {filteredLinkedQuestionnaire?.map((x, index) => (
                        <div key={index} className='d-flex justify-content-between'>
                            <div>{x?.name}</div><input value={x?._id} onClick={collectLinkedQuestion} type="checkbox" />
                        </div>
                    ))}
                </ModalBody>

            </Modal>
        </FullLayout>
    );
}

export default CollapsibleTable;
