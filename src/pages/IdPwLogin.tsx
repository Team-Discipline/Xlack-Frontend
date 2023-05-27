import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { backUrl, setCookie, xlackUrl } from "../variable/cookie";
import { useNavigate } from "react-router-dom";

const IdPwLogin = () => {
  const navigate = useNavigate();

  let login_success = "";
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const login = async () => {
    const exptime = Number(new Date()) + 3600;
    await axios
      .post(`${backUrl}accounts/login/`, {
        username: id,
        password: pw,
      })
      .then(response => {
        const d = response.data;
        if (response.status == 200) {
          login_success = "success";
          setCookie("access_token", d.access, 2);
          setCookie("exp", exptime.toString());
          setCookie("refresh_token", d.refresh, {
            expires: new Date(),
            httpOnly: true,
          });
          console.log(id + pw);
        } else {
          login_success = "fail";
        }
        window.location.href = `${xlackUrl}main`;
        console.log(d);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isLocalhost = window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1");

  if (isLocalhost) {
    return (
      <>
        <Id onChange={event => setId(event.target.value)} />
        <Pw type={"password"} onChange={event => setPw(event.target.value)} />
        <div>{login_success}</div>
        <button
          onClick={() => {
            login();
          }}
        >
          로그인
        </button>
      </>
    );
  } else {
    return <></>;
  }
};
export default IdPwLogin;

const Id = styled.input`
  width: 100px;
  height: 50px;
`;
const Pw = styled.input`
  width: 100px;
  height: 50px;
`;
