import { useSelector } from 'react-redux';
import React from 'react'
import styled from 'styled-components';
import { RootState } from '../app/store';
import { enterRoom } from '../features/EnterChannelSlice';


function ChannelMenu() {
  const enterRoomId=useSelector((state:RootState)=>state.enterRoom.roomId);
  

  return (
    <Menu>
        
            <h3>초대하기</h3>

            <h3>나가기</h3>
        
    </Menu>
  )
}

export default ChannelMenu;

const Menu=styled.div`
    background-color: white;
    color :black;
    border-radius:5px;
    text-align : center;
    
    >h3{
        border-bottom: 1px solid #49274b;
    }
    >h3:hover{
        cursor:pointer;
        opacity:0.6;
    }
`;