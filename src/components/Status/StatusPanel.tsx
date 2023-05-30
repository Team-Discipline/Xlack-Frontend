import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@mui/material/Button";
import "react-dropdown/style.css";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import StatusDefault from "./StatusDefault";
import { at, WsUrl_status } from "../../variable/cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const StatusPanel = () => {
  const [open, setOpen] = React.useState(false);
  const [opendefault, setDefault] = React.useState(false);
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);

  const handleClickToOpen = async () => {
    setOpen(true);
  };
  const detailClickToOpen = async () => {
    setDefault(true);
  };

  return (
    <div>
      <ProfileButton
        onClick={() => {
          handleClickToOpen();
        }}
      >
        Set a status
      </ProfileButton>
      <Dialog
        disableEnforceFocus
        fullWidth={true}
        scroll={"body"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperComponent={StyledPaper}
      >
        {" "}
        <DialogTitle>{"Set a status"}</DialogTitle>
        {!detailClickToOpen ? <DefaultButton onClick={detailClickToOpen} children={opendefault} /> : <StatusDefault />}
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="outlined"
            color="inherit"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusPanel;

const StyledPaper = styled(Paper)`
  & {
    background-color: white;
    max-width: max-content;
    width: 700px;
    border-radius: 10px;
    padding: 15px;
  }
`;
const Status = styled.span`
  border-bottom: 1px solid #49274b;
  border-radius: 10px;
  background-color: white;
  color: black;
`;
const DefaultButton = styled.button`
  width: 600px;
  height: 40px;
  background-color: dodgerblue;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProfileButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0.025em solid #1a1a1a;
  border-radius: 0.9375em;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 3px;
  min-height: 3.75em;
  min-width: 0;
  outline: none;
  padding: 1em 2.3em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  :disabled {
    pointer-events: none;
  }

  :hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  :active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
