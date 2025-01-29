import React from "react";
import RankedAnimeItem from "../../Components/RankedAnimeItem/RankedAnimeItem";
import Loader from "../../Components/Loader/Loader";

function RankedAnimeListComp({animeList}) {
    return(
        <>
            <div className="border border-c4 h-200px mx-14 flex relative">
                <div className="px-2 my-auto mx-1 text-center w-28 text-lg py-2">
                    Rank
                </div>
                <div className="mr-4 h-full border-l px-2 border-c4 text-lg py-2 pl-6">
                    Anime
                </div>
                <div className="absolute right-0 w-40 flex items-center justify-center h-full text-lg border-l border-c4">
                    Global Score
                </div>
            </div>
            {animeList && animeList.length > 0 ?(
                animeList.map((anime, index) => (
                    <RankedAnimeItem key={anime.id} anime={anime} rank={index + 1} />
                ))
            ):(
                <div className="mx-auto text-center w-full">No Anime</div>
            )}
            
        
        </>
    )
}

export default RankedAnimeListComp;