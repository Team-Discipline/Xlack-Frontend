import styled from "styled-components";
import React, { useState } from "react";
import { xlackUrl } from "../../variable/cookie";

function ModalMenuList() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <MenuList>
      <div>
        <Button>프로필</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>upgrade option</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>채널에 사용자 초대</Button>
        <Button>채널 새성</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>환경설정</Button>
        <Button>설정 및 관리</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>도구</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {isHovering ? (
          <Sub>
            <RealSub>asd</RealSub>
          </Sub>
        ) : (
          <></>
        )}
        <Button className="createWork" onClick={() => (window.location.href = `${xlackUrl}setTeamName`)}>
          워크스페이스 추가
        </Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>데스크톱 앱 열기</Button>
        <Button>모바일앱 받기</Button>
        <Separator>
          <hr />
        </Separator>
      </div>
      <div>
        <Button>모바일에서 채널에 로그인하기</Button>
        <Button>채널에서 로그아웃 </Button>
        <Separator>
          <hr />
        </Separator>
      </div>
    </MenuList>
  );
}
const Separator = styled.div`
  padding: 8px;
`;
const MenuList = styled.menu`
  padding-left: 0px;
  //width: 300px;
  //height: 577px;
`;

const SubMenu = styled.div`
  padding-left: 0px;
`;
const Button = styled.button`
  display: block;
  align-items: center;
  background: #0000;
  border: 0;
  border-radius: 0;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  cursor: pointer;
  font: inherit;
  line-height: normal;
  min-height: 28px;
  overflow: visible;
  overflow-x: hidden;
  padding: 0 24px;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  .createWork {
  }
  &:hover {
    background-color: #1264a3;
    color: white;
  }
`;
const Sub = styled.div`
  left: 300px;
  top: 290px;
  position: absolute;
  width: 250px;
  height: 140px;
  box-sizing: inherit;
  display: block;
`;
const RealSub = styled.div`
  margin-left: 50px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  z-index: 1000000;
  border: solid #c5cacd 0.5px;
  border-radius: 8px;
  height: 140px;
`;
export default ModalMenuList;
