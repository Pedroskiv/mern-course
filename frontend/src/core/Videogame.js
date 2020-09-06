import React, {useState, useEffect} from "react";
import Navigation from "../layout/Navbar";
import { read } from "../core/apiCore";
import Card from "./Card";


const Videogame = () =>
{
    const [videogame, setVideogame] = useState({});
    const [error, setError] = useState(false);

    const loadSingleVideogame = videogameId =>
    {
        read(videogameId).then(data => {
            if (data.error)
                setError(data.error);
            else
                setVideogame(data);
        })
    }

    useEffect(() => {
        // const videogameId = props.match.params.videogameId;
        // console.log(videogameId);
        // loadSingleVideogame(videogameId);
    }, []);

    return (
        <>
            <Card videogame={videogame}/>
        </>
    )
}

export default Videogame;