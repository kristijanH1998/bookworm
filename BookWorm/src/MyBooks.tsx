import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import React from 'react';

export default function MyBooks() {

    const [jwt, setJwt] = useState<string | null>("");

    function acquireJwt () {
        if(localStorage.getItem("jwt")) {
            let temp = localStorage.getItem("jwt")
            setJwt(temp);
            // console.log(jwt)
        } else {
            console.log("You are not signed in.");
            return;
        }
    }
    
    const navigate = useNavigate();
    const goToPage = (event: any) => {
        event.preventDefault();
        acquireJwt();
        // console.log(jwt)
        console.log(event.target.id)
        let page = "";
        switch(event.target.id) {
            case "myBooksBtn":
                page = "my-books";
                navigate("/" + page);
                break;
            case "myProfileBtn":
                page = "my-profile";
                navigate("/" + page);
                break;
            case "signOutBtn":
                page = "/";
                axios
                    .get("http://localhost:3000/log-out", {headers: {"authorization": "Bearer " + jwt}})
                    .then((res) => {
                        if (res.data.success) {
                            localStorage.removeItem("jwt");
                            navigate(page);
                        } 
                    })
                    .catch((error) => {
                        console.log(error.response.data.error)
                    });
                break;
            default:
                alert("Action not valid."); 
        }
    };

    return (
        <div className="d-flex flex-column align-items-center py-4">
            <nav className="navbar d-flex w-100">
                <form className="container-fluid justify-content-center">
                    {/* <button className="btn btn-outline-success me-3" type="button">My Books</button> */}
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/home'} id="searchBooksBtn">Search Books</Link>
                    <button className="btn btn-outline-secondary me-3" type="button" id="myProfileBtn">My Profile</button>
                    <Link type="button" onClick={goToPage} className="btn" to={''} id="signOutBtn">Sign Out</Link>
                </form>
            </nav>
            <form className="d-flex flex-column align-items-center">
                <h1 className="my-5">My Books</h1>
                <div className="container">
                    <div className="row gx-3">
                        <div className="col-4">
                            <div style={{borderColor: "#350888", borderStyle: "solid"}} className="d-flex flex-column align-items-center myCol">
                                <h1>123123123123123123123123123123123123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123123123123123123123123123123123123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123123123123123123123123123123123123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                                <h1>123</h1>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="d-flex flex-column align-items-center myCol"></div>
                        </div>
                        <div className="col-4">
                            <div className="d-flex flex-column align-items-center myCol"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}