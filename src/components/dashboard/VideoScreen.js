import React, { useRef, useEffect } from "react";
import styles from "/styles/Appointment.module.css";

const VideoScreen = ({ streamer }) => {
  const videoElement = useRef(null);

  useEffect(() => {
    if (streamer && videoElement.current) {
      videoElement.current.srcObject = streamer;
    }
  }, [streamer]);

  return (
    <div className={styles.videoGrid}>
      <div className={styles.videoContainer}>
        <video
          ref={videoElement}
          muted
          autoPlay
          playsInline
          className={styles.videoElement}
        />
      </div>
    </div>
  );
};

export default VideoScreen;
