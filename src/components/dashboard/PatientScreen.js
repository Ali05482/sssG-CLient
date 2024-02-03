import React, {useRef,useEffect} from "react";
import Head from "next/head";
import styled from "styled-components";
import styles from "/styles/Appointment.module.css"
const StyledVideo = styled.video`
width: 300px; /* Set your desired width */
height: 150px; /* Set your desired height */
  border-radius:25px 
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
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Head>
      <div className="chat-main-row">
        <div className="chat-main-wrapper">
          <div className="col-lg-9 message-view chat-view">
            <div className="chat-window">
              <div className="fixed-header">
                <div className="navbar">
                  <div className="user-details mr-auto">
                    <div className="float-left user-img m-r-10">
                      <a href="profile.html" title="Ali Usama"><img src="/assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status online"></span></a>
                    </div>
                    <div className="user-info float-left">
                      <a href="profile.html" title="Mike Litorus"><span className="font-bold">Mike Litorus</span></a>
                      <span className="last-seen">Online</span>
                    </div>
                  </div>
                  <ul className="nav custom-menu">
                    <li className="nav-item">
                      <a className="task-chat profile-rightbar float-right" href="#chat_sidebar" id="task_chat"><i aria-hidden="true" className="fa fa-comments"></i></a>
                    </li>
                    <li className="nav-item dropdown dropdown-action">
                      <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-cog"></i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" className="dropdown-item">Settings</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="chat-contents">
                <div className="chat-content-wrap">
                  <div className="user-video">
                  {props.mypeers?.map((peer, index) => {
                        return (
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
                  <span className="call-duration">00:59</span>
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
                      End Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Screen




