import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import WorkspaceMenuList from "./WorkspaceMenuList";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function PlusModal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>
        <WorkspaceMenuList></WorkspaceMenuList>
        {(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      </DialogBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  top: -120px;
  width: 100%;
  height: 100%;
  display: block;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const DialogBox = styled.dialog`
  top: 135px;
  left: 35px;
  width: 280px;
  height: auto;
  position: absolute;
  display: block;
  padding: 12px 0;
  flex-direction: column;
  align-items: center;
  border: solid #c5cacd 0.5px;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  //box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;
export default PlusModal;
