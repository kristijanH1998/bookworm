import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import React from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Checks if the username is less than 12 characters
    const usernameValid = username.length <= 12 && username.length > 0;
    // Checks if the passwords match
    const passwordValid = password === confirmPassword && password.length > 6;
    const emailValid = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z+])?$/.test(email); 
    const firstNameValid = firstName.trim() !== "";
    const lastNameValid = lastName.trim() !== "";

    // Handles input changes and saves it to state
    const handleChange = (setState: any) => (event: any) => {
        setState(event.target.value);
        setError("");
    };

    // Handles form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (
        !(
            usernameValid && 
            passwordValid &&
            emailValid &&
            firstNameValid &&
            lastNameValid 
        )
        ) {
        if (!passwordValid) {
            return setError("Passwords do not match OR password is too short (7 character min)");
        }
        return setError("Please ensure all fields are valid.");
        }
        axios
            .post("http://localhost:3000/register", {
                username,
                email,
                password,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
            })
            .then((regRes) => {
                if(regRes.data.success) {
                    axios.post("http://localhost:3000/log-in", { email, password })
                    // .then((res) => {
                    //     axios
                    //     .put("http://localhost:8080/profile/archive")
                    //     .catch((error) => {
                    //         console.log(error.response.data.error);
                    //     });
                    // })
                    .then((logRes) => {
                        if (logRes.data.success) {
                            localStorage.setItem("jwt", logRes.data.jwt);
                            // console.log(res.data.jwt)
                            navigate("/home");
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data.error);
                        setError(error.response.data.error);
                    });
                }
            })
            .catch((error) => {
                setError(error.response.data.error)
                console.log(error.response);
            });
    };

    return (
        <div className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <h1 className="mb-5"><b>Register</b></h1>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" 
                        value={email} onChange={handleChange(setEmail)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username}
                        onChange={handleChange(setUsername)} maxLength={12} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName}
                        onChange={handleChange(setFirstName)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName}
                        onChange={handleChange(setLastName)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input id="dob" className="form-control" type="date" value={dateOfBirth}
                        onChange={handleChange(setDateOfBirth)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                        onChange={handleChange(setPassword)} required/>
                </div>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="confirmPw" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPw" value={confirmPassword}
                        onChange={handleChange(setConfirmPassword)} required/>
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <div className="d-flex">
                    <button type="submit" className="btn mx-3">Create Account</button>
                    <Link type="button" to="/" className="btn">Back to Login</Link>
                </div>
                {error && (<div className="mb-2">{error}</div>)}
            </form>
        </div>
    )
}