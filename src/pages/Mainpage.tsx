import React, { ChangeEvent, DragEvent, useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import styled from "styled-components";
import axios from "axios";
import { at, AtVerify, backUrl, removeCookie } from "../variable/cookie";
import { useDispatch, useSelector } from "react-redux";
import { CallClickedWorkSpace, clearWorkSpace, CompleteGetMyWorkspace, getWorkSpace, SaveChat, SearchChannel } from "../variable/WorkSpaceSlice";
import { WorkspaceType } from "../types/types";
import { RootState } from "../app/store";
import Profile from "../components/Profile/Profile";
import { getMyProfile } from "../variable/MyProfileSlice";
import { SelectWorkspace } from "../components/Workspace/Workspace";
import PlusModal from "../components/Workspace/PlusModal";
import ChannelSetting from "../components/Channel/ChannelSetting";
import { setFileName } from "../variable/ChatSlice";
import { Notifi } from "../components/Notification/notification";
import ReactionListener from "../components/Channel/ReactionListener";

const Mainpage = () => {
  const dispatch = useDispatch();
  const Update = useSelector((state: RootState) => state.UpdateChannel);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const OpenChannelSetting = useSelector((state: RootState) => state.OnModal.OnChannelSetting);
  const Workspace = useSelector((state: RootState) => state.getMyWorkSpace.MyWorkSpace);
  const U = useSelector((state: RootState) => state.UnReadChannel.CompleteGetUnreadChannel);
  const formatArr: string[] = ["JPG", "JPEG", "PNG", "PDF", "TXT", "ZIP", "PY", "C", "TS", "TSX"];
  const GetChatInAllChannel = (Ws: WorkspaceType) => {
    Ws.chat_channel?.forEach(async channel => {
      try {
        const res = await axios.get(`${backUrl}chat/${channel.hashed_value}/`, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        //데이터 받을 때 created_at 형태 바꿔줄 필요 있음
        dispatch(SaveChat([channel, res.data]));
      } catch (err) {
        console.log("receiveChatError: ", err);
      }
    });
  };
  const getMyUser = async () => {
    if ((await AtVerify()) == 200) {
      try {
        const UsersData = await axios.get(`${backUrl}profile/`, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        dispatch(getMyProfile(UsersData.data));
      } catch (err) {
        console.log(err);
      }
    } else {
      //행동할 때만 유지시키기 위해서 이미 만료됐으면 재로그인
      removeCookie();
      // TODO document why this block is empty
    }
  };
  const getMyWorkspace = async () => {
    await axios
      .get(`${backUrl}workspace/`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      })
      .then(res => {
        dispatch(clearWorkSpace());
        res.data.map((value: WorkspaceType) => {
          dispatch(getWorkSpace(value));
          GetChatInAllChannel(value);
        });
        dispatch(CompleteGetMyWorkspace());
      })
      .catch(e => console.log("getWorkspace error : ", e));
  };

  useEffect(() => {
    getMyUser();
    getMyWorkspace();
  }, [Update]);
  useEffect(() => {
    dispatch(CallClickedWorkSpace());
    dispatch(SearchChannel());
  }, [Workspace]);
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          Notifi();
        } else {
          window.alert("알림 권한을 설정해주세요");
        }
      });
    }
  }, []);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // 파일 처리 ondrop
  const onDropFiles = (e: DragEvent<HTMLDivElement>) => {
    console.log({ e }, e.dataTransfer.files);
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  let original_file_name: string;
  let file_name: string;
  let file_id: number;
  const handleFiles = async (files: FileList) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let fileList: Array<File> = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const element of files) {
      const file: File = element;
      const format: string = `${(file.name || "").split(".").slice(-1)}`.toUpperCase();

      if (formatArr.indexOf(format) > -1) {
        if (file) {
          if ((await AtVerify()) == 200) {
            fileList = [...fileList, file];
            await axios
              .post(
                `${backUrl}file/`,
                {
                  file: file,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${at}`,
                  },
                },
              )
              .then(res => {
                original_file_name = res.data.file;
                file_id = res.data.id;
                file_name = file.name + "/" + file_id.toString();
              });
            //dispatch(setFile(element));
            dispatch(setFileName(file_name));
          } else {
            alert(`지원하지 않는 포맷입니다: ${file.name} / FORMAT ${format}`);
            return;
          }
        }
      }
    }
  };

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <AppBody onDrop={onDropFiles} onDragOver={dragOver}>
        <Header />
        <SelectWorkspaces>
          {Workspace.map((element, i) => {
            return <SelectWorkspace key={i} {...element} />;
          })}
          <PlusButton onClick={onClickToggleModal}>+{isOpenModal && <PlusModal onClickToggleModal={onClickToggleModal}></PlusModal>}</PlusButton>
        </SelectWorkspaces>
        <Sidebar />
        <Profile />
        <ReactionListener />
        {OpenChannelSetting && <ChannelSetting />}
        {U && <Chat />}
      </AppBody>
    </>
  );
};

export default Mainpage;
const SelectWorkspaces = styled.div`
  flex-direction: column;
  align-items: center;
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
  background-color: var(--slack-color);
  border-right-width: 1px;
  border-right-style: solid;
  border-top-width: 1px;
  border-top-color: rgb(73, 39, 75);
  border-right-color: rgb(73, 39, 75);
  top: 73px;
  position: relative;
  width: 60px;
  align-content: center;
`;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const PlusButton = styled.div`
  color: white;
  font-size: 30px;
  //margin-top: -10px;
  align-items: center;
  text-align: center;
  width: fit-content;
  height: fit-content;
  display: inline-block;
  position: relative;
`;
