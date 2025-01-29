import React from "react";
import { Link } from "react-router-dom";

function RankedAnimeItem({anime, rank}) {
    return(
        <>
            <div className="border border-c4 h-200px mx-14 flex relative">
                <div className="px-2 text-5xl my-auto mx-1 text-center w-28">
                    {rank}
                </div>
                <Link to={`/anime/${anime.id}`} className="mr-4 h-full border-r border-l px-2 border-c4">
                    {
                            anime.image ? (
                                <img 
                                src={anime.image} 
                                alt={"?"} 
                                className="w-[116px] h-[164px] mt-2 mb-2 object-cover" 
                                />
                            ) : (
                                <div className="w-[116px] h-[164px] mt-2 mb-2 bg-c4 text-c6 flex items-center justify-center"><span className="text-5xl">?</span></div>
                            )
                    }
                </Link>
                <div>
                    <Link to={`/anime/${anime.id}`} className="mt-4 text-lg hover:text-c2">
                        {anime.titleJpRoman}
                    </Link>
                    <div className="ml-1 mt-1">
                        {(anime.type && anime.episodes) ? `${anime.type} |  ${anime.episodes}` : "-"}
                    </div>
                    <div className=" ml-1 mt-1">
                        {anime.airDate ? (
                            `${new Date(anime.airDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} ${anime.endDate ? `- ${new Date(anime.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : '-'}` 
                        ) : "-"}
                    </div>
                    <div className=" ml-1 mt-1">
                        {anime.premiereSeason ? anime.premiereSeason : "-"}
                    </div>
                </div>

                <div className="absolute right-0 w-40 flex items-center justify-center h-full text-2xl border-l border-c4">
                    {anime.aggregateRating ? anime.aggregateRating.toFixed(2) : "-"}
                </div>

            </div>
        </>
    )
}

export default RankedAnimeItem;