import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import AnimeListComp from "../Components/AnimeListComp/AnimeListComp";
import { index, indexOrder } from "../utilities/anime-api";

function TopAnimePage(){

        const [anime, setAnime] = useState(null);
        
        useEffect(() =>{
            async function fetchAnime() {
                const queryParameters = {
                    order_by: 'aggregateRating',
                    order: 'des'
                }
                const anime = await indexOrder(queryParameters);
                setAnime(anime)
                console.log(anime)
            }
            fetchAnime();
        }, [])

    return(
        <>
            <NavBar />
            <div className="flex justify-center items-center border-b border-c4 mb-4 pb-2 ">
                Top Anime
            </div>
            <AnimeListComp animeList={anime} />
        </>
    )
}

export default TopAnimePage;