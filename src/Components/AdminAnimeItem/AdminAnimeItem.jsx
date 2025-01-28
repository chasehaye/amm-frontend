import React from "react";
import { Link } from "react-router-dom";

function AdminAnimeItem({anime}) {

    return(
        <>
        <div className="justify-center items-center mx-auto">
            <div className="flex px-5 w-[70vw] mx-auto border border-c4">
                <div className="">
                <Link to={`/anime/${anime.id}`}>
                    <div className="flex flex-row">
                        {
                        anime.image ? (
                            <img 
                            src={anime.image} 
                            alt={"?"} 
                            className="w-[87px] h-[123px] mt-2 mb-2 object-cover" 
                            />
                        ) : (
                            <div className="w-[87px] h-[123px] mt-2 mb-2 bg-c4 text-c6 flex items-center justify-center"><span className="text-5xl">?</span></div>
                        )
                        }
                        <div className="flex text-left w-80 break-words overflow-hidden whitespace-normal pl-[1vw] pt-4">
                            {anime.titleEnglish ? anime.titleEnglish : anime.titleJpRoman}
                        </div>
                    </div>
                </Link>
                </div>


                <div className="w-[10vw] text-center break-words overflow-hidden pt-4">
                    {anime.episodes ? anime.episodes : "-"}
                </div>
                    
                <div className="w-[10vw] text-center break-words overflow-hidden pt-4">
                    {anime.premiereSeason ? anime.premiereSeason : "-"}
                </div>
                    
                <div className="w-[10vw] text-center break-words overflow-hidden pt-4">
                    <span>
                        {anime.studio?.name ? anime.studio.name : "-"}
                    </span>
                </div>

                <div className="w-[10vw] text-center break-words overflow-hidden pt-4">
                    {anime.created_by ? anime.created_by : "-"}
                </div>


            </div>
        </div>
        </>
    )
}

export default AdminAnimeItem;