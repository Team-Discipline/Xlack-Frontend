import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedChannel, setClickedChannel_hv } from "../../variable/ClickedChannelSlice";
import { rightClick_channel, SearchChannelInAll } from "../../variable/WorkSpaceSlice";
import { RootState } from "../../app/store";
import { setClickBookmarkPage } from "../../variable/ChatBookmarkSlice";

const Historymenu = (props: any) => {
  const [historyData, sethistoryData] = useState<[{ name: string; value: string }]>();
  const [ClickedHistoryChannelName, setClickedHistoryChannelName] = useState<string>("");
  const [MenuOpen, setMenuOpen] = useState<boolean>(true);
  const dispatch = useDispatch();
  const search_channel = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  const lS = window.localStorage.getItem("history");
  const localStorage_hisory = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lS,
  );
  const ClickChannelOnHistoryMenu = (h: { name: string; value: string }) => {
    dispatch(setClickBookmarkPage(false));
    dispatch(setClickedChannel_hv(h.value));
    dispatch(rightClick_channel(h.value));
    dispatch(SearchChannelInAll());
    setClickedHistoryChannelName(h.name);
  };
  useEffect(() => {
    sethistoryData(localStorage_hisory);
  }, []);
  const deleteObject = (nameToDelete: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sethistoryData(historyData.filter(h => h.name !== nameToDelete));
  };

  useEffect(() => {
    if (search_channel.name === ClickedHistoryChannelName) {
      dispatch(setClickedChannel(search_channel));
    }
    if (!MenuOpen) {
      if (search_channel.id === -2) {
        deleteObject(ClickedHistoryChannelName);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.localStorage.setItem("history", JSON.stringify(historyData.filter(h => h.name !== ClickedHistoryChannelName)));
        // window.localStorage.removeItem(ClickedHistoryChannelName);
        //알림띄우고 history에서 제거
      }
    } else setMenuOpen(false);
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
                  onClick={e => {
                    e.preventDefault();
                    ClickChannelOnHistoryMenu(h);
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
