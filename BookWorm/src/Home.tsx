import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import { useState } from "react";

export default function Home() {
    const [searchPlaceholder, setSearchPlaceholder] = useState("title");
    const onRadioChange = (e: any) => {
        setSearchPlaceholder(e.target.value)
    }

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
        <form id="searchPage" className="d-flex flex-column align-items-center w-50">
            <h1>Search Books</h1>
            <div className="d-flex flex-row m-3">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="title" 
                    checked={searchPlaceholder === "title"} onChange={onRadioChange}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Title</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="author"
                    checked={searchPlaceholder === "author"} onChange={onRadioChange}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Author</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="ISBN"
                    checked={searchPlaceholder === "ISBN"} onChange={onRadioChange}/>
                    <label className="form-check-label" htmlFor="inlineRadio3">ISBN</label>
                </div>
            </div>
            
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder={"Enter book " + searchPlaceholder} aria-label="Enter book parameters" aria-describedby="button-addon2"/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>

            {/* <Link type="button" onClick={handleClick} className="btn" to={''}>Sign Out</Link> */}
        </form>    
    )
}