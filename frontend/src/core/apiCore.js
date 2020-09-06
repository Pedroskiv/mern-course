import { API } from "../config";

export const getVideogames = () =>
{
    return fetch(
        `${API}/videogame/videogames`,
        {
            method: "GET"
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const sigin = user =>
{
    return fetch( // También se puede hacer con axios en vez de fetch
        `${API}/auth/signin`,
        {
            method: "POST",
            headers:
            {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const authenticate = (data, next) =>
{
    if (typeof window !== "undefined")
    {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () =>
{
    if (typeof window == "undefined")
        return false;

    if (localStorage.getItem("jwt"))
        return localStorage.getItem("jwt");
    else 
        return false;
}

export const signout = (next) =>
{
    if (typeof window !== "undefined")
    {
        localStorage.removeItem("jwt");
        return fetch(`${API}/auth/signout`, 
        {
            method: "GET"
        })
        .then(res =>{ 
            console.log("signout", res);
        })
        .catch(err => console.log(err));
    }
    next();
}

export const signup = user =>
{
    return fetch( // También se puede hacer con axios en vez de fetch
        `${API}/auth/signup`,
        {
            method: "POST",
            headers:
            {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

// Creates a new category
export const createCategory = (userId, token, category) =>
{
    return fetch( // También se puede hacer con axios en vez de fetch
        `${API}/category/create/${userId}`,
        {
            method: "POST",
            headers:
            {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const getCategories = () =>
{
    return fetch(
        `${API}/category/categories`,
        {
            method: "GET"
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const createVideogame = (userId, token, videogame) =>
{
    return fetch(
        `${API}/videogame/create/${userId}`,
        {
            method: "POST",
            headers:
            {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: videogame
        }
    )
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const read = (videogameId) =>
{
    // return fetch(
    //     `${API}/videogame/${videogameId}`,
    //     {
    //         method: "GET"
    //     }
    // )
    // .then(res => {
    //     return res.json();
    // })
    // .catch(err => console.log(err));
}