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

const StatusDefault = () => {
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openStatus, SetopenStatus] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [clickOption, setClickOption] = useState<string>("");
  const workspaceHV = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace).hashed_value;
  const Options = [];
  const Times = [];
  const options = ["📆 In a meeting", "🚗 Communicating", "🤒 Sick", "🌴 Vacationing", "🖥️ Working remotely"];
  const times = ["10 minutes", "30 minutes", "1 hour", "2 hours", "3 hours", "4 hours", "6 hours", "Today"];

  const sendStatus = () => {
    setOpen(false);
    const statusWS = new WebSocket(`${WsUrl_status}${workspaceHV}/`);
    if (statusWS) {
      statusWS.onopen = async () => {
        statusWS.send(
          JSON.stringify({
            authorization: at,
          }),
        );
        statusWS.send(
          JSON.stringify({
            status_message: message,
            status_icon: emoji,
            until: new Date(time).toString(),
          }),
        );
      };
    }
  };

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const em = e.target.value.slice(0, 2);
    setMessage(e.target.value.toString().replace(em, ""));
    setEmoji(em);
  }, []);

  const handleOnChange_T = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    convertTime(e.target.value.toString());
  }, []);

  const convertTime = (inputTime: string) => {
    const now = new Date();
    let numTime: string;
    const splitTime = Number(inputTime.split(" ")[0]);
    let convertedTime: number;
    if (isNaN(splitTime)) {
      convertedTime = now.setTime(now.getTime() + 1000 * 60 * 60 * 24);
    } else if (splitTime >= 10) {
      convertedTime = now.setTime(now.getTime() + 1000 * 60 * splitTime);
    } else {
      numTime = splitTime.toString();
      convertedTime = now.setTime(now.getTime() + 1000 * 60 * 60 * Number(numTime));
    }
    setTime(new Date(convertedTime).toString().split("(")[0].split("GMT")[0]);
  };

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
        setClickOption(op);
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
        defaultValue={MyStatus.status_icon + MyStatus.status_message}
        onClick={() => {
          setOpen(true);
        }}
      />
      <DialogContentText>until {time}</DialogContentText>
      <DialogContentText>{" For new slack channel for test : "}</DialogContentText>
      {StatusbtnMap}
      <hr />
      <StatusButton
        onClick={() => {
          dispatch(setStatus({ status_icon: "", status_message: "", until: "" }));
        }}
      >
        ❌ Erase Status
      </StatusButton>
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
        <StatusSelect id="status" defaultValue={clickOption} onChange={handleOnChange}>
          {OptionMap}
        </StatusSelect>
        <br />
        <DialogContentText>{"Remove status after ..."}</DialogContentText>
        <TimeSelect id="time" defaultValue={MyStatus.until} onChange={handleOnChange_T}>
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
          <Button
            onClick={() => {
              sendStatus();
              dispatch(setStatus({ status_message: message, status_icon: emoji, until: time }));
            }}
            variant="contained"
            color="success"
            autoFocus
          >
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
    width: 500px;
    max-width: max-content;
    border-radius: 10px;
    padding: 15px;
  }
`;

const StatusButton = styled.button`
  width: 500px;
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
  width: 550px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
const TimeSelect = styled.select`
  width: 550px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
