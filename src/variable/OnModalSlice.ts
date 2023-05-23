import { createSlice } from "@reduxjs/toolkit";

export const OnModalSlice = createSlice({
  name: "OnModal",
  initialState: {
    OnEditProfilePage: false,
    OnEditContactInfo: false,
    OnChannelSetting: false,
    OnNotification: true,
  },
  reducers: {
    EditProfileOnOff: state => {
      state.OnEditProfilePage = !state.OnEditProfilePage;
    },
    EditContactInfoOnOff: state => {
      state.OnEditContactInfo = !state.OnEditContactInfo;
    },
    ChannelSettingOnOff: state => {
      state.OnChannelSetting = !state.OnChannelSetting;
    },
    NotificationSettingOnOff: state => {
      state.OnNotification = !state.OnNotification;
    },
  },
});

export const { EditProfileOnOff, EditContactInfoOnOff, ChannelSettingOnOff, NotificationSettingOnOff } = OnModalSlice.actions;

export default OnModalSlice.reducer;
