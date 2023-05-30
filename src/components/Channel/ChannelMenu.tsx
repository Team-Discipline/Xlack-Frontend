import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { Update } from "../../variable/UpdateChannelSlice";
import axios from "axios";
import { at, backUrl } from "../../variable/cookie";
import { ChannelSettingOnOff } from "../../variable/OnModalSlice";

const ChannelMenu = (props: any) => {
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace);
  const dispatch = useDispatch();
  const editChannelName = async () => {
    try {
      const newChannelName: string | null = prompt("Please enter the channel name(2-10)");
      if (newChannelName) {
        if (newChannelName.length < 2 || newChannelName.length > 10) {
          window.alert("채널이름이 적절하지 않습니다.");
        } else {
          await axios.patch(
            `${backUrl}channel/${currentWorkspace.ClickedWorkSpace.hashed_value}/${currentWorkspace.rightClicked_channel_hashed_value}/`,
            {
              name: newChannelName,
            },
            {
              headers: {
                Authorization: `Bearer ${at}`,
              },
            },
          );
          dispatch(Update());
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const exitChannel = async () => {
    // // 내 토큰으로 접근 되는 채널중 채널id 값의 채널 삭제
    //
    // console.log("exit test");
    //
    // try {
    //   await axios.delete(`${backUrl}channel/${ClickedChannel.hashed_value}/`, {
    //     headers: {
    //       Authorization: `Bearer ${at}`,
    //     },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    //
    // dispatch(Update());
  };

  return (
    <>
      <Menu>
        <h3
          onClick={() => {
            dispatch(ChannelSettingOnOff());
          }}
        >
          채널 세부정보로 보기
        </h3>
        <h3 onClick={editChannelName}>채널이름 바꾸기</h3>
        <h3 onClick={exitChannel}>나가기</h3>
      </Menu>
    </>
  );
};

export default ChannelMenu;

const Menu = styled.div`
  background-color: white;
  color: black;
  border-radius: 5px;
  text-align: center;

  > h3 {
    border-bottom: 1px solid #49274b;
  }

  > h3:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
