import React from 'react';
import styled from 'styled-components';
import {Avatar} from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Header() {
    return (
        <HeaderContainer>
            {/* Header Left */}
            <HeaderLeft>
                <HeaderAvatar
                //TODO: Add onclick
                />
                <AccessTimeIcon />
            </HeaderLeft>

            {/* Header Search */}
            <HeaderSearch>
                <SearchIcon />
                <input placeholder="Search"></input>
            </HeaderSearch>

            {/* {Header Right} */}
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    );
}

export default Header;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        border-radius: 6px;
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        /* AccessTimeIcon */
        margin-left: auto;
        margin-right: 30px;

        :hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        /* HelpOutlineIcon */
        margin-left: auto;
        margin-right: 20px;

        :hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
