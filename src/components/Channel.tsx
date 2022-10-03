import React from 'react';
import {ChannelType} from './types';
import styled from 'styled-components';

function Channel({name, id}: ChannelType) {
    return (
        <ChannelContainer>
            <OptionChannel>
                # {name}__ {id}
            </OptionChannel>
        </ChannelContainer>
    );
}

export default Channel;

const ChannelContainer = styled.div`
    display: flex;
    font-size: 12px;
    padding: 10px;
    align-items: center;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const OptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;
