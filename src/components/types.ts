export interface ChannelType {
    name: string;

    // title: Channel Name

    id: number;
    // title: Channel Id
}
// export interface UserType{

// }
export interface ChatType {
    id: string;
    // title: Id
    // readOnly: true
    channel: number;
    // title: Channel
    // readOnly: true
    chatter: number;
    // title: Chatter
    // readOnly: true
    message: string;
    // title: Message
    // minLength: 1
    created_at: string;
    // title: Created at
    // readOnly: true
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
