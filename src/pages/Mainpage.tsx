import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";
import Logout from "../components/Logout";
import styled from "styled-components";
import axios from "axios";
import { at, backUrl } from "../variable/cookie";
import { useDispatch, useSelector } from "react-redux";
import { enterWorkSpace } from "../variable/WorkSpaceSlice";
import { WorkspaceType } from "../components/types";
import { RootState } from "../app/store";

const Mainpage = () => {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState<string[]>([]);
  const Workspace = useSelector(
    (state: RootState) => state.getMyWorkSpace.hashed
  );

  const getMyWorkspace = async () => {
    await axios
      .get(`${backUrl}workspace/`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      })
      .then((res) => {
        console.log("나의 workspace 정보: ", res.data);

        res.data.map((value: WorkspaceType) => {
          dispatch(enterWorkSpace(value));
        });
      })
      .catch((e) => console.log("getWorkspace error : ", e));
  };

  useEffect(() => {
    getMyWorkspace();
  }, []);

  return (
    <>
      <Logout />
      <AppBody>
        <Header />
        <Sidebar />
        <Chat />
      </AppBody>
    </>
  );
};

export default Mainpage;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
