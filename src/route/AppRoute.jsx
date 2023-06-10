import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';

const AppRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/About' element={<AboutPage/>}></Route>
            </Routes>
        </div>
    );
};

export default AppRoute;