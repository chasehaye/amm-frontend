import React, { useEffect, useState } from "react";
import AnimeDetailItem from "../Components/AnimeDetailItem/AnimeDetailItem";
import { useParams } from "react-router-dom";
import { getAnimeRequest } from "../utilities/anime-api";

function AnimeItemDetailPage () {

    const { animeId } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        async function fetchAnime() {
            try{
                const anime = await getAnimeRequest(animeId);
                setAnime(anime);
            }catch(err){
                console.log("Failed to fetch" + err);
            }
        }
        fetchAnime();
    },[animeId])
    return (
        <>
            {anime ? <AnimeDetailItem anime={anime} /> : <p>Loading...</p>} 
        </>
    )
}

export default AnimeItemDetailPage;