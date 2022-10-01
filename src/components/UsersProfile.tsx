import {ProfileType} from './types';
import styled from 'styled-components';

function UserProfile({user, bio, thumbnail_url}: ProfileType) {
    return (
        <UserContainer>
            {user.first_name} {user.last_name} <br></br>
            {user.email}
        </UserContainer>
    );
}

export default UserProfile;

const UserContainer = styled.div`
    color: white;
    display: flex;
    padding: 3px;
    width: 100%;
    word-break: keep-all;
    overflow-wrap: break-word;
    border-bottom: 1px solid #49274b;
`;
