import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { EditProfileOnOff, NotificationSettingOnOff } from "../../variable/OnModalSlice";
import MyState from "./MyState";
import { RootState } from "../../app/store";
import { useEffect } from "react";

const ProfileMenu = () => {
  const isOff = useSelector((state: RootState) => state.OnModal.OnNotification);
  const dispatch = useDispatch();
  const MyStatus = useSelector((state: RootState) => state.setStatus.statusData);
  const MyUser = useSelector((state: RootState) => state.getMyProfile.userData);

  useEffect(() => {
    console.log(isOff);
  }, [isOff]);
  return (
    <>
      {MyUser && (
        <div className="relative inline-block text-left">
          <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">
                  <MyState
                    id={MyUser.id}
                    username={MyUser.username}
                    email={MyUser?.email}
                    display_name={MyUser?.display_name}
                    title={MyUser?.title}
                    phone_number={MyUser?.phone_number}
                    profile_image={MyUser?.profile_image}
                  />
                </span>
              </a>
              <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col">{MyStatus.status_icon ? <Status>{MyStatus.status_icon + MyStatus.until}</Status> : <Status>🙂What is your Status</Status>}</span>
              </a>
              <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span className="flex flex-col cursor-pointer">
                  <span
                    onClick={() => {
                      dispatch(NotificationSettingOnOff());
                    }}
                  >
                    {isOff ? "알림 수신중" : "알림 중지중"}
                  </span>
                </span>
              </a>
              <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span
                  className="flex flex-col cursor-pointer"
                  onClick={() => {
                    dispatch(EditProfileOnOff());
                  }}
                >
                  <Op>프로필</Op>
                </span>
              </a>

              <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 " role="menuitem">
                <span className="flex flex-col">
                  <Op>
                    <span>환경설정</span>
                  </Op>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileMenu;

const Op = styled.span`
  border-bottom: 1px solid #49274b;
`;

const Status = styled.span`
  border-bottom: 1px solid #49274b;
  border-radius: 10px;
  background-color: white;
  color: black;
  font-size: 13px;
  padding: 5px;
`;
