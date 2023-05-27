import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AddChannel from "../Channel/AddChannel";
import { RootState } from "../../app/store";
import ChannelMenu from "../Channel/ChannelMenu";
import { setClickedChannel, setClickedChannel_hv, setUnClickedChannel } from "../../variable/ClickedChannelSlice";
import Channel from "../Channel/Channel";
import Modal from "../Modal";
import { CallClickedWorkSpace, rightClick_channel, SearchChannel } from "../../variable/WorkSpaceSlice";
import { setClickBookmarkPage } from "../../variable/ChatBookmarkSlice";

function Sidebar() {
  const max_history_size = 6;
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [historyMap, setHistoryMap] = useState(new Map<string, string>());
  const WorkspaceData = useSelector((state: RootState) => state.getMyWorkSpace.MyWorkSpace);
  const [showChannelMenu, setshowChannelMenu] = useState(false);
  const [showChannels, setshowChannels] = useState(false);
  const channelMenuRef = useRef<HTMLDivElement>(null);
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace);
  const currentChannel_hv = useSelector((state: RootState) => state.ClickedChannel.channel_hv);

  useEffect(() => {
    if (window.localStorage.getItem("history") !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const h = JSON.parse(window.localStorage.getItem("history"));
      // 새로고침할떄 history 남아있게

      const arrMap = h.reduce((map: Map<string, string>, obj: { name: string; value: string }) => {
        map.set(obj.name, obj.value);
        return map;
      }, new Map());
      setHistoryMap(arrMap);
    }
  }, [WorkspaceData]);
  useEffect(() => {
    setshowChannelMenu(false);
  }, [currentWorkspace.hashed_value]);

  useEffect(() => {
    // channelMenuRef 를 이용해 이외의 영역이 클릭되면 채널메뉴 없애기
    function handleClickOutside(e: MouseEvent): void {
      console.log(channelMenuRef.current);
      if (channelMenuRef.current && !channelMenuRef.current.contains(e.target as Node)) {
        setshowChannelMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [channelMenuRef]);

  const storeHistory = (name: string, hv: string) => {
    historyMap.delete(name);
    historyMap.set(name, hv);
    const array = Array.from(historyMap, ([name, value]) => ({
      name,
      value,
    })).reverse();
    if (array.length > max_history_size) array.pop();
    window.localStorage.setItem("history", JSON.stringify(array));
  };
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const onClickshowChannelMenu = useCallback(() => {
    setshowChannelMenu(prev => !prev);
  }, []);

  const onClickshowChannels = useCallback(() => {
    setshowChannels(prev => !prev);
  }, []);
  const ChangeChannel = (channel_hv: string) => {
    dispatch(CallClickedWorkSpace());
    //저장된 워크스페이스내부 챗데이터들을 포함해 갱신된 데이터 다시 불러오기
    currentWorkspace.chat_channel?.forEach(c => {
      if (channel_hv === c.hashed_value) {
        dispatch(setClickedChannel(c));
      }
    });
  };
  return (
    <SidebarContainer>
      <SidebarHeader onClick={onClickToggleModal}>
        {/*{isOpenModal && <Modal onClickToggleModal={onClickToggleModal}></Modal>}*/}
        <SidebarTop className="sidebarTop">
          <div className="sidebarHeaderButton">
            <div className="sidebarHeaderInfo">
              <div className="teamName">
                <div className="loadingSpacer"></div>
                <span>{currentWorkspace.name}</span>
              </div>
            </div>
          </div>
        </SidebarTop>

        {/* <span onClick={editProfile}>
                    <CreateIcon />
                </span> */}
      </SidebarHeader>
      <ChannelInSide>
        <span
          className={currentChannel_hv === "-2" ? "click" : "non-click"}
          onClick={() => {
            dispatch(setClickBookmarkPage(true));
            dispatch(setUnClickedChannel());
            dispatch(setClickedChannel_hv("-2"));
          }}
        >
          <SidebarOption Icon={ExpandMoreIcon} title="ChatBookmark" />
        </span>
      </ChannelInSide>
      <hr />

      <span onClick={onClickshowChannels}>
        <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      </span>
      <hr />
      {showChannels && <AddChannel Icon={AddIcon} title="Add Channel" />}
      {showChannels &&
        currentWorkspace.chat_channel?.map((c, i) => {
          return (
            <ChannelInSide key={i}>
              <span
                className={currentChannel_hv === c.hashed_value ? "click" : "non-click"}
                ref={channelMenuRef}
                onClick={e => {
                  e.preventDefault();
                  storeHistory(c.name, c.hashed_value);
                  ChangeChannel(c.hashed_value);
                  dispatch(setClickBookmarkPage(false));
                  // connectChat(enterRoomId)
                }}
                onContextMenu={e => {
                  e.preventDefault();
                  setx(e.clientX);
                  sety(e.clientY);
                  dispatch(rightClick_channel(c.hashed_value));
                  dispatch(SearchChannel());
                  showChannelMenu && onClickshowChannelMenu();
                  onClickshowChannelMenu();
                }}
              >
                <Channel {...c} />
              </span>
            </ChannelInSide>
          );
        })}

      {showChannelMenu && (
        <div style={{ position: "absolute", top: y, left: x }}>
          <ChannelMenu />
        </div>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
const ChannelInSide = styled.span`
  .click {
    background-color: #fff;
    color: #404a5c;
  }

  .non-click {
    background-color: #505bf0;
    color: #fff;
  }
`;
const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  justify-content: space-between;
  align-items: center;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  //???
  > div > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > div > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > div > h3 > .MuiSvgIcon-root {
    font-size: 13px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
const SidebarTop = styled.div`
  .sidebarTop {
    align-items: stretch;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    position: relative;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.33334;
    min-height: 50px;
    background: rgb(82, 38, 83);
    color: #ffffff;

    .sidebarHeaderButton {
      outline: none;
      display: flex;
      cursor: pointer;
      padding: 12px 54px 0 16px;
      align-items: flex-start;
      min-height: inherit;
      min-width: 0;
      flex-direction: row-reverse;
      background-color: initial;
      border-color: rgb(82, 38, 83);

      .sidebarHeaderInfo {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;

        .teamName {
          display: flex;
          align-items: center;
          padding-left: 4px;
          max-width: 100%;
          margin-left: -4px;

          .loadingSpacer {
            width: 65%;
            border-radius: 8px;
            height: 15px;
            background-color: #ffffff1a;
            margin-right: 16px;
            box-sizing: inherit;
          }
        }
      }
    }
`;
