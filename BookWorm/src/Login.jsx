// import React from "react"

export default function Login() {
    return (
        <form className="d-flex flex-column align-items-center">
            <h1 className="mb-5"><b>Login</b></h1>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn mb-4">Sign In</button>
            <button type="button" className="btn">Register</button>
        </form>
    )
}
