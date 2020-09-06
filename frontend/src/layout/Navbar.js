import React from "react";
import { Navbar, NavItem } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/apiCore";

const isActive = (history, path) =>
{
    if (history.location.pathname === path)
        return {color: "#ff9900"}
    else
        return {color: "#fff"}
}

const Navigation = ({history}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Videogames</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <NavItem className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/"
                                    >
                                        Home
                                </Link>
                            </NavItem>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Search
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            { ! isAuthenticated() && (
                                <>
                                <NavItem className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/signup"
                                        >
                                        Signup
                                    </Link>
                                </NavItem>
                                 <NavItem className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/signin"
                                        >
                                        Login
                                    </Link>
                                </NavItem>
                                </>
                            )}

                            { isAuthenticated() && (
                                <>
                                <NavItem className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/addcategory"
                                        >
                                        Add Category
                                    </Link>
                                </NavItem>
                                <NavItem className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/addvideogame"
                                        >
                                        Add Product
                                    </Link>
                                </NavItem>
                                <NavItem className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/signout"
                                        >
                                        Logout
                                    </Link>
                                </NavItem>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;