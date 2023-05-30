import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { Update } from "../../variable/UpdateChannelSlice";
import axios from "axios";
import { at, AtVerify, backUrl, removeCookie, UpdateToken } from "../../variable/cookie";
import { ChannelSettingOnOff } from "../../variable/OnModalSlice";

const ChannelMenu = (props: any) => {
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace);
  const MyUser = useSelector((state: RootState) => state.getMyProfile.userData);
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
    if ((await AtVerify()) == 200) {
      try {
        await axios.delete(`${backUrl}channel/${currentWorkspace.ClickedWorkSpace.hashed_value}/${currentWorkspace.rightClicked_channel_hashed_value}/members/${MyUser.username}/`, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        window.alert("채널 나가기 성공");
        // 유저가 행동을 한다는 것 이므로 토큰 새로받아줌
        UpdateToken();
      } catch (err) {
        window.alert("권한이 없습니다.");
        console.log(err);
      }
    } else {
      // 행동할 때만 유지시키기 위해서 이미 만료됐으면 재로그인
      removeCookie();
    }
    dispatch(Update());
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
