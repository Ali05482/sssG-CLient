import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import styled from "styled-components";
import { io } from 'socket.io-client';
import Peer from "simple-peer";
import PatientScreen from '../../../../../src/components/dashboard/PatientScreen';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import styles from "/styles/Appointment.module.css";
const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 80%;
    width: 80%;
    border-radius:10px
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
let videoConstraints;
if (typeof window !== 'undefined') {
    videoConstraints = {

        height: window.innerHeight / 2,
        width: window.innerWidth / 2
    };
}

const VideoChat = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [repeatsEvery, setRepeatsEvery] = useState('');
    const [enteredValueError, setEnteredValueError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectOption, setSelectOption] = useState(null);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef(null);
    const videoContainer = useRef(null);
    const peersRef = useRef([]);
  
    const [streamer, setStreamer] = useState(null);
    
     // Get the last part of the path
    
    // This will output "123"
    
    let roomID;
    if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const parts = path.split('/');
        const myString = parts.pop();
        roomID = myString;
    }


    useEffect(() => {
        socketRef.current = io.connect("http://localhost:4001");
        // socketRef.current = io.connect("https://sss-g-server.vercel.app");
        // socketRef.current.on("room-not-found", users => {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops..., Invalid Meeting ID',
        //         text: `Meeting Not Found`,
        //       });
        //       const baseUrl = window.location.origin;
        //       window.location.href= baseUrl
        //       return
        // });
        navigator.mediaDevices?.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
          try {
            setStreamer(stream)
            socketRef.current.emit("join-room", roomID);
            socketRef.current.on("all-users", users => {
                const peers = [];
                console.log("users=====>", users)
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    console.log("peer======>",peer)
                    peers.push(peer);
                })
                setPeers(peers);
                console.log("peersRef=====>", peersRef);
            })

            socketRef.current.on("user-joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving-returned-signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
            socketRef.current.on("user-disconnected", disconnectedUserId => {
                // Find the peer associated with the disconnected user
                const disconnectedPeer = peersRef.current.find(p => p.peerID === disconnectedUserId);

                if (disconnectedPeer) {
                    // Close the peer connection
                    disconnectedPeer.peer.destroy();

                    // Remove the disconnected peer from the peersRef array
                    const peerIndex = peersRef.current.indexOf(disconnectedPeer);
                    if (peerIndex !== -1) {
                        peersRef.current.splice(peerIndex, 1);
                    }

                    // Update the peers state by filtering out the disconnected peer
                    setPeers(prevPeers => prevPeers.filter(p => p.peerID !== disconnectedUserId));
                }
            });
          } catch (error) {
            console.log("ErrCatched========>", error)
          }
        })
        return () => {
            // Clean up the socket connection when the component unmounts
            socketRef.current.disconnect();
        };
    }, []);


    useEffect(() => {
        // Set the stream as the srcObject for the userVideo element
        if (userVideo.current && streamer) {
            userVideo.current.srcObject = streamer;
        }
    }, [streamer]);

    useEffect(() => {
        const checkAndCloseDisconnectedPeers = () => {
            console.log("Checking Peers.........")
            const currentPeers = []
          peersRef.current.forEach((peerConnection, index) => {
            const { peer } = peerConnection;
            console.log("peer", peer, "No===>", index)
            console.log("_connected", peer._connected, "No===>", index);
            if(peer._connected){
                currentPeers.push(peer)
            } else {
                peer.destroy();
            }
          });
          setPeers(currentPeers);
        };
    
        // Check for disconnected peers at regular intervals
        const checkInterval = setInterval(checkAndCloseDisconnectedPeers, 5000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(checkInterval);
      }, []);

    function createPeer(userToSignal, callerID, stream) {
       try {
        let peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", signal => {
            socketRef.current.emit("sending-signal", { userToSignal, callerID, signal })
        })
        return peer;
       } catch (error) {
        console.log("error From create Peers", error)
       }
    }

    function addPeer(incomingSignal, callerID, stream) {
       try {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning-signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
       } catch (error) {
        console.log("error From add Peers", error)
       }
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
    const disConnectCall = (roomID)=>{
        if (typeof window !== 'undefined') {
            socketRef.current.emit("disconect-call", roomID);
            window.location.href = "https://alitechstorm.com";
        }
    }
    const [isAudioMuted, setIsAudioMuted] = useState(true);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const toggleAudioMute = () => {
      const audioTracks = streamer.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isAudioMuted;
      });
      setIsAudioMuted(!isAudioMuted);
    };
  
    const toggleVideoMute = () => {
      const videoTracks = streamer.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoMuted;
      });
      setIsVideoMuted(!isVideoMuted);
    };
    return (
        <>
            <Row>
            

            <Container ref={videoContainer}>
                <PatientScreen isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} toggleAudioMute={toggleAudioMute} toggleVideoMute={toggleVideoMute} disConnectCall = {disConnectCall} roomID={roomID} mypeers={peers} myVideo={<StyledVideo ref={userVideo} muted autoPlay playsInline />} />
            </Container>
               

            </Row>
          


        </>
    );
};

export default VideoChat;
