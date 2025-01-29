import React from "react";
import { Link } from "react-router-dom";

function GenericAnimeListItem({anime}) {
    return(
    <>
    <div className="border border-c4 mx-2 my-2 flex flex-col justify-between shadow-md" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0), 0px 1px 3px rgba(138, 137, 137, 0.74)' }}>
        <div className="flex w-full">
            <Link to={`/anime/${anime.id}`} className="h-full px-2 py-4 border-c4 flex-shrink-0">
                {
                        anime.image ? (
                            <img 
                            src={anime.image} 
                            alt={"?"} 
                            className="w-[140px] h-[200px] object-cover" 
                            />
                        ) : (
                            <div className="w-[140px] h-[200px] bg-c4 text-c6 flex items-center justify-center"><span className="text-5xl">?</span></div>
                        )
                }
            </Link>
            <div className="mt-2 flex-1 overflow-hidden">
                <Link className="mt-2 pb-1 mb-2 px-2 text-lg border-b border-c4 break-words line-clamp-2 hover:text-c2" to={`/anime/${anime.id}`}>
                    {anime.titleJpRoman}
                </Link>
                <div className="mx-1">
                    {anime.studio?.name ? anime.studio.name : "No studio yet"}
                </div>
                <div className="mx-1">
                    Season: {anime.premiereSeason ? anime.premiereSeason : "N/A"}
                </div>
                <div className="mx-1">
                    Score: {anime.aggregateRating ? anime.aggregateRating.toFixed(2) : "N/A"} 
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default GenericAnimeListItem;