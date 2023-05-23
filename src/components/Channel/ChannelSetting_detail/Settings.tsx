import axios from "axios";
import { at, backUrl } from "../../../variable/cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Button } from "antd";
import React, { useState } from "react";
import { ChannelSettingOnOff } from "../../../variable/OnModalSlice";
import { SaveDeleteChannel_hv, Update } from "../../../variable/UpdateChannelSlice";

const Settings = () => {
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace);
  const currentChannel = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  const [showCheckDeleteModal, setShowCheckDeleteModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const DeleteChannel = async () => {
    try {
      await axios.delete(`${backUrl}channel/${currentWorkspace.hashed_value}/${currentChannel.hashed_value}/`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      dispatch(SaveDeleteChannel_hv(currentChannel.hashed_value));
      dispatch(Update());
    } catch (err) {
      window.alert("권한이 없습니다");
    }
    console.log("delete!!");
  };

  return (
    <>
      <h1>about Settings!</h1>
      <Button
        onClick={() => {
          setShowCheckDeleteModal(true);
        }}
      >
        Delete this Channel!
      </Button>
      {showCheckDeleteModal && (
        <CheckDeleteModal
          delete={() => {
            DeleteChannel();
            dispatch(Update());
          }}
          setShow={(show: boolean) => {
            setShowCheckDeleteModal(show);
          }}
        />
      )}
    </>
  );
};
const CheckDeleteModal = (props: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="mt-10 sm:mt-0"></div>

            <div className="wrapper-center max-w-md">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white py-5 sm:p-6">
                    정말 삭제하시겠습니까?
                    <hr />
                    <button
                      onClick={() => {
                        props.setShow(false);
                      }}
                      className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        props.delete();
                        props.setShow(false);
                        dispatch(ChannelSettingOnOff());
                      }}
                      className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sure!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
