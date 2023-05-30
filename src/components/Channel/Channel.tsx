import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatChannelType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Channel(props: ChatChannelType) {
  const notifi = useSelector((state: RootState) => state.UnReadChannel.UnReadChannel);
  const currentChannel = useSelector((state: RootState) => state.ClickedChannel.channelData.hashed_value);
  const [count, setCount] = useState<number | undefined>(undefined);
  useEffect(() => {
    let channelCount: number | undefined = undefined;
    notifi.forEach(c => {
      if (c.channel_hashed_value === props.hashed_value) {
        channelCount = c.count;
        // setCount(c.count);
      }
    });
    setCount(channelCount);
  }, [notifi, props.hashed_value]);
  return (
    <ChannelContainer>
      <OptionChannel>
        <span className="text-sm"># {props.name}</span>
        <div
          style={{
            display: "inline-block",
            marginLeft: 60,
            background: "red",
            borderRadius: "50%",
            position: "relative",
            float: "right",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {count && (
            <div
              style={{
                fontSize: 20,
                display: "inline-block",
                color: "white",
                height: "35px",
                width: "35px",
              }}
            >
              {count}
            </div>
          )}
          {!count && <div style={{ fontSize: 20, display: "inline-block", color: "white" }}>{count}</div>}
        </div>
      </OptionChannel>
    </ChannelContainer>
  );
}

export default Channel;

const ChannelContainer = styled.div`
  display: flex;
  font-size: 12px;
  padding: 10px;
  align-items: center;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    width: 100%;
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const OptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
