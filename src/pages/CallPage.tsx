import { useState } from "react";
import { VideoStreamElement } from "../components/VideoStreamElement/VideoStreamElement";

export const CallPage = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(true);
  const [userStream, setUserStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const getWebcamStream = () => {
    const mediaStreamConstraints = {
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
      <h1>Realtime communication with WebRTC</h1>
      <div>
        <button id="debugButton" onClick={debugHandler}>
          Debug
        </button>
        <button id="startButton" onClick={startHandler}>
          Start
        </button>
        <button id="stopButton" onClick={stopHandler}>
          Stop
        </button>
        <label>
          Activer la vidéo :
          <input
            type="checkbox"
            checked={video}
            name="video"
            onChange={() => setVideo(!video)}
          />
        </label>
        <label>
          Activer l'audio :
          <input
            type="checkbox"
            checked={audio}
            name="audio"
            onChange={() => setAudio(!audio)}
          />
        </label>
      </div>
      {started && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: -2,
            }}
          >
            <VideoStreamElement stream={remoteStream} />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              width: "100px",
              height: "100px",
              zIndex: -1,
              borderRadius: 5,
            }}
          >
            <VideoStreamElement stream={userStream} muteOnStart />
          </div>
        </>
      )}
    </div>
  );
};
