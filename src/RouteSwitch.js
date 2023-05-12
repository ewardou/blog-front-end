import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SinglePost from './components/SinglePost';

const RouteSwitch = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:postID" element={<SinglePost />} />
            </Routes>
        </HashRouter>
    );
};

export default RouteSwitch;
