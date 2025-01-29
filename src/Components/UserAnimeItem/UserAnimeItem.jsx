import React from "react";
import { Link } from "react-router-dom";

function UserAnimeItem({anime , color}) {

    return(
        <>
        <div className="justify-center items-center mx-auto flex">
            <div className="flex pr-5 w-[70vw] mx-auto border border-c4">
                <div className={`${color} pl-2 my-1 ml-1`}>
                    
                </div>
                <div className="w-[30vw] justify-center text-center py-3">
                <Link to={`/anime/${anime.id}`}>
                    <div className="flex flex-row">
                        {
                        anime.image ? (
                            <img 
                            src={anime.image} 
                            alt={"?"} 
                            className="w-[87px] h-[123px] object-cover ml-[1vw] mr-10" 
                            />
                        ) : (
                            <div className="w-[87px] h-[123px] mx-4 bg-c4 text-c6 flex items-center justify-center mr-10"><span className="text-5xl">?</span></div>
                        )
                        }
                        <div className="flex text-left w-80 break-words overflow-hidden whitespace-normal">
                            {anime.titleJpRoman ? anime.titleJpRoman : anime.titleEnglish}
                        </div>
                    </div>
                </Link>
                </div>


                <div className="w-[10vw] justify-center text-center break-words overflow-hidden py-3">
                    {anime.episodes ? anime.episodes : "N/A"}
                </div>
                    
                <div className="w-[10vw] justify-center text-center break-words overflow-hidden py-3">
                    {anime.premiereSeason ? anime.premiereSeason : "N/A"}
                </div>
                    
                <div className="w-[10vw] justify-center text-center break-words overflow-hidden py-3">
                    <span>
                        {anime.studio?.name ? anime.studio.name : "N/A"}
                    </span>
                </div>

                <div className="w-[10vw] justify-center text-center break-words overflow-hidden py-3">
                    {anime.aggregateRating ? anime.aggregateRating.toFixed(2) : "-"}
                </div>


            </div>
        </div>
        </>
    )
}

export default UserAnimeItem;