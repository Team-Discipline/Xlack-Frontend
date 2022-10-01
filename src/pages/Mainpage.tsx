import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserList from '../components/UserList';
import Chat from '../components/Chat';
import Logout from '../components/Logout';
import styled from 'styled-components';

function Mainpage() {
    return (
        <>
            <Logout />
            <AppBody>
                <Header />
                <Sidebar />
                <Chat />
                <UserList />
            </AppBody>
        </>
    );
}

export default Mainpage;

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`;
