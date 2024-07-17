import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import Login from "./Login.jsx"
import Register from "./Register.jsx"

const router = createBrowserRouter(
createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="register" element={<Register />} />
    </>
)
);

export default function PageRouter() {
return (
    <RouterProvider router={router} />
)
}