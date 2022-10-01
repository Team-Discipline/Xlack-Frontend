import React, {useEffect} from 'react';
import styled from 'styled-components';
import {LoginDjango} from '../features/login';
import LoginGithub from 'react-login-github';
import {setCookie} from '../features/cookie';
import {Navigate} from 'react-router-dom';
import AccessTime from '@mui/icons-material/AccessTime';
function Login() {
    const onSuccess = (response: any) => {
        let token_info;
        LoginDjango(response['code']).then(res => {
            token_info = res;
            AccessToken(token_info, Date.now() + 3600000);
            //console.log(token_info);
        });
    };

    const onFailure = (response: any) => console.error(response);

    return (
        <>
            <LoginContainer>
                <LoginImageContainer>
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                </LoginImageContainer>
                <LoginGithub clientId="9ac10cd868488ad0185b" scope="read:user" onSuccess={onSuccess}>
                    <p id="loginbutton">Continue with GitHub</p>
                </LoginGithub>
            </LoginContainer>
        </>
    );
}
export function AccessToken(resData: any, exp: any) {
    const access_token = resData.access_token;
    //access_token 존재시 쿠키에 넣어줌
    const refresh_token = resData.refresh_token;
    const exptime = exp;
    //    const expire
    if (access_token) {
        setCookie('access_token', access_token, {
            httpOnly: true,
        });
        setCookie('exp', exptime);
        setCookie('refresh_token', refresh_token, {
            expires: new Date(),
            httpOnly: true,
        });
        window.location.href = 'http://localhost:3000/main';
    }
}
export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
    > button {
        width: 300px;
        margin-top: -459px;
    }
`;

const LoginImageContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    > img {
        object-fit: contain;
        height: 100px;
    }
    margin-top: -500px;
    margin-bottom: -700px;
`;
