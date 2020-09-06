import React from "react";
import Home from "./core/Home";
import Search from "./core/Search";
import Signin from "./core/Signin";
import Signup from "./core/Signup";
import Signout from "./core/Signout";
import AddCategory from "./core/AddCategory";
import AddVideogame from "./core/AddVideogame";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/videogameById" exact component={Search}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signout" exact component={Signout}/>
                <Route path="/addcategory" exact component={AddCategory}/>
                <Route path="/addvideogame" exact component={AddVideogame}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;