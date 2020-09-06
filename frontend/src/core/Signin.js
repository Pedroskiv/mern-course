import React, { useState, useEffect } from "react";
import Navigation from "../layout/Navbar";
import { sigin, authenticate, isAuthenticated } from "./apiCore";
import { Redirect } from "react-router-dom";

const Signin = () =>
{
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "", 
        success: false,
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>
    {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const clickSubmit = event =>
    {
        event.preventDefault();

        setValues({...values, error: false, loading: true});

        sigin({email, password})
            .then(data => {
                if (data.error)
                {
                    setValues({...values, error: data.error, loading: false});
                }
                else
                {
                    authenticate(data, () => {
                        setValues({
                            ...values, 
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }

    const signUpForm = () => (
        <form className="sign-box">
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
                Sign In
            </button>
        </form>
    )

    const redirectUser = () =>
    {
        if (redirectToReferrer)
        {
            if (user && user.role === 1)
            {
                return <Redirect to="/admin/dashboard" />
            }
            else
            {
                return <Redirect to="/" />
            }
        }
        if (isAuthenticated())
        {
            return <Redirect to="/" />
        }
        else
        {
            return <Redirect to="/signin" />
        }
    }

    // useEffect(() => {
    //     redirectUser();
    // }, []);

    const showError = () =>
    {
        return (
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                {error}
            </div>
        )
    }

    const showLoading = () =>
    {
        return loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <div>
            <Navigation/>
            <div className="container mt-5">
                <h4 className="text-center"> Login </h4>
                {signUpForm()}
                {showError()}
                {showLoading()}
                {redirectUser()}
            </div>
        </div>
    )
}

export default Signin;