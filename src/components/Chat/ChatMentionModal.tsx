import styled from "styled-components";
import { useEffect, useState } from "react";
import { CustomUserType, MentionProps } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ChatMentionModal = (props: MentionProps) => {
  const Clicked_channel = useSelector((state: RootState) => state.ClickedChannel.channelData);
  const [callingMentionArr, setCallingMentionArr] = useState<CustomUserType[]>([]);
  const AutoComplete = (MentionName: string) => {
    const tmpArr: CustomUserType[] = [];
    props.CalleverDataArr.forEach(v => {
      if (v.username.startsWith(MentionName)) {
        tmpArr.push(v);
      }
    });
    setCallingMentionArr(tmpArr);
  };

  useEffect(() => {
    const MentionName = props.inputMsg;
    console.log(props);
    if (MentionName.length == 1) {
      setCallingMentionArr(props.CalleverDataArr);
    } else {
      const NoAtSignName = MentionName.substring(1, MentionName.length);
      AutoComplete(NoAtSignName);
    }
  }, [props.inputMsg]);

  return (
    <>
      <div className="text-left">
        <div className="right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {callingMentionArr &&
              callingMentionArr.map((v, i) => {
                return (
                  <a
                    key={i}
                    className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    <span
                      className="flex flex-col hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        props.Choose(v.username, props.inputMsg.length);
                      }}
                    >
                      {v.username}
                    </span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatMentionModal;
const Op = styled.span`
  border-bottom: 1px solid #49274b;
`;
