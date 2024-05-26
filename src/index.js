import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import myTheme from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import UserContextProvider from './store/userContext';
import SideMenu from "./components/SideMenu";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={myTheme}>
            <UserContextProvider>
                <CssBaseline/>
                <div style={{ display: 'flex', height: '100vh', minHeight: '100vh' }}>
                    <SideMenu />
                    <div style={{ flex: 1, padding: '20px' }}>
                        <App/>
                    </div>
                </div>
            </UserContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
