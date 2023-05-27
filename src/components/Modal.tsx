import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import MenuList from "./Sidebar/ModalMenuList";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>
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
  top: 0px;
  width: 100%;
  height: 100%;
  display: block;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const DialogBox = styled.dialog`
  top: 145px;
  width: 350px;
  height: 700px;
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

// const Backdrop = styled.div`
//     width: 100vw;
//     height: 100vh;
//     position: fixed;
//     top: 0;
//     z-index: 9999;
//     background-color: rgba(0, 0, 0, 0.2);
// `;

export default Modal;
