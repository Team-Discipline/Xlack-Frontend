import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import EditProfile from "./EditProfile";
import styled from "styled-components";
import EditContactInfo from "./EditContactInfo";
import StatusPanel from "../Status/StatusPanel";

const Profile = () => {
  const [open, setOpen] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditContactInfo, setShowEditContactInfo] = useState(false);
  const MyProfile = useSelector((state: RootState) => state.getMyProfile.userData);
  const onEditProfilePage = useSelector((state: RootState) => state.OnModal.OnEditProfilePage);
  const onEditContactInfo = useSelector((state: RootState) => state.OnModal.OnEditContactInfo);
  const [status, showStatus] = useState(false);

  useEffect(() => {
    setOpen(!open);
    setShowEditProfile(false);
  }, [onEditProfilePage]);
  useEffect(() => {
    setOpen(!open);
    setShowEditContactInfo(false);
  }, [onEditContactInfo]);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <h1>프로필</h1>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={MyProfile.profile_image}
                        //MyProfile.profile_image
                        width="200"
                        height="200"
                        alt="Profile img"
                      />
                    </div>
                    <hr />
                    <div className="flex justify-between mt-6">
                      <h5 className="text-lg font-medium">{MyProfile.username}</h5>
                      <button
                        style={{ color: "blue" }}
                        onClick={() => {
                          setShowEditProfile(true);
                          setOpen(false);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setShowEditProfile(true);
                        setOpen(false);
                      }}
                    >
                      +Add name pronunciation
                    </button>
                    <div className="mt-2"> Away</div>
                    <div>{new Date().toLocaleTimeString()}</div>
                    <div className="flex justify-center mt-2 ">
                      <StatusPanel />
                    </div>
                    <hr />
                    <div>
                      <div className="flex justify-between mt-2">
                        <h5 className="text-lg font-medium">Contact information</h5>
                        <button
                          onClick={() => {
                            setShowEditContactInfo(true);
                            setOpen(false);
                          }}
                          style={{ color: "blue" }}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="mt-2">
                        <h1>Email Address</h1>
                        <button style={{ color: "blue" }}>{MyProfile.email}</button>
                      </div>

                      <div className="mt-2 py-5">
                        <h1>Phone</h1>
                        {MyProfile.phone_number !== null ? (
                          <h1 style={{ color: "blue" }}>{MyProfile.phone_number}</h1>
                        ) : (
                          <button
                            onClick={() => {
                              setShowEditContactInfo(true);
                              setOpen(false);
                            }}
                            style={{ color: "blue" }}
                          >
                            + Add Phone
                          </button>
                        )}
                      </div>
                    </div>

                    <hr />

                    <div>
                      <h1>about me</h1>
                      <h1>skype</h1>
                    </div>

                    {/* /End replace */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {showEditProfile && <EditProfile />}
      {showEditContactInfo && <EditContactInfo />}
    </>
  );
};

const CustomButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0.025em solid #1a1a1a;
  border-radius: 0.9375em;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 3px;
  min-height: 3.75em;
  min-width: 0;
  outline: none;
  padding: 1em 2.3em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  :disabled {
    pointer-events: none;
  }

  :hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  :active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
export default Profile;
