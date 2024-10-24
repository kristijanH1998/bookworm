// import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import React from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handles input changes and saves them to state
    const handleChange = (setState: any) => (event: any) => {
        setState(event.target.value);
        setError("");
    };

    // Activates when user clicks on Submit button, calls /log-in endpoint and sends it required email and password
    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios
          .post("http://localhost:3000/log-in", { email, password })
          .then((res) => {
            if (res.data.success) {
                localStorage.setItem("jwt", res.data.jwt);
                navigate("/home");
            } 
          })
          .catch((error) => {
            setError(error.response.data.error);
          });
      };

    return (
        <div className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-5"><b>Login</b></h1>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
                        value={email} onChange={handleChange(setEmail)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" 
                        value={password} onChange={handleChange(setPassword)} required/>
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn mx-3">Sign In</button>
                    <Link type="button" to="/register" className="btn">Register</Link>
                </div>
                {error && (<div className="mb-2">{error}</div>)}
            </form>
        </div>  
    )
}
