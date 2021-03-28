import { useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { CallBar } from "../components/CallBar/CallBar";
import { VideoStreamElement } from "../components/VideoStreamElement/VideoStreamElement";

const useStyles = makeStyles({
  fullscreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -2,
  },
  topRightPopup: {
    position: "fixed",
    top: 20,
    right: 20,
    width: "160px",
    height: "90px",
    zIndex: -1,
  }
});

export const CallPage = () => {
  const classes = useStyles();
  const [started, setStarted] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(true);
  const [userStream, setUserStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const getWebcamStream = () => {
    const mediaStreamConstraints = {
      fake: true,
      video: video
        ? {
            frameRate: 30,
            noiseSuppression: true,
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
          }
        : false,
      audio: audio,
    };

    const gotLocalMediaStream = (mediaStream: MediaStream) => {
      setRemoteStream(mediaStream);
      setUserStream(mediaStream);
      setStarted(true);
    };

    const handleLocalMediaStreamError = (error: any) => {
      console.error("Error when trying to get user media :", error);
    };

    // Initializes media stream.
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);
  };

  const startHandler = () => {
    getWebcamStream();
  };

  const stopHandler = () => {
    userStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setStarted(false);
    setUserStream(undefined);
  };

  const debugHandler = () => {
    navigator.mediaDevices.enumerateDevices().then((res) => {
      res.forEach((device) =>
        console.log(
          device.kind + ": " + device.label + " id = " + device.deviceId
        )
      );
    });
  };

  return (
    <div className="App">
      <CallBar
        callStarted={started}
        callClickHandler={() => (started ? stopHandler() : startHandler())}
        infoClickHandler={() => debugHandler()}
        micEnabled={audio}
        micClickHandler={() => setAudio(!audio)}
        vidClickHandler={() => setVideo(!video)}
        vidEnabled={video}
      />
      {started && (
        <>
          <div className={classes.fullscreen}>
            <VideoStreamElement stream={remoteStream} />
          </div>
          <Paper className={classes.topRightPopup} elevation={12}>
            <VideoStreamElement stream={userStream} muteOnStart />
          </Paper>
        </>
      )}
    </div>
  );
};
