
import React from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addRoom } from "../features/AddChannelSlice";
import { SidebarInfo } from "./SidebarOption";
import { AppDispatch } from "../app/store";


function Addchannel({Icon,title,id}:SidebarInfo){
    const dispatch : AppDispatch=useDispatch()
    
    const addChannel=async()=>{
        
        try{
            const channelName : string|null=prompt('Please enter the channel name')
            
            if(channelName){
                // db에 name: channelName 방추가
                dispatch(addRoom(channelName))
                await axios.post(`https://xlack.kreimben.com/api/channel/?channel_name=${channelName}`,{
                    channel_name:{channelName}
                },{
                    headers:{
                        //토큰
                    }
                }
                )
                
            }
        }catch(err){console.log(err)}
    }
    
    return(
        <div className="addchannel"
            onClick={addChannel}
        >
            {Icon && <Icon fontSize='small' style={{padding : 10}}></Icon>}
            {Icon ? (<h3>{title}</h3>) : 
                <div>
                    <span>#</span>{title}
                </div>
            }
        </div>
    )
}

export default Addchannel
