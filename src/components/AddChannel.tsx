import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {UpdateRoom} from '../features/UpdateChannelSlice';
import {SidebarInfo} from './SidebarOption';
import {at, rt} from '../features/cookie';
import {backUrl} from '../features/cookie';
function AddChannel({Icon, title, id}: SidebarInfo) {
    const dispatch = useDispatch();

    const addChannel = async () => {
        console.log(at);
        console.log(rt);
        try {
            const channelName: string | null = prompt('Please enter the channel name');

            if (channelName) {
                // db에 name: channelName 방추가
                await axios.post(
                    `${backUrl}channel/`,
                    {
                        name: channelName,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${at}`,
                        },
                    },
                );
                //                console.log();
                dispatch(UpdateRoom());
            }
        } catch (err) {
            window.alert('권한이 없습니다');
        }
    };

    return (
        <div className="addchannel" onClick={addChannel}>
            {Icon && <Icon fontSize="small" style={{padding: 10}}></Icon>}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <div>
                    <span>#</span>
                    {title}
                </div>
            )}
        </div>
    );
}

export default AddChannel;
