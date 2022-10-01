import React from 'react';
import './App.css';

import {BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
// import {useAuthState} from "react-firebase-hooks/auth";
// import {auth} from "./firebase";
import Login from './pages/Login';
import Mainpage from './pages/Mainpage';
import {rt} from './features/cookie';

// import Spinner from "react-spinkit";

function App() {
    // const [user,loading] = useAuthState(auth);

    // return (
    //   <AppLoading>
    //     <AppLoadingContents>
    //       <img
    //         src="https://cdn.mos.cms.futurecdn.net/SDDw7Cnuo
    //         UGax6x9mTo7dd.jpg"
    //         alt=""
    //       />
    //       <Spinner
    //         name="ball-spin-fade-loader"
    //         color="purple"
    //         fadeIn="none"
    //       />
    //     </AppLoadingContents>
    //   </AppLoading>
    // )

    return (
        <div className="App">
            <>
                <Router>
                    {!rt ? (
                        <Login />
                    ) : (
                        <Routes>
                            <Route path="/main" element={<Mainpage />} />
                            <Route path="/" element={<Navigate replace to="/main" />} />
                        </Routes>
                    )}
                </Router>
            </>
        </div>
    );
}

export default App;

const AppLoading = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
`;

const AppLoadingContents = styled.div`
    text-align: center;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
        height: 100px;
        padding: 20px;
        margin-bottom: 40px;
    }
`;
