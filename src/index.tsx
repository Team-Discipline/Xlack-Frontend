import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {store} from './app/store';
import App from './App';
import Login from './pages/Login';
import {BrowserRouter} from 'react-router-dom';

ReactDom.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
