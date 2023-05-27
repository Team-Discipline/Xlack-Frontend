import React, { useState } from "react";
import styled from "styled-components";
import { xlackUrl } from "../../variable/cookie";

function WorkspaceMenuList() {
  const [isHovering, setIsHovering] = useState(0);
  return (
    <MenuList>
      {/*<div>*/}
      {/*  <Button*/}
      {/*    className="createWork"*/}
      {/*    // onClick={() =>*/}
      {/*    //   (window.location.href = "http://localhost:3000/setTeamName")*/}
      {/*    // }*/}
      {/*  >*/}
      {/*    다른 워크스페이스에 로그인*/}
      {/*  </Button>*/}
      {/*  <Separator></Separator>*/}
      {/*</div>*/}
      <div>
        <Button className="createWork" onClick={() => (window.location.href = `${xlackUrl}setTeamName`)}>
          새 워크스페이스 개설
        </Button>
        <Separator></Separator>
      </div>
      {/*<div>*/}
      {/*  <Button*/}
      {/*    className="createWork"*/}
      {/*    // onClick={() =>*/}
      {/*    //   (window.location.href = "http://localhost:3000/setTeamName")*/}
      {/*    // }*/}
      {/*  >*/}
      {/*    워크스페이스 찾기*/}
      {/*  </Button>*/}
      {/*  <Separator></Separator>*/}
      {/*</div>*/}
    </MenuList>
  );
}

const Separator = styled.div`
  padding: 8px;
`;
const MenuList = styled.menu`
  padding-left: 0px;
  //width: 300px;
  display: grid;
  height: auto;
`;

const Button = styled.button`
  display: grid;
  align-items: center;
  background: #0000;
  border: 0;
  border-radius: 0;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  font: inherit;
  line-height: normal;
  //min-height: 28px;
  overflow: visible;
  overflow-x: hidden;
  padding: 0 24px;
  font-size: 16px;
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

export default WorkspaceMenuList;
