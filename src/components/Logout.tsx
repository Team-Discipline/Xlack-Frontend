import axios from "axios";
import React from "react";
import { backUrl, removeCookie, xlackUrl } from "../variable/cookie";
import styled from "styled-components";

function Logout() {
  const logoutFC = () => {
    if (window.confirm("로그아웃 하시겟습니까?")) {
      removeCookie();
      LogoutPost();
      window.location.href = `${xlackUrl}`;
    } else {
      console.log("로그아웃 취소");
    }
  };
  return <LogoutButton onClick={logoutFC}>LOGOUT</LogoutButton>;
}

function LogoutPost() {
  const url = `${backUrl}accounts/logout/`;
  const config = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": "HNjIpLRiGLyai7RmKNHhH8SOq6yzPWrndcnHRfy9nvs6vujwW0kk6jUTxSn57ttZ",
    },
  };
  axios.post(url, null, config);
}

export default Logout;
const LogoutButton = styled.button`
  align-items: center;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  text-decoration: none;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  padding: 1rem;

  :before {
    background-color: #fff;
    content: "";
    display: inline-block;
    height: 1px;
    margin-right: 10px;
    transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
    width: 0;
  }

  :hover:before {
    background-color: #fff;
    width: 3rem;
  }
`;
