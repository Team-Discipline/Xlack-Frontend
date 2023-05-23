import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@mui/material/Button";
import "react-dropdown/style.css";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { setStatus } from "../../variable/StatusSlices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { WsUrl_status } from "../../variable/cookie";
import { at } from "../../variable/cookie";

// import EmojiPicker from "emoji-picker-react";

const StatusDefault = () => {
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);
  const formData = new FormData();
  const dispatch = useDispatch();
  const [socket, setsocket] = useState<WebSocket>();
  const [open, setOpen] = useState(false);
  const [openStatus, SetopenStatus] = useState(false);
  const [status, setStatus] = useState(MyStatus.status_message);
  const [time, setTime] = useState(MyStatus.until);
  const [emoji, setEmoji] = useState(MyStatus.status_icon);
  const workspaceHV = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace).hashed_value;
  // const [chosenEmoji, setChosenEmoji] = useState();
  const Statusbtns = [];
  const Options = [];
  const Times = [];
  const options = ["📆 In a meeting", "🚗 Communicating", "🤒 Sick", "🌴 Vacationing", "🖥️ Working remotely"];
  const times = ["Don't Erase", "30 minute", "1 hour", "4 hour", "Today", "This week", "Choose date"];

  useEffect(() => {
    if (socket) socket.close();
    if (workspaceHV !== "") {
      setsocket(new WebSocket(`${WsUrl_status}${workspaceHV}/`));
    }
  }, [workspaceHV]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            authorization: at,
          }),
        );
      };
    }
  }, [socket]);
  const sendStatus = (event: { preventDefault: () => void }) => {
    setOpen(false);
    event.preventDefault();
    if (socket) {
      socket.send(
        JSON.stringify({
          status_message: status,
          status_icon: emoji,
          until: time,
        }),
      );
    }
  };

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    formData.append("status_message", status);
    // console.log(e.target.value);
    setStatus(e.target.value);
    setEmoji(e.target.value.slice(0, 2));
  }, []);

  const handleOnChange_T = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    formData.append("until", time);
    // console.log(e.target.value);
    setTime(e.target.value);
  }, []);

  for (const element of options) {
    Options.push(<option>{element}</option>);
  }
  for (const element of times) {
    Times.push(<option>{element}</option>);
  }
  const OptionMap = options.map(op => <option key={op}>{op}</option>);
  const TimeMap = times.map(ti => <option key={ti}>{ti}</option>);
  const StatusbtnMap = options.map(op => (
    <StatusButton
      key={op}
      onClick={() => {
        setOpen(true);
      }}
    >
      {op}
    </StatusButton>
  ));

  return (
    <div>
      <button
        onClick={() => {
          SetopenStatus(true);
        }}
      >
        {openStatus ? <Dialog open={openStatus}></Dialog> : ""}
      </button>
      <StatusDiv
        placeholder={"🙂What is your Status"}
        value={status}
        onClick={() => {
          setOpen(true);
        }}
      />
      <DialogContentText>until {time}</DialogContentText>
      <DialogContentText>{" For new slack channel for test : "}</DialogContentText>
      {StatusbtnMap}
      <Dialog
        disableEnforceFocus
        fullWidth={true}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperComponent={StyledPaper}
      >
        <DialogTitle>{"Set a status(Manual)"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Manual</DialogContentText>
        </DialogContent>
        <StatusSelect id="status" defaultValue={status} onChange={handleOnChange}>
          {OptionMap}
        </StatusSelect>
        <br />
        <DialogContentText>{"Remove status after ..."}</DialogContentText>
        <TimeSelect id="time" defaultValue={time} onChange={handleOnChange_T}>
          {TimeMap}
        </TimeSelect>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="outlined"
            color="inherit"
            autoFocus
          >
            Close
          </Button>
          <Button onClick={sendStatus} variant="contained" color="success" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusDefault;

const StyledPaper = styled(Paper)`
  & {
    background-color: white;
    max-width: max-content;
    width: 700px;
    border-radius: 10px;
    padding: 15px;
  }
`;

const StatusButton = styled.button`
  width: 600px;
  height: 40px;
  background-color: white;
  border: none;
  text-align: left;
  font-family: "Fira Code", emoji;
  font-size: 20px;
  :hover {
    background-color: #1264a3;
  }
`;

const StatusDiv = styled.input`
  border: 1px solid grey;
  margin-left: 40px;
  margin-bottom: 30px;
  width: 500px;
  height: 40px;
  font-size: 20px;
`;
const StatusSelect = styled.select`
  width: 600px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
const TimeSelect = styled.select`
  width: 600px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
