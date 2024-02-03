import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import styles from "/styles/Appointment.module.css";
import styled from "styled-components";
import { io } from "socket.io-client";
import Peer from "simple-peer";
const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();
  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  return <StyledVideo playsInline autoPlay ref={ref} />;
};
let videoConstraints;
if (typeof window !== "undefined") {
  videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  };
}

const VideoChat = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatsEvery, setRepeatsEvery] = useState("");
  const [enteredValueError, setEnteredValueError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef(null);
  const videoContainer = useRef(null);
  const peersRef = useRef([]);
  const roomID = props.roomID;
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4001");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        setStreamer(stream);
        socketRef.current.emit("join-room", roomID);
        socketRef.current.on("all-users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user-joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving-returned-signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  useEffect(() => {
    // Set the stream as the srcObject for the userVideo element
    if (userVideo.current && streamer) {
      userVideo.current.srcObject = streamer;
    }
  }, [streamer]);

    
  function createPeer(userToSignal, callerID, stream) {
    let peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending-signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const handlesOptionChange = (event) => {
    setSelectOption(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRecurringChange = () => {
    setIsRecurring(!isRecurring);
  };

  const handleRepeatsEveryChange = (e) => {
    const value = e.target.value;
    setRepeatsEvery(value);

    // Check if the entered value is a valid number (1-99)
    const isValid = /^[1-9][0-9]?$|^99$/.test(value);
    setEnteredValueError(!isValid);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Button color="primary" onClick={toggleModal}>
            Test Virtual Care
          </Button>
        </CardBody>
      </Card>

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="text-center">Test Virtual Care</span>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Container ref={videoContainer}>
              {/* ref={userVideo} */}
              <StyledVideo ref={userVideo} muted autoPlay playsInline />
              {/* <video  id='videoReffer' muted  autoPlay playsInline></video> */}
              {peers.map((peer, index) => {
                return <Video key={index} peer={peer} />;
              })}
            </Container>
            <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
              <Button color="primary" type="submit">
                Select Questionnaire
              </Button>
              <span>L1 - Triage</span>
              <Button color="primary" type="submit" className={styles.buttons}>
                X
              </Button>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VideoChat;
