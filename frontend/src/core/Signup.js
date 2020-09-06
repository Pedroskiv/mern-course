import React, { useState } from "react";
import Navigation from "../layout/Navbar";
import { signup } from "./apiCore";
import "./Signup.css";

const Signup = () =>
{
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "", 
        success: false
    });
    const {name, email, password, error} = values;

    const handleChange = name => event =>
    {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = event =>
    {
        event.preventDefault();
        setValues({...values, error: false, loading: true});

        signup({ name, email, password })
            .then(data =>{
                if (data.error)
                    setValues({...values, error: data.error, success: false})
                else
                    setValues({...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
            })
    }

    const signUpForm = () => (
        <form className="sign-box">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-block btn-primary">
                Sign Up
            </button>
        </form>
    )

    return (
        <div>
            <Navigation/>
            <div className="container mt-5">
                <h4 className="text-center">Signup from </h4>
                {signUpForm()}
            </div>
        </div>
    )
}

export default Signup;