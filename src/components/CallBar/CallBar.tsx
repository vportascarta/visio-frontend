import React, { FunctionComponent } from "react";
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
  callBar: {
    top: "auto",
    bottom: 0,
  },
  fabButtons: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    "& button": {
      margin: "0 20px",
    },
  },
  grow: {
    flexGrow: 1,
  },
});

interface CallBarProps {
  callStarted: boolean;
  micEnabled: boolean;
  vidEnabled: boolean;
  callClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  infoClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  micClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  vidClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

export const CallBar: FunctionComponent<CallBarProps> = ({
  callStarted,
  micEnabled,
  vidEnabled,
  callClickHandler,
  infoClickHandler,
  micClickHandler,
  vidClickHandler,
}) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.callBar}>
      <Toolbar>
        <Typography>TEST</Typography>
        <div className={classes.fabButtons}>
          <Fab color="secondary" aria-label="mic" onClick={micClickHandler}>
            {micEnabled ? <MicIcon /> : <MicOffIcon />}
          </Fab>
          <Fab
            color="secondary"
            aria-label="call"
            disabled={!callStarted && !micEnabled && !vidEnabled}
            onClick={callClickHandler}
          >
            {callStarted ? <CallEndIcon /> : <CallIcon />}
          </Fab>
          <Fab
            color="secondary"
            aria-label="video cam"
            onClick={vidClickHandler}
          >
            {vidEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </Fab>
        </div>
        <div className={classes.grow} />
        <IconButton edge="end" color="inherit" onClick={infoClickHandler}>
          <InfoIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
