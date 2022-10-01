import axios from 'axios';
import {useState} from 'react';
import {Cookies} from 'react-cookie';
import {UserDetailsType} from '../components/types';
import {useLocation} from 'react-router-dom';
import {AccessToken} from '../pages/Login';

export async function UpdateToken() {
    const check = rt;
    if (check) {
        let token_info;
        //already has accessToken.
        const res = await axios
            .post(
                `${backUrl}accounts/token/refresh/`,
                {
                    refresh: check,
                },
                {
                    validateStatus: function (status: number) {
                        return status < 500;
                    },
                },
            )
            .then(res => {
                token_info = res;
                AccessToken(token_info, null);
            });
    }
}
export async function AtVerify() {
    const check = await axios.post(
        `${backUrl}accounts/token/verify/`,
        {token: at},
        {
            validateStatus: function (status: number) {
                return status < 500;
            },
        },
    );
    return check.status;
}

const cookies = new Cookies();

export const backUrl = 'https://xlack-backend.herokuapp.com/';
export const WsUrl = 'ws://xlack-backend.herokuapp.com/ws/chat/';
export const setCookie = (name: string, value: string, option?: any) => {
    return cookies.set(name, value, {});
};
const getCookie = (name: string) => {
    return cookies.get(name);
};
export const removeCookie = () => {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
};
export const at = getCookie('access_token');
export const rt = getCookie('refresh_token');
export const exp = getCookie('exp');
//export const searchParams = useLocation().search;
