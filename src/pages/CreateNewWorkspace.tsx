import styled from "styled-components";
import React from "react";
import LoginGithub from "react-login-github";
import { useNavigate } from "react-router-dom";
import { backUrl, xlackUrl } from "../variable/cookie";
import axios from "axios";

async function CreateW(code: string): Promise<JSON> {
  const url = `${backUrl}token/github/`;
  const config = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      // TODO: Add real CSRF Token.
      // 'X-CSRFToken': 'NJfuIPmycNBlby6TW4r5xirFqq23915KBfU0h4jekTz8JDmpcPRD2z6MaIOCHYGL',
    },
  };
  const data = {
    access_token: "",
    code: code,
    id_token: "",
  };
  const res = await axios.post(url, data, config);
  return res.data;
}

function CreateNewWorkspace() {
  const navigate = useNavigate();
  const onSuccess = (response: never) => {
    let token_info;
    CreateW(response["code"]).then(res => {
      token_info = res;
      window.location.href = `${xlackUrl}setTeamName`;
    });
  };
  const onFailure = (response: any) => console.error(response);

  return (
    <Body className="body">
      <Header>
        <div className="left-col" />
        <div className="center-col">
          <a
            target="_self"
            className="c-link"
            //href 수정해야함!!!!!!!!!!!!!
            href="https://slack.com"
            rel="noopener noreferrer"
          >
            <img className="img" alt="Slack" src="https://a.slack-edge.com/bv1-10/slack_logo-ebd02d1.svg" height="26" title="Slack" />
          </a>
        </div>
        <div className="right-col" />
      </Header>
      <Div2>
        <H1> 먼저 이메일부터 입력해 보세요</H1>
        <div className="subHeader">
          <strong>직장에서 사용하는 이메일 주소</strong>로 로그인하는 걸 추천드려요.
        </div>
        <form className="input_form">
          <label id="creator_signup_label"></label>
          <input
            className="creator_signup_form_input"
            spellCheck={false}
            min={0}
            max={0}
            width={0}
            aria-describedby="creator_signup_email_hint"
            aria-labelledby="creator_signup_label"
            // aria-required={true}
            // aria-label
            autoComplete="on"
            id="creator_signup_email"
            name="email"
            placeholder="name@work-email.com"
            type="email"
          />
          <LoginGithub className="button" id="submitButton" type="button" clientId="9ac10cd868488ad0185b" scope="read:user" onSuccess={onSuccess} onFailure={onFailure}>
            계속
          </LoginGithub>
          <div className="horizontal_content">
            <hr className="horizontal_content_left" />
            <div className="horizontal_content_center">또는</div>
            <hr className="horizontal_content_right"></hr>
          </div>
        </form>
      </Div2>
      <Div3></Div3>
    </Body>
  );
}

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
const Div3 = styled.div``;
const Header = styled.header`
  display: grid;
  align-items: center;
  box-sizing: border-box;
  //display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 48px 0 40px;
  width: 100%;

  .center-col {
    //align-items: center;
    text-align: center;
    display: block;
  }
`;
const Div2 = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  max-width: 800px;
  width: 100%;
  box-sizing: inherit;

  .subHeader {
    color: #454245;
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 32px;
    max-width: 700px;
    text-align: center;
  }

  .input_form {
    max-width: 400px;
    width: 100%;
    position: relative;
    box-sizing: inherit;
  }

  .creator_signup_label {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    user-select: none;
  }

  .creator_signup_form_input {
    position: relative;
    width: 86%;
    padding: 11px 12px 13px;
    height: 28px;
    font-size: 18px;
    line-height: 1.3333333;
    margin: 0 0 20px;
    padding-right: 40px !important;
  }

  .button {
    //display: inline-flex;
    margin-bottom: 20px;
    width: 100%;
    background-color: #611f69;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    height: 44px;
    min-width: 96px;
    padding: 0 15px 3px;
  }

  .horizontal_content {
    margin-bottom: 24px;
    margin-top: 8px;
    align-items: center;
    display: flex;
    width: 100%;
  }

  .horizontal_content_left {
    flex-grow: 1;
    margin: 0;
    border: none;
    border-top: 1px solid #ddd;
    clear: both;
  }

  .horizontal_content_center {
    padding: 0 20px;
  }

  .horizontal_content_right {
    flex-grow: 1;
    margin: 0;
    border: none;
    border-top: 1px solid #ddd;
    clear: both;
  }
`;
const H1 = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.75px;
  line-height: 46px;
  margin-bottom: 10px;
  max-width: 700px;
  text-align: center;
`;

export default CreateNewWorkspace;
