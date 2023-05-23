import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ConnectWebSocketAddedChannel, Update } from "../../variable/UpdateChannelSlice";
import { SidebarInfo } from "../Sidebar/SidebarOption";
import { at, backUrl } from "../../variable/cookie";
import { RootState } from "../../app/store";

function AddChannel({ Icon, title, id }: SidebarInfo) {
  const dispatch = useDispatch();
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace);
  const addChannel = async () => {
    try {
      const channelName: string | null = prompt("Please enter the channel name");

      if (channelName) {
        // db에 name: channelName 방추가
        await axios
          .post(
            `${backUrl}channel/${currentWorkspace.hashed_value}/`,
            {
              name: channelName,
              description: "",
            },
            {
              headers: {
                Authorization: `Bearer ${at}`,
              },
            },
          )
          .then(res => {
            dispatch(ConnectWebSocketAddedChannel(res.data.hashed_value));
          });

        dispatch(Update());
      }
    } catch (err) {
      window.alert("권한이 없습니다");
    }
  };

  return (
    <div className="addchannel" onClick={addChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }}></Icon>}
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
