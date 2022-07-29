export interface Channel{
    "channel_name"?:string 
    
    // title: Channel Name

    "uuid" :string
    // title: Uuid
    "channel_id":number
    // title: Channel Id

    "created_at":string
    // title: Created At
     
}

export interface ChatInfo{
    "channelName":string;
    "channelId":number;
    "chatRef":any;
}

export interface MessageRec{
    message:string;
    timestamp:any;
    user:string;
    userImage:string;
  }