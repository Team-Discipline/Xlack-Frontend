export interface CustomUserType {
  id: number;
  username: string;
  email: string;
  display_name: string;
  title: string;
  phone_number: string;
  profile_image: string;
}

export interface Mention {
  name: string;
  state?: string;
  Img?: string;
}

export interface ChatChannelType {
  id: number;
  name: string;
  hashed_value: string;
  description: string;
  Chats: ChatType[];
  members: CustomUserType[];
  admins: CustomUserType[];
}

export interface WorkspaceType {
  created_at: string;
  updated_at: string;
  members: CustomUserType[];
  chat_channel?: ChatChannelType[];
  hashed_value: string;
  name: string;
}

export interface ChannelType {
  name: string;
  id: number;
}

export interface MentionProps {
  inputMsg: string;
  Choose: (name: string, EditingMentionLength: number) => void;
  CalleverDataArr: CustomUserType[];
}

export interface ChatType {
  id: string;
  channel: number;
  chatter: CustomUserType;
  has_bookmarked: boolean;
  reaction: ReactionDataType[];
  message: string;
  created_at: string;
  converted_created_at: string;
  file?: FileType;
}

export interface FileType {
  id: number;
  uploaded_by: CustomUserType;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface SocketReceiveChatType {
  chat_id: string;
  username: string;
  user_id: number;
  message: string;
  file_id: string;
  created_at: string;
  reaction: ReactionDataType[];
}

export interface UserDetailsType {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Notification {
  channel_hashed_value: string;
  workspace_hashed_value: string;
  count: undefined;
}

export interface MessageRec {
  message: string;
  timestamp: any;
  user: string;
  userImage: string;
}

export interface Status {
  status_message: string;
  status_icon: string;
  until: string;
}

export interface ReactionDataType {
  id: number;
  icon: string;
  chat_id: number;
  reactors: number[];
}

export interface SendReactionType {
  mode: string;
  icon: string;
  chat_id: number;
}

export interface ReactionFetchType {
  channel_hashed_value: string;
  id: number;
  icon: string;
  chat_id: number;
  reactors: number[];
}
