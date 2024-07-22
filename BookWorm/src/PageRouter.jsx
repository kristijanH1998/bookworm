import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Home from "./Home.jsx"

const router = createBrowserRouter(
createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    </>
)
);

export default function PageRouter() {
return (
    <RouterProvider router={router} />
)
}