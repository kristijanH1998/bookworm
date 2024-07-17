export default function Register() {
    return (
        <form className="d-flex flex-column align-items-center">
            <h1 className="mb-5"><b>Register</b></h1>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input id="dob" className="form-control" type="date" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" required/>
            </div>
            <div className="mb-3 d-flex flex-column align-items-center">
                <label htmlFor="confirmPw" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPw" required/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn mb-4">Create Account</button>
            <button type="button" className="btn">Back to Login</button>
        </form>
    )
}