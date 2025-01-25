import React, { useContext, useEffect, useState } from 'react';
import AnimeItem from '../AnimeItem/AnimeItem';

function AdminList({animeList}) {

    const mappedAnime = animeList.map(anime => (
        <AnimeItem key={anime.id} anime={anime} />
    ))

    return(
        <> 

                <div className="flex flex-col p-3 w-[70vw] mx-auto border-t border-l border-r border-c4 items-center justify-center ">
                    Recently Updated
                    <div className='border-b border-c4 w-20 mt-4'>
                    </div>
                </div>

                <div className="flex p-3 w-[70vw] mx-auto border-b border-l border-r border-c4 border-c4 mb-10">
                    <div className="w-[30vw] flex justify-between">
                        <span className='ml-8'>Anime</span>
                        <div className='mr pr-40 pl-2'>Title</div>
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

                {mappedAnime}
        </>
    )
}

export default AdminList;