import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ProfileMenu from "./Profile/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Historymenu from "./History/Historymenu";
import Logout from "./Logout";

function Header() {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showHistorymenu, setShowHistorymenu] = useState<boolean>(false);
  const MyUser = useSelector((state: RootState) => state.getMyProfile.userData);
  const historyMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);

  useEffect(() => {
    // historyMenuRef 를 이용해 이외의 영역이 클릭되면 채널메뉴 없애기
    function handleClickOutside(e: MouseEvent): void {
      if (historyMenuRef.current && !historyMenuRef.current.contains(e.target as Node)) {
        setShowHistorymenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [historyMenuRef]);

  useEffect(() => {
    // channelMenuRef 를 이용해 이외의 영역이 클릭되면 채널메뉴 없애기
    function handleClickOutside(e: MouseEvent): void {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <HeaderContainer>
      <Logout />
      {/* Header Left */}
      <HeaderLeft ref={historyMenuRef}>
        <AccessTimeIcon
          onClick={e => {
            e.preventDefault();
            setShowHistorymenu(!showHistorymenu);
          }}
        />
        {showHistorymenu && (
          <div className="z-10">
            <Historymenu
              onshow={() => {
                setShowHistorymenu(!showHistorymenu);
              }}
            />
          </div>
        )}
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search - (Ctrl + F)"></input>
      </HeaderSearch>
      {/* {Header Right} */}
      <HeaderRight>
        <HelpOutlineIcon />
        {MyStatus.status_icon}
        <HeaderAvatar
          ref={profileMenuRef}
          src={MyUser.profile_image}
          onClick={e => {
            e.preventDefault();
            setShowProfile(!showProfile);
          }}
          //TODO: Add onclick
        />
        {showProfile && (
          <div>
            <ProfileMenu />
          </div>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    border-radius: 6px;
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    /* AccessTimeIcon */
    margin-left: auto;
    margin-right: 30px;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  margin-right: 12px;

  > .MuiSvgIcon-root {
    /* HelpOutlineIcon */
    margin-left: auto;
    margin-right: 20px;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
