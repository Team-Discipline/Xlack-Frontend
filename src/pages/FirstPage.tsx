import React from "react";
import styled, { keyframes } from "styled-components";
import xlackLogo from "../image/xlack.png";
import preview from "../image/preview.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { bounceInRight, fadeIn } from "react-animations";
import { Link, useNavigate } from "react-router-dom";

function FistPage() {
  const navigate = useNavigate();
  return (
    <>
      <LoginContainer>
        <Contents>
          <ImageContainer>
            <img src={xlackLogo} alt="slackLogo" />
          </ImageContainer>
          <Titlemessage>
            Slack brings the <br /> team together <br /> wherever you are
          </Titlemessage>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Go to Login
          </button>
          <Submessage>
            Is your team new to Xlack?&nbsp;
            <Link
              to={"/workspace"}
              style={{ color: "white", fontSize: "20px" }}
            >
              Create a new Workspace
            </Link>
          </Submessage>
        </Contents>
        <PreviewImageContainer>
          <img src={preview} alt="preview" />
        </PreviewImageContainer>
      </LoginContainer>
    </>
  );
}

export default FistPage;

const rightShift = keyframes`${bounceInRight}`;
const fade = keyframes`${fadeIn}`;

const LoginContainer = styled.div`
  background-color: #3f0f40;
  height: 100vh;
  display: grid;
`;

const ImageContainer = styled.div`
  animation: 1s ${rightShift};
`;
const PreviewImageContainer = styled.div`
  margin-left: 50%;
  margin-top: 10%;
  position: absolute;
  display: inline-block;
  animation: 3s ${fade};
`;

const Titlemessage = styled.div`
  color: white;
  font-size: 60px;
  margin-top: 10px;
  font-weight: bold;
  animation: 0.7s ${rightShift};
`;

const Submessage = styled.div`
  color: white;
  font-size: 20px;
  margin-top: 10px;
  animation: 0.75s ${rightShift};
`;

const Contents = styled.div`
  width: 500px;
  height: 400px;
  margin-top: 10%;
  margin-left: 10%;
  > button {
    margin-top: 100px;
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
