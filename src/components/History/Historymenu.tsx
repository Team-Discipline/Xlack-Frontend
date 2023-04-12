import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedChannel } from "../../variable/ClickedChannelSlice";
import { rightClick_channel, SearchChannel, SearchChannelInAll } from "../../variable/WorkSpaceSlice";
import { RootState } from "../../app/store";

const Historymenu = () => {
  const [historyData, sethistoryData] = useState<[{ name: string; value: string }]>();
  const dispatch = useDispatch();
  const search_channel = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  const localStorage_hisory = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.localStorage.getItem("history"),
  );
  useEffect(() => {
    sethistoryData(localStorage_hisory);
    console.log("localStorage getHistoryData", localStorage_hisory);
  }, []);

  useEffect(() => {
    dispatch(setClickedChannel(search_channel));
  }, [search_channel]);
  return (
    <div className="relative inline-block text-left">
      <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a className="block block px-4 py-2 text-md text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
            <span className="flex flex-col">
              <h1>Recent</h1>
            </span>
          </a>
          {historyData &&
            historyData.map((h, i) => {
              return (
                <a
                  key={i}
                  className="cursor-pointer block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // dispatch(rightClick_channel(h.value));
                    // dispatch(setClickedChannel(search_channel));
                    // dispatch(SearchChannel());
                    dispatch(rightClick_channel(h.value));
                    dispatch(SearchChannelInAll());
                    dispatch(setClickedChannel(search_channel));
                    console.log(search_channel);

                    console.log("history click:", h.value);
                  }}
                >
                  <span className="flex flex-col">
                    <Op># {h.name}</Op>
                  </span>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Op = styled.span`
  border-bottom: 1px solid #49274b;
`;

export default Historymenu;
