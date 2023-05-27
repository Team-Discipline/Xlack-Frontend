import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChannelSettingOnOff } from "../../variable/OnModalSlice";
import { RootState } from "../../app/store";
import { Tabs, TabsProps } from "antd";
import About from "./ChannelSetting_detail/About";
import Integrations from "./ChannelSetting_detail/Integrations";
import Members from "./ChannelSetting_detail/Members";
import Settings from "./ChannelSetting_detail/Settings";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `About`,
    children: <About />,
  },
  {
    key: "2",
    label: `Members`,
    children: <Members />,
  },
  {
    key: "3",
    label: `Integrations`,
    children: <Integrations />,
  },
  {
    key: "4",
    label: `Settings`,
    children: <Settings />,
  },
];

const ChannelSetting = () => {
  const dispatch = useDispatch();
  const AboutChannel = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="mt-10 sm:mt-0">
              {/*내부*/}

              <div className="wrapper-center max-w-md">
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white py-5 sm:p-6">
                      <div className="flex  justify-between">
                        {/*헤더*/}
                        <h1 className="flex text-lg"># {AboutChannel.name}</h1>
                        <div>
                          <button
                            type="button"
                            className="rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => {
                              dispatch(ChannelSettingOnOff());
                            }}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                      {/*헤더 끝*/}
                      <div className="flex">
                        <div className="px-4">
                          <div className="col-span-6 sm:col-span-4 py-1 mt-10">
                            <div>
                              <label htmlFor="email-address" className="flex text-sm font-medium text-gray-700">
                                Full name
                              </label>

                              <div className="col-span-6 sm:col-span-3 mt-10">
                                <label htmlFor="country" className="flex block text-sm font-medium text-gray-700">
                                  Time zone
                                </label>
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                  <option>Korea</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                                <h1 className="text-sm text-left opacity-60">
                                  Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-100 px-4 py-3 text-right sm:px-6"></div>
                    </div>
                  </div>
                </div>
                {/*내부*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CloseBtn = styled.button`
  display: inline-block;
  content: "\\00d7";
  font-size: 14px;
`;

export default ChannelSetting;
