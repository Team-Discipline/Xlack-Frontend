import React from "react";
import { LoginDjango } from "../variable/login";
import LoginGithub from "react-login-github";
import { local, setCookie, xlackUrl } from "../variable/cookie";
import styled, { keyframes } from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { bounceInRight } from "react-animations";

function Login() {
  const onSuccess = (response: never) => {
    let token_info;
    LoginDjango(response["code"]).then(res => {
      token_info = res;
      AccessToken(token_info, Date.now() + 3600000);
    });
  };

  const onFailure = (response: any) => console.error(response);

  return (
    <LoginContainer>
      <LoginGithub clientId="9ac10cd868488ad0185b" scope="read:user" onSuccess={onSuccess} onFailure={onFailure}>
        Sign In to Slack
      </LoginGithub>
      <LoginMessage>We'll take you to the Github login page, and bring you back here.</LoginMessage>
      <LoginMessage>
        Is your team new to Slack?&nbsp;
        <a href={`${xlackUrl}Workspace`} style={{ color: "white", fontSize: "20px" }}>
          Create a new Workspace
        </a>
      </LoginMessage>
    </LoginContainer>
  );
}

export function AccessToken(resData: any, exp: any) {
  const access_token = resData.access;
  //access_token 존재시 쿠키에 넣어줌
  const refresh_token = resData.refresh;
  const exptime = exp;

  //    const expire
  if (access_token) {
    setCookie("access_token", access_token, {
      httpOnly: true,
    });
    setCookie("exp", exptime);
    setCookie("refresh_token", refresh_token, {
      expires: new Date(),
      httpOnly: true,
    });
    window.location.href = `${xlackUrl}main`;
  }
}

export default Login;

const rightShift = keyframes`${bounceInRight}`;
const LoginContainer = styled.div`
  background-color: #3f0f40;
  height: 100vh;
  display: grid;
  place-items: center;

  > button {
    margin-top: 300px;
    align-self: center;
    width: 500px;
    height: 60px;
    background-color: #457359;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    border: none;
    border-radius: 5px;
    animation: 1s ${rightShift};
  }
`;

const LoginImageContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #3f0f40;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
  }

  margin-top: -500px;
  margin-bottom: -700px;
`;

const LoginMessage = styled.div`
  color: white;
  font-size: 20px;
  position: relative;
  margin-top: 10px;
  animation: 1s ${rightShift};
`;
