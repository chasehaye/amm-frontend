import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import { indexOrder } from "../utilities/anime-api";
import NoUserList from "./NoUserList/NoUserList";
import Loader from "../Components/Loader/Loader";

function NoUserAnimePage() {
    const [anime, setAnime] = useState(null);
    const [loading, setIsLoading] = useState(true);
    
    useEffect(() =>{
        async function fetchAnime() {
            try{
                const queryParameters = {
                    order_by: 'airDate',
                    order: 'des'
                }
                const anime = await indexOrder(queryParameters);
                setAnime(anime)
            }catch(error){
                console.error('Error fetching anime:', error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAnime();
    }, [])

    return(
        <>
        <NavBar/>
        {loading ?
            <Loader />
        :
            <>
                <NoUserList animeList={anime} />
            </>
        }
        </>
    )
}

export default NoUserAnimePage;