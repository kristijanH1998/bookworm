import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import Login from "./Login.js"
import Register from "./Register.jsx"
import Home from "./Home.js"
import MyBooks from "./MyBooks.jsx"
import MyProfile from "./MyProfile.jsx"
import React from "react";

//The main application router component which enables navigation between all webpages of BookWorm, each with its own path
const router = createBrowserRouter(
createRoutesFromElements(
        <>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/my-profile" element={<MyProfile />} />
        </>
    )
);

export default function PageRouter() {
return (
        <RouterProvider router={router} />
    )
}