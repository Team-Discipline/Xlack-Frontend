import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import AddChannel from './AddChannel';
import {RootState} from '../app/store';
import {at, rt, WsUrl} from '../features/cookie';
import {enterRoom} from '../features/EnterChannelSlice';
import ChannelMenu from './ChannelMenu';
import Channel from './Channel';
import {ChannelType} from './types';
import {backUrl} from '../features/cookie';
import User from './MyProfile';

function Sidebar() {
    const [x, setx] = useState(0);
    const [y, sety] = useState(0);
    const dispatch = useDispatch();
    const UpdateChannel = useSelector((state: RootState) => state.UpdateChannel.title);
    const [ChannelList, setChannelList] = useState<ChannelType[]>([]); // 기존에 가입되어있던 채널들 정보
    // const [showProfileMenu, setshowProfileMenu] = useState(false);
    const [showChannelMenu, setshowChannelMenu] = useState(false);
    const [showChannels, setshowChannels] = useState(false);
    const channelMenuRef = useRef<HTMLDivElement>(null);
    // const editProfile = async () => {
    //     try {
    //         const res = await axios.patch(`${backUrl}accounts/user/`,
    //         {
    //             username : `${userName}`,
    //             first_name: `${firstName}`.
    //             last_name: `${lastName}`
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${at}`
    //             }
    //         });

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const showChannelList = async () => {
        try {
            const res = await axios.get(`${backUrl}channel/`, {
                headers: {
                    Authorization: `Bearer ${at}`,
                },
            });
            console.log(res.data);
            setChannelList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        //test를 넣어도 처음 시작할때 showChannelList()가 발생하면서 setChannelList(res.data); 가 실행되기에 안나와 주석처리
        showChannelList();
    }, [UpdateChannel]);
    useEffect(() => {
        // channelMenuRef 를 이용해 이외의 영역이 클릭되면 채널메뉴 없애기
        function handleClickOutside(e: MouseEvent): void {
            if (channelMenuRef.current && !channelMenuRef.current.contains(e.target as Node)) {
                setshowChannelMenu(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [channelMenuRef]);

    const onClickshowChannelMenu = useCallback(() => {
        setshowChannelMenu(prev => !prev);
    }, []);

    const onClickshowChannels = useCallback(() => {
        setshowChannels(prev => !prev);
    }, []);
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <div>
                        <User></User>
                    </div>
                </SidebarInfo>
                {/* <span onClick={editProfile}>
                    <CreateIcon />
                </span> */}
            </SidebarHeader>

            {/* <SidebarOption Icon={InsertCommentIcon} title='Threads'/> 
            <SidebarOption Icon={InboxIcon} title='Mention & reactions'/> 
            <SidebarOption Icon={DraftsIcon} title='Saved items'/> 
            <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser'/> 
            <SidebarOption Icon={PeopleAltIcon} title='People & user groups'/> 
            <SidebarOption Icon={AppsIcon} title='Apps'/> 
            <SidebarOption Icon={FileCopyIcon} title='File browser'/> 
            <SidebarOption Icon={ExpandLessIcon} title='Show less'/>  */}
            <hr />
            <span onClick={onClickshowChannels}>
                <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            </span>
            <hr />
            {showChannels && <AddChannel Icon={AddIcon} title="Add Channel" />}

            {showChannels &&
                ChannelList.map(channel => {
                    return (
                        <span
                            ref={channelMenuRef}
                            onClick={e => {
                                e.preventDefault();
                                dispatch(enterRoom(channel.id)); //enterRoomId 를 channel id로 변경
                                //connectChat(enterRoomId);
                            }}
                            onContextMenu={e => {
                                e.preventDefault();
                                dispatch(enterRoom(channel.id));

                                console.log('채널 메뉴열기!');
                                setx(e.clientX);
                                sety(e.clientY);
                                showChannelMenu && onClickshowChannelMenu(); //새로 우클릭 한 곳에 메뉴가 다시 나오게 초기화
                                onClickshowChannelMenu();
                            }}
                        >
                            <Channel name={channel.name} id={channel.id} />
                        </span>
                    );
                })}
            {showChannelMenu && (
                <div style={{position: 'absolute', top: y, left: x}}>
                    <ChannelMenu />
                </div>
            )}
        </SidebarContainer>
    );
}

export default Sidebar;

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    color: white;
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
`;
const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    justify-content: space-between;
    align-items: center;
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
        :hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
`;
const SidebarInfo = styled.div`
    flex: 1;
    //???
    > div > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > div > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
    > div > h3 > .MuiSvgIcon-root {
        font-size: 13px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
        :hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
`;
