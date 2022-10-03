import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../app/store';
import {at, AtVerify, backUrl, removeCookie, UpdateToken, WsUrl} from '../features/cookie';
import {UpdateChat} from '../features/UpdateChatContextSlice';
import {UserDetailsType} from './types';

function ChatInput() {
    const [msg, setmsg] = useState('');
    const [MyUserDetails, setMyUserDetails] = useState<UserDetailsType>();
    const [socket, setsocket] = useState<WebSocket>();
    const enterChannelId = useSelector((state: RootState) => state.enterRoom.roomId);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();

    const getMyUserData = async () => {
        if ((await AtVerify()) == 200) {
            try {
                const getdata = await axios.get(`${backUrl}accounts/user/`, {
                    headers: {
                        Authorization: `Bearer ${at}`,
                    },
                });
                setMyUserDetails(getdata.data);
                console.log(getdata.data);
                //유저가 행동을 한다는 것 이므로 토큰 새로받아줌
                UpdateToken();
            } catch (err) {
                console.log(err);
            }
        } else {
            //행동할 때만 유지시키기 위해서 이미 만료됐으면 재로그인
            removeCookie();
            // TODO document why this block is empty
        }
    };
    useEffect(() => {
        getMyUserData();
        //처음 한 번만 나의 데이터를 불러옴
    }, []);
    useEffect(() => {
        if (socket) {
            socket.close();
        }
        //이전의 소켓 닫기

        setsocket(new WebSocket(`${WsUrl}${enterChannelId}/`));
    }, [enterChannelId]);

    const sendMessage = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        if (socket) {
            console.log(socket);
            if (MyUserDetails) {
                socket.send(
                    JSON.stringify({
                        user_id: MyUserDetails.pk,
                        message: msg,
                    }),
                );
            }

            console.log(msg);

            socket.onmessage = message => {
                // 클라이언트로부터 메시지 수신 시
                console.log(message);
                dispatch(UpdateChat());
            };
            socket.onerror = () => {
                console.log(event);
            };
        }

        if (inputRef.current) {
            // enter 치면 chatbox 공백으로 초기화 됨
            inputRef.current.value = '';
            setmsg('');
        }
    };

    return (
        <ChatInputContainer>
            <form>
                <input ref={inputRef} onChange={e => setmsg(e.target.value)} placeholder={`Message #ROOM`} />
                <button hidden type="submit" onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 40%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;
