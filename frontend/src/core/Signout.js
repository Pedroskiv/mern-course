import React from "react";
import { Redirect } from "react-router-dom";
import { signout } from "./apiCore";

const Signout = () =>
{
    const redirectUser = () =>
    {
        signout();
        
        return <Redirect to="/"/>
    }

    return (
        <>
            {redirectUser()}
        </>
    )
}

export default Signout;