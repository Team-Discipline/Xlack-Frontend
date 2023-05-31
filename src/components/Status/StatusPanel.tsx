import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@mui/material/Button";
import "react-dropdown/style.css";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import StatusDefault from "./StatusDefault";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const StatusPanel = () => {
  const [open, setOpen] = React.useState(false);
  const [opendefault, setDefault] = React.useState(false);
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);

  const detailClickToOpen = async () => {
    setDefault(true);
  };

  return (
    <div>
      {MyStatus.status_icon ? (
        <StatusSet
          onClick={() => {
            setOpen(true);
          }}
        >
          {MyStatus.status_icon + MyStatus.until}
        </StatusSet>
      ) : (
        <Status
          onClick={() => {
            setOpen(true);
          }}
        >
          🙂What is your Status
        </Status>
      )}

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
    width: 1000px;
    border-radius: 10px;
    padding: 20px;
  }
`;
const Status = styled.button`
  border-radius: 10px;
  color: #3b3b3b;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  min-height: 3em;
  width: 100%;
  background-color: transparent;
  border: 0.025em solid #1a1a1a;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 3px;
  min-width: 0;
  outline: none;
  padding: 1em 7.75em;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;

  :hover {
    color: #fff;
    background-color: #8b00ff;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
`;
const StatusSet = styled.button`
  border-radius: 10px;
  color: #3b3b3b;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  min-height: 3em;
  width: 100%;
  background-color: transparent;
  border: 0.025em solid #1a1a1a;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  margin: 3px;
  min-width: 0;
  outline: none;
  padding: 1em 7em;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;

  :hover {
    color: #fff;
    background-color: #8b00ff;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
`;

const DefaultButton = styled.button`
  width: 700px;
  height: 40px;
  background-color: dodgerblue;
  margin-top: 10px;
  margin-bottom: 10px;
`;
