import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import { index } from "../utilities/anime-api";
import AnimeListComp from "../Components/AnimeListComp/AnimeListComp";

function NoUserAnimePage() {
    const [anime, setAnime] = useState(null);
    
    useEffect(() =>{
        async function fetchAnime() {
            const anime = await index();
            setAnime(anime)
            
        }
        fetchAnime();
    }, [])

    return(
        <>
        <NavBar/>
        <AnimeListComp animeList={anime} />
        </>
    )
}

export default NoUserAnimePage;