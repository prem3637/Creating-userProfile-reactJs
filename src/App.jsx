import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Controll_pannel from "./Controll_pannel";
import Profile from "./Profile";
export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Controll_pannel />} />
                    <Route path="/:username/:userid" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}