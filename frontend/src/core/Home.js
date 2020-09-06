import React,{ useState, useEffect } from "react";
import Navigation from "../layout/Navbar";
import { getVideogames } from "./apiCore";
import Card from "./Card";

const Home = (req, res) =>
{
    // States
    const [videogames, setVideogames] = useState([]);
    const [error, setError] = useState(false);

    const loadVideoGames = () =>
    {
        getVideogames().then(data =>
        {
            if (data.error)
                setError(data.error);
            else
            {
                console.log(data);
                setVideogames(data);
            }

        })
    }

    useEffect(() => {
        loadVideoGames();
    }, []);

    return (
        <div>
            <Navigation/>
            <div className="container">
                <div className="row">
                    {videogames.map((vg, i) =>
                    {
                        return (
                            <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                <Card videogame={vg} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;