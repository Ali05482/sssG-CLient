import React, { useRef, useEffect, useState } from "react";
import Editor from "./Editor";
import Head from "next/head";
import styled from "styled-components";
import styles from "/styles/Appointment.module.css"
import { useRouter } from "next/router";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const StyledVideo = styled.video`
  width: 300px; /* Set your desired width */
  height: 150px; /* Set your desired height */
`;
const Video = (props) => {
  const ref = useRef();
  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);
  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}
const Screen = (props) => {
  console.log("props.peers", props.mypeers)
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const router = useRouter();
  const navigator = (url)=>{
    router.push(url)
  }




  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Head>
      {/* <div className="main-wrapper"> */}
      
        <div className="chat-main-wrapper">
          <div className="col-lg-9 message-view chat-view">
            <div className="chat-window">
              <div className="fixed-header">
                  <div className="d-flex">
                    <div>
                      <i className="bi bi-person-fill"></i>
                      <span className="ml-2">Alicia Martinez , 43 (26/7/1980), Female</span>
                    </div>
                    <div>
                      <i className="bi bi-info-circle-fill"></i>
                      <span className="ml-2">Requisition: Blood Test, X-Ray, Ultrasound, MRI, etc</span>
                    </div>
                  </div>
              </div>
              <div className="chat-contents">
                <div className="chat-content-wrap">
                  <div className="user-video">
                    {props.mypeers?.map((peer, index) => {
                      return (
                        // <img key={index} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLtviP1kWeQUqM6Tqy-rG6V6ixoZT_l6DmIQ&usqp=CAU"/>
                        <Video key={index} peer={peer} />
                      );
                    })}
                    {/* <img src="/assets/img/video-call.jpg" alt="" /> */}
                  </div>
                  <div className="my-video">
                    <ul>
                      <li>
                        {props.myVideo}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="chat-footer">
                <div className="call-icons">
                  {/* <span className="call-duration">00:59</span> */}
                  <ul className="call-items">
                  <li className="call-item">
                      <a onClick={props.toggleVideoMute} title="Enable Video" data-placement="top" data-toggle="tooltip">
                      <i className={`fa fa-video-camera camera ${props.isVideoMuted ? styles.crossedOut : ''}`}></i>
                      </a>
                    </li>
                    <li className="call-item">
                      <a onClick={props.toggleAudioMute}  title="Mute Audio" data-placement="top" data-toggle="tooltip">
                        {props.isAudioMuted?<i className="fa fa-microphone microphone"></i>: <i className="fa fa-microphone-slash"></i>}
                      </a>
                    </li>
                    <li className="call-item">
                      <a href="" title="Add User" data-placement="top" data-toggle="tooltip">
                        <i className="fa fa-user-plus"></i>
                      </a>
                    </li>
                    <li className="call-item">
                      <a href="" title="Full Screen" data-placement="top" data-toggle="tooltip">
                        <i className="fa fa-arrows-v full-screen"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="end-call">
                  <a type="button" onClick={()=>props.disConnectCall(props.roomID)}>
                    <i className="bi bi-telephone-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{height:"80vh"}} className="col-lg-8 message-view chat-profile-view chat-sidebar" id="chat_sidebar">
            <div className="chat-window video-window">
              <div className="fixed-header">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item"><button type="button" className="nav-link" onClick={()=>navigator(`../../report?questionaireId=${encodeURIComponent(props?.questionaireId)}`)}><i className="bi bi-fullscreen"></i> View On Full Screen</button></li>
                </ul>
              </div>

              <div className="tab-content chat-contents">
                <div className="content-full tab-pane show active" id="calls_tab">
                  <div className="chat-wrap-inner">
                    <Editor
                      name="description"
                      onChange={(data) => {
                        setData(data);
                      }}
                      questionaireId={props?.questionaireId}
                      editorLoaded={editorLoaded}
                    />



                  </div>
                </div>
                <div className="content-full tab-pane" id="chats_tab">
                  <div className="chat-window">
                    <div className="chat-contents">
                      <div className="chat-content-wrap">
                        <div className="chat-wrap-inner">
                          <div className="chat-box">
                            <div className="chats">
                              <div className="chat chat-left">
                                <div className="chat-avatar">
                                  <a href="profile.html" className="avatar">
                                    <img alt="John Doe" src="/assets/img/user.jpg" className="img-fluid rounded-circle" />
                                  </a>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-bubble">
                                    <div className="chat-content">
                                      <span className="chat-user">John Doe</span> <span className="chat-time">8:35 am</span>
                                      <p>I m just looking around.</p>
                                      <p>Will you tell me something about yourself? </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chat chat-left">
                                <div className="chat-avatar">
                                  <a href="profile.html" className="avatar">
                                    <img alt="John Doe" src="/assets/img/user.jpg" className="img-fluid rounded-circle" />
                                  </a>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-bubble">
                                    <div className="chat-content">
                                      <span className="chat-user">John Doe</span> <span className="file-attached">attached 3 files <i className="fa fa-paperclip"></i></span> <span className="chat-time">Dec 17, 2014 at 4:32am</span>
                                      <ul className="attach-list">
                                        <li><i className="fa fa-file"></i> <a href="#">project_document.avi</a></li>
                                        <li><i className="fa fa-file"></i> <a href="#">video_conferencing.psd</a></li>
                                        <li><i className="fa fa-file"></i> <a href="#">landing_page.psd</a></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chat-line">
                                <span className="chat-date">January 29th, 2017</span>
                              </div>
                              <div className="chat chat-left">
                                <div className="chat-avatar">
                                  <a href="profile.html" className="avatar">
                                    <img alt="Jeffery Lalor" src="/assets/img/user.jpg" className="img-fluid rounded-circle" />
                                  </a>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-bubble">
                                    <div className="chat-content">
                                      <span className="chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip"></i></span> <span className="chat-time">Yesterday at 9:16pm</span>
                                      <ul className="attach-list">
                                        <li className="pdf-file"><i className="fa fa-file-pdf-o"></i> <a href="#">Document_2016.pdf</a></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chat chat-left">
                                <div className="chat-avatar">
                                  <a href="profile.html" className="avatar">
                                    <img alt="Jeffery Lalor" src="/assets/img/user.jpg" className="img-fluid rounded-circle" />
                                  </a>
                                </div>
                                <div className="chat-body">
                                  <div className="chat-bubble">
                                    <div className="chat-content">
                                      <span className="chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip"></i></span> <span className="chat-time">Today at 12:42pm</span>
                                      <ul className="attach-list">
                                        <li className="img-file">
                                          <div className="attach-img-download"><a href="#">avatar-1.jpg</a></div>
                                          <div className="attach-img"><img src="/assets/img/user.jpg" alt="" /></div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-footer">
                      <div className="message-bar">
                        <div className="message-inner">
                          <a className="link attach-icon" href="#" data-toggle="modal" data-target="#drag_files"><img src="/assets/img/attachment.png" alt="" /></a>
                          <div className="message-area">
                            <div className="input-group">
                              <textarea className="form-control" placeholder="Type message..."></textarea>
                              <span className="input-group-append">
                                <button className="btn btn-primary" type="button"><i className="fa fa-send"></i></button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-full tab-pane" id="profile_tab">
                  <div className="display-table">
                    <div className="table-row">
                      <div className="table-body">
                        <div className="table-content">
                          <div className="chat-profile-img">
                            <div className="edit-profile-img">
                              <img src="/assets/img/user.jpg" alt="" />
                              <span className="change-img">Change Image</span>
                            </div>
                            <h3 className="user-name m-t-10 mb-0">John Doe</h3>
                            <small className="text-muted">MBBS, MD</small>
                            <a href="edit-profile.html" className="btn btn-primary edit-btn"><i className="fa fa-pencil"></i></a>
                          </div>
                          <div className="chat-profile-info">
                            <ul className="user-det-list">
                              <li>
                                <span>Username:</span>
                                <span className="float-right text-muted">johndoe</span>
                              </li>
                              <li>
                                <span>DOB:</span>
                                <span className="float-right text-muted">24 July</span>
                              </li>
                              <li>
                                <span>Email:</span>
                                <span className="float-right text-muted"><a href="http://cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="59333631373d363c193c21383429353c773a3634">[email&#160;protected]</a></span>
                              </li>
                              <li>
                                <span>Phone:</span>
                                <span className="float-right text-muted">9876543210</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul className="nav nav-tabs nav-tabs-solid nav-justified mb-0">
                              <li className="nav-item"><a className="nav-link active" href="#all_files" data-toggle="tab">All Files</a></li>
                              <li className="nav-item"><a className="nav-link" href="#my_files" data-toggle="tab">My Files</a></li>
                            </ul>
                            <div className="tab-content">
                              <div className="tab-pane show active" id="all_files">
                                <ul className="files-list">
                                  <li>
                                    <div className="files-cont">
                                      <div className="file-type">
                                        <span className="files-icon"><i className="fa fa-file-pdf-o"></i></span>
                                      </div>
                                      <div className="files-info">
                                        <span className="file-name text-ellipsis">AHA Selfcare Mobile Application Test-Cases.xls</span>
                                        <span className="file-author"><a href="#">Loren Gatlin</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                                      </div>
                                      <ul className="files-action">
                                        <li className="dropdown dropdown-action">
                                          <a href="" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-h"></i></a>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item" href="javascript:void(0)">Download</a>
                                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#share_files">Share</a>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="tab-pane" id="my_files">
                                <ul className="files-list">
                                  <li>
                                    <div className="files-cont">
                                      <div className="file-type">
                                        <span className="files-icon"><i className="fa fa-file-pdf-o"></i></span>
                                      </div>
                                      <div className="files-info">
                                        <span className="file-name text-ellipsis">AHA Selfcare Mobile Application Test-Cases.xls</span>
                                        <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                                      </div>
                                      <ul className="files-action">
                                        <li className="dropdown dropdown-action">
                                          <a href="" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-h"></i></a>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item" href="javascript:void(0)">Download</a>
                                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#share_files">Share</a>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
      {/* </div> */}
     
    </>


  )
}

export default Screen




