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
import React from "react";

const router = createBrowserRouter(
createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/my-books" element={<MyBooks />} />
    </>
)
);

export default function PageRouter() {
return (
    <RouterProvider router={router} />
)
}