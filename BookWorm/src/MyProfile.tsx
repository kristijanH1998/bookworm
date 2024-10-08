import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import React from 'react';

export default function MyProfile() {
    
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
        // console.log(event.target.id)
        let page = "";
        switch(event.target.id) {
            case "searchBooksBtn":
                page = "home";
                navigate("/" + page);
                break;
            case "myBooksBtn":
                page = "my-books";
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
        <div className="d-flex flex-column align-items-center py-4 w-75">
            <div className="d-flex flex-column align-items-center py-4 w-75">
            <nav className="navbar d-flex w-100">
                <form className="container-fluid justify-content-center">
                    {/* <button className="btn btn-outline-success me-3" type="button">My Books</button> */}
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/home'} id="searchBooksBtn">Search Books</Link>
                    <Link type="button" onClick={goToPage} className="btn me-3" to={'/my-books'} id="myBooksBtn">My Books</Link>
                    <Link type="button" onClick={goToPage} className="btn" to={''} id="signOutBtn">Sign Out</Link>
                </form>
            </nav>
            <form className="d-flex flex-column align-items-center w-100 p-3">
                <h1 className="my-3">My Profile</h1>
                <div className="container w-100">
                    <div className="row">
                        <div className="mb-3">
                            <label  className="form-label">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text w-100">Email</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text w-100">Username</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">First Name</label>
                            <div className="input-group">
                                <span className="input-group-text w-50">First Name</span>
                                <input type="text" className="form-control" placeholder="Type here to change your First Name"/>
                                <button className="btn btn-outline-secondary" type="button">Update</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Last Name</label>
                            <div className="input-group">
                                <span className="input-group-text w-50" >Last Name</span>
                                <input type="text" className="form-control" placeholder="Type here to change your Last Name"/>
                                <button className="btn btn-outline-secondary" type="button">Update</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <div className="input-group">
                                <span className="input-group-text w-50">Date of Birth</span>
                                <input type="text" onFocus={(event) => {event.target.type="date"}} onBlur={(event) => {event.target.type="text"}} className="form-control" placeholder="Click here to change your DoB"/>
                                <button className="btn btn-outline-secondary" type="button">Update</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input type="password" name="password" className="form-control" placeholder="To change Password, enter your Current Password"/>
                                <input type="password" name="password" className="form-control" placeholder="Now enter your New Password"/>
                                <button className="btn btn-outline-secondary" type="button">Submit</button>
                            </div>
                        </div>
   
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}