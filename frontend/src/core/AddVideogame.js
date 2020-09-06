import React, {useState, useEffect} from "react";
import Navigation from "../layout/Navbar";
import { isAuthenticated, getCategories, createVideogame } from "./apiCore";
import { Link } from "react-router-dom";

const AddVideogame = () =>
{
    // States
    const [values, setValues] = useState(
    {
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdVideogame: false,
        redirectToProfile: false,
        formData: ""
    });

    const { 
        name, 
        description, 
        price, 
        categories, 
        category, 
        quantity, 
        photo, 
        loading,
        error, 
        createdVideogame,
        redirectToProfile,
        formData
    } = values;

    // Get user & token if user is connected
    const {user, token} = JSON.parse(isAuthenticated());

    const init = () =>
    {
        
        getCategories().then(data => {
            if (data.error)
                setValues({...values, error: data.error});
            else
                setValues({...values, categories: data, formData: new FormData()});
        })

    }

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        init();
    }, []);

    // Handle onChange event
    const handleChange = name => event =>
    {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    // Shows error message using error state
    const showError = () =>
    {
        if (error)
            return (
                <h3 className="text-danger">"{name}" could not be create</h3>
            )
    }

    // Shows success message when category has been created
    const showSuccess = () => (
        <div
            className="alert alert-success"
            style={{display: createdVideogame ? "" : "none"}}>
                <h2>{`${createdVideogame}`} was successfully created</h2>
        </div>
        
    )

    const showLoading = () =>
    {
        return (loading && (
            <div
                className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        ))
    }

    const goBack = () =>
    {
        return (
            <div clas="mt-5">
                <Link to="/" className="text-warning mt-5">
                    Back to Home
                </Link>
            </div>
        )
    }

    // Handle onSubmit event
    const clickSubmit = event =>
    {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        createVideogame(user._id, token, formData).then(data => {
            if (data.error)
                setValues({...values, error: data.error, loading: false});
            else
                setValues({...values,
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    photo: "",
                    loading: false,
                    createdVideogame: data.name
                })
        })
    }

    // Videogame form
    const newCategoryForm = (
        <form onSubmit={clickSubmit} className="mt-5">
            <div className="form-group">
                <h4>Post photo</h4>
                <label className="btn btn-secondary">
                    <input 
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
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
                <label className="text-muted">Description</label>
                <input 
                    onChange={handleChange("description")}
                    type="text"
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input 
                    onChange={handleChange("price")}
                    type="text"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    type="text"
                    className="form-control"
                >
                    <option>Select Category</option>
                    {
                        categories &&
                        categories.map((cat, i) => (
                            <option key={i} value={cat._id}>
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button type="submit" className="btn btn-outline-success">
                Create Videogame
            </button>
        </form>
    )
    
    return (
        <>
            <Navigation />
            <div className="container">
                {newCategoryForm}
                {showError()}
                {showSuccess()}
                {showLoading()}
                {goBack()}
            </div>
        </>
    )
}

export default AddVideogame;