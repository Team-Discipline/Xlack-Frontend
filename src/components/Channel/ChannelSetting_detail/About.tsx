import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import axios from "axios";
import { at, backUrl } from "../../../variable/cookie";
import React, { useState } from "react";
import { Update } from "../../../variable/UpdateChannelSlice";

const About = () => {
  const rightClickedChannelData = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace);
  const [showEditDescriptionModal, setShowEditDescriptionModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const editChannnelDesc = async (des: string) => {
    await axios
      .patch(
        `${backUrl}channel/${currentWorkspace.ClickedWorkSpace.hashed_value}/`,
        {
          description: des,
          hashed_value: rightClickedChannelData.hashed_value,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      )
      .catch(err => {
        console.log(err);
        window.alert("권한이 없습니다.");
      });
  };
  return (
    <>
      <div className="flex justify-between mt-6">
        <button
          style={{ color: "blue" }}
          onClick={() => {
            setShowEditDescriptionModal(true);
          }}
        >
          Edit
        </button>
      </div>
      <h1>about this channel!</h1>
      <hr />
      <h1>{rightClickedChannelData.description}</h1>
      {showEditDescriptionModal && (
        <EditDescriptionModal
          SaveDescription={(des: string) => {
            editChannnelDesc(des);
            dispatch(Update());
          }}
          setShow={(show: boolean) => {
            setShowEditDescriptionModal(show);
          }}
          channelData={rightClickedChannelData}
        />
      )}
    </>
  );
};

const EditDescriptionModal = (props: any) => {
  const [description, setDescription] = useState<string>();
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
                    채널에 대해 설명해주세요!
                    <hr />
                    <textarea
                      style={{ width: 500, height: 250 }}
                      onChange={e => {
                        const inputMsg = e.target.value;
                        setDescription(inputMsg);
                      }}
                      placeholder={props.channelData.description}
                    />
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
                        props.SaveDescription(description);
                        props.setShow(false);
                      }}
                      className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
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

export default About;
