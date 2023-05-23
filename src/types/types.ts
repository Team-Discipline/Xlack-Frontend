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

  // title: Channel Name

  id: number;
  // title: Channel Id
}

// export interface UserType{

// }
export interface MentionProps {
  inputMsg: string;
  Choose: (name: string, EditingMentionLength: number) => void;
  CalleverDataArr: CustomUserType[];
}

export interface ChatType {
  id: string;
  // title: Id
  // readOnly: true
  channel: number;
  // title: Channel
  // readOnly: true
  chatter: CustomUserType;
  has_bookmarked: boolean;
  reactions: ReactionDataType[];
  message: string;
  // title: Message
  // minLength: 1
  created_at: string;
  converted_created_at: string;
  // title: Created at
  // readOnly: true
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
  reaction: string;
}

export interface getChat {
  count: number;
  next: string;
  previous: string;
  results: ChatType[];
}

export interface ProfileType {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  bio: string;
  thumbnail_url: string;
}

export interface UserDetailsType {
  pk: number;
  // title: ID
  // readOnly: true
  username: string;
  // title: Username
  // pattern: ^[\w.@+-]+$
  // maxLength: 150
  // minLength: 1
  // Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.

  email: string;
  // title: Email address
  // readOnly: true
  // minLength: 1
  first_name: string;
  // title: First name
  // maxLength: 150
  last_name: string;
  // title: Last name
  // maxLength: 150
}

export interface Notification {
  channel_hashed_value: string;
  workspace_hashed_value: string;
  count: undefined;
}

export interface UserProfileType {
  id: number;
  // title: ID
  // readOnly: true
  user: number;
  // title: User
  // readOnly: true
  github_id: string;
  // title: Github id
  // maxLength: 20
  // minLength: 1
  bio: string;
  // title: Bio
  // x-nullable: true
  thumbnail_url: string;
  // title: Thumbnail url
  // maxLength: 200
  // x-nullable: true
  created_at: string;
  // title: Created at
  // readOnly: true
  updated_at: string;
  // title: Updated at
  // readOnly: true
}

export interface ChatInfo {
  channelName: string;
  channelId: number;
  chatRef: any;
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
  icon: string;
  chat_id: number;
  reactors: number[];
}
