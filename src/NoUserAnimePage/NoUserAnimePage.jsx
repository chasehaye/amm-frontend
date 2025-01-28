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
        <div className="flex w-full justify-center items-center text-center mx-auto border-b border-c4 pb-2 mb-4">
            (temporarily sorted by created)
        </div>
        <AnimeListComp animeList={anime} />
        </>
    )
}

export default NoUserAnimePage;