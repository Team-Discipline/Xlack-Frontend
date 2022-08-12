import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {at, rt} from '../features/cookie';
import User from './User';
import {UserInformationTypes} from './types';
import {backUrl} from '../features/cookie';
function UserList() {
    const [userList, setUserList] = useState<UserInformationTypes[]>([
        {
            email: 'Js email',

            name: 'Jame',
            // title: Name
            thumbnail_url: 'asdafs',
            //title: Thumbnail Url
            authorization: 'adasf',
            //title: Authorization
        },
        {
            email: 'Jssdfsdfl',

            name: 'Jkaslf',
            // title: Name
            thumbnail_url: 'asdafs',
            //title: Thumbnail Url
            authorization: 'adasf',
            //title: Authorization
        },
    ]);
    const getAllUser = async () => {
        try {
            const UsersData = await axios.get(
                `${backUrl}/api/user/all`,

                {
                    headers: {
                        'access-token': at,
                        'refresh-token': rt,
                    },
                },
            );
            setUserList(UsersData.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllUser();
    }, []);
    return (
        <UserListContainer>
            {userList.map(user => {
                return <User email={user.email} name={user.name} thumbnail_url={user.thumbnail_url} authorization={user.authorization}></User>;
            })}
        </UserListContainer>
    );
}

export default UserList;

const UserListContainer = styled.div`
    padding: 5px;
    margin-top: 60px;
    position: 'absolute';
    top: 200;
    left: 200;
`;
