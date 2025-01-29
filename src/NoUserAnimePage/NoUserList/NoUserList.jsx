import React from "react";
import GenericAnimeListItem from "../../Components/GenericAnimeListItem/GenericAnimeListItem";

function NoUserList({animeList}){

    return(
        <>
        <div className="flex w-full justify-center items-center text-center mx-auto border-b border-c4 pb-2 mb-4">
            All Anime
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
            {animeList.map((anime) => (
                <GenericAnimeListItem anime={anime} />
            ))}
        </div>
        
        </>
    )
}

export default NoUserList;