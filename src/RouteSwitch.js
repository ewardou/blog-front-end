import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SinglePost from './components/SinglePost';

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:postID" element={<SinglePost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
