import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import RankedAnimeListComp from "./RankedAnimeListComp/RankedAnimeListComp";
import { index, indexOrder } from "../utilities/anime-api";
import Loader from "../Components/Loader/Loader";

function TopAnimePage(){
    // make it load properly
    // add a generic global list to show anime (different style???)
    // 

        const [anime, setAnime] = useState(null);
        const [loading, setIsLoading] = useState(true);
        
        useEffect(() =>{
            async function fetchAnime() {
                try{
                    const queryParameters = {
                        order_by: 'aggregateRating',
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
            <NavBar />
            {loading ?
                <Loader />
            :
                <>
                    <RankedAnimeListComp animeList={anime} />
                </>
            }
        </>
    )
}

export default TopAnimePage;