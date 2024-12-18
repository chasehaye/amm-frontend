import React from "react";
import AnimeItem from "../AnimeItem/AnimeItem";

function AnimeListComp({animeList}){
    return(
        <>
            <div className="flex p-3 w-[70vw] mx-auto border border-c4">
                <div className="w-[30vw]">
                    <span className='ml-8'>Anime</span>
                </div>


                <div className="w-[10vw] justify-center text-center">
                    Episodes
                </div>
                    
                <div className="w-[10vw] justify-center text-center">
                    Season
                </div>

                <div className="w-[10vw] justify-center text-center">
                    Studio
                </div>
                    
                <div className="w-[10vw] justify-center text-center">
                    Rating
                </div>
            </div>

            {animeList && animeList.length > 0 ? (
                animeList.map(anime => (
                    <AnimeItem key={anime.id} anime={anime} />
                ))
            ) : (
                <div className="flex p-3 w-[70vw] mx-auto border-b border-c4 justify-center items-center h-20">None added yet</div>
            )}
        </>
    )
}

export default AnimeListComp;