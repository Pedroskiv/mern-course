import React, {useState} from "react";
import Navigation from "../layout/Navbar";
import { isAuthenticated, createCategory } from "./apiCore";
import { Link } from "react-router-dom";

const AddCategory = () =>
{
    // States
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // General values
    const {user, token} = JSON.parse(isAuthenticated());

    // Handle onChange event
    const handleChange = event =>
    {
        setError("");
        setName(event.target.value);
    }

    // Handle onSubmit event
    const clickSubmit = event =>
    {
        event.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error)
                    setError(true);
                else
                {
                    setError("");
                    setSuccess(true);
                }
            })
    }

    // Shows error message using error state
    const showError = () =>
    {
        if (error)
            return (
                <h3 className="text-danger">"{name}" should be unique, try another one</h3>
            )
    }

    // Shows success message when category has been created
    const showSuccess = () =>
    {
        if (success)
            return (
                <h3 className="text-success">
                    The Category "{name}" was successfully create
                </h3>
            )
    }

    // Category form
    const newCategoryForm = (
        <form onSubmit={clickSubmit} className="my-3">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <button type="submit" className="btn btn-outline-success">
                Create Category
            </button>
        </form>
    )

    const goBack = () =>
    {
        return (
            <div className="mt-3">
                <Link to="/" className="text-warning">
                    Back to Home
                </Link>
            </div>
        )
    }
    
    return (
        <>
            <Navigation />
            <div className="container">
                {newCategoryForm}
                {showError()}
                {showSuccess()}
                {goBack()}
            </div>
        </>
    )
}

export default AddCategory;