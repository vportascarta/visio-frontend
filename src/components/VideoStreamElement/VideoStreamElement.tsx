import { FunctionComponent, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  fullSizeCentered: {
    borderRadius: "inherit",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

interface VideoStreamElementProps {
  stream?: MediaStream;
  muteOnStart?: boolean;
}

export const VideoStreamElement: FunctionComponent<VideoStreamElementProps> = ({
  stream,
  muteOnStart,
}) => {
  const classes = useStyles();
  const videoEl = useRef<HTMLVideoElement>(null);
  const [streamVideoIsOK, setVideoStreamIsOK] = useState<boolean>(false);

  useEffect(() => {
    if (stream !== undefined && videoEl.current !== null) {
      videoEl.current.srcObject = stream;
    }
  }, [videoEl, stream]);

  const loadedDataHandler = () => {
    const isVideoOK =
      stream?.getTracks().some((track) => track.kind === "video") ?? false;
    setVideoStreamIsOK(isVideoOK);
  };

  return (
    <>
      {!streamVideoIsOK && (
        <img
          className={classes.fullSizeCentered}
          src="https://via.placeholder.com/640x480?text=No+video"
          alt="No video feed"
        />
      )}
      {stream !== undefined && (
        <video
          className={classes.fullSizeCentered}
          ref={videoEl}
          autoPlay
          playsInline
          onLoadedData={loadedDataHandler}
          muted={muteOnStart}
        />
      )}
    </>
  );
};
