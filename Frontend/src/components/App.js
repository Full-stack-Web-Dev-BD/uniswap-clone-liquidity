import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
// pages 
import NavBar from './component/NavBar' 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"; 
import Market from "./pages/Market";

export const App = () => { 
    return (
        <Router>
            <ToastContainer /> 
            <div className='app'>
                <Routes> 
                        <Route path="/" element={<Market/>}/> 
                </Routes>
            </div>
        </Router>

    )
}
