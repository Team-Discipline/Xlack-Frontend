import {Button} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import {backUrl, removeCookie} from '../features/cookie';

function Logout() {
    const logoutFC = () => {
        if (window.confirm('로그아웃 하시겟습니까?')) {
            removeCookie();
            LogoutPost();
            window.location.href = 'http://localhost:3000';
        } else {
            console.log('로그아웃 취소');
        }
    };
    return <Button onClick={logoutFC}>Logout</Button>;
}
function LogoutPost() {
    const url = `${backUrl}accounts/logout/`;
    const config = {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': 'HNjIpLRiGLyai7RmKNHhH8SOq6yzPWrndcnHRfy9nvs6vujwW0kk6jUTxSn57ttZ',
        },
    };
    axios.post(url, null, config);
}
export default Logout;
