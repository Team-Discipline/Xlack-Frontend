import React, { useCallback } from'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import Addchannel from './Addchannel';
import { RootState } from '../app/store';
import { addRoom } from '../features/AddChannelSlice';
import {Channel} from './types';
function Sidebar(){

    // const channelId=useSelector(state => {
    //     return state.app.roomId
    // })
    const [showChannels,setshowChannels]=useState(false);
    const AddChannel=useSelector((state:RootState)=>state.AddChannel.title);
    // const dispatch =useDispatch()

    // const showChannelList =async()=>{
    //     const list: Channel[]=await axios.get(`https://xlack.kreimben.com/api/channel/all`)
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err));

    //    //dispatch(createRoom(list))
       
       
    // }

    const onClickshowChannels=useCallback(()=>{
        setshowChannels((prev)=>!prev);
    },[]);
    return(
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>sfagasdf sslkdfj</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        sdmfpsfjp
                    </h3>
                </SidebarInfo>
                <CreateIcon/>
            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} title='Threads'/> 
            <SidebarOption Icon={InboxIcon} title='Mention & reactions'/> 
            <SidebarOption Icon={DraftsIcon} title='Saved items'/> 
            <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser'/> 
            <SidebarOption Icon={PeopleAltIcon} title='People & user groups'/> 
            <SidebarOption Icon={AppsIcon} title='Apps'/> 
            <SidebarOption Icon={FileCopyIcon} title='File browser'/> 
            <SidebarOption Icon={ExpandLessIcon} title='Show less'/> 
            <hr />
            <span onClick={onClickshowChannels}><SidebarOption Icon={ExpandMoreIcon} title='Channels'/></span>
            <hr />
            {showChannels&&
                <Addchannel Icon={AddIcon} title='Add Channel'/> }

            {showChannels&&AddChannel.map(title=>{
                return <SidebarOption title={title} />
            })}
                {/* 현재리덕스로 저장해서 불러옴, 서버에서 불러와야됨 */}
            
            
            

            
        </SidebarContainer>
    )
}
export default Sidebar;

const SidebarContainer=styled.div`
    background-color: var(--slack-color);
    color:white;
    flex:0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
`;
const SidebarHeader=styled.div`
    display:flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    justify-content: space-between;
    align-items:center;

    > .MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;

        :hover{
            cursor:pointer;
            opacity:0.6;
        }
    }
`;
const SidebarInfo=styled.div`
    
    flex:1; 
    //???
    >h2{
        font-size:15px;
        font-weight:900;
        margin-bottom:5px;
    }

    >h3{
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items:center;
    }
    >h3 > .MuiSvgIcon-root{
        font-size:13px;
        margin-top:1px;
        margin-right:2px;
        color:green;

        :hover{
            cursor:pointer;
            opacity:0.6;
        }
    }
`;