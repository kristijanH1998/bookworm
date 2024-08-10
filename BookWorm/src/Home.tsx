import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';

export default function Home() {
    const navigate = useNavigate();
    const handleClick = (event: any) => {
        event.preventDefault();
        // console.log("You clicked" + event.target)
        let jwt: any;
        if(localStorage.getItem("jwt")) {
            jwt = localStorage.getItem("jwt");
        } else {
            console.log("You are not signed in.");
            return;
        }
        // console.log(jwt)
        axios
            .get("http://localhost:3000/log-out", {headers: {"authorization": "Bearer " + jwt}})
            .then((res) => {
                if (res.data.success) {
                    localStorage.removeItem("jwt");
                    navigate("/");
                } 
            })
            .catch((error) => {
                console.log(error.response.data.error)
            });
    }
    return (
        <>
        <h1>Home Page</h1>
        <Link type="button" onClick={handleClick} className="btn" to={''}>Sign Out</Link>
        </>    
    )
}