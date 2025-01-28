import React, {useEffect, useState, useContext } from 'react';
import AdminAnimeItem from '../AdminAnimeItem/AdminAnimeItem';
import { UserContext } from '../../UserProvider';

function AdminList({animeList}) {

    const { user } = useContext(UserContext);
    const [ isClicked, setIsClicked ] = useState(false);

    const handleClick = () => {
        setIsClicked(prevState => !prevState);
        console.log(user.name);
    };

    const mappedAnime = isClicked
    ? animeList
        .filter(anime => anime.created_by !== user.name)
        .map(anime => (
            <AdminAnimeItem key={anime.id} anime={anime} />
        ))
    : animeList.map(anime => (
        <AdminAnimeItem key={anime.id} anime={anime} />
    ));

    return(
        <> 

                <div className="flex flex-col p-3 w-[70vw] mx-auto border-t border-l border-r border-c4 items-center justify-center select-none">
                    Recently Updated
                    <div className='border-b border-c4 w-20 mt-4'>
                    </div>
                </div>

                <div className="flex px-5 pb-2 w-[70vw] mx-auto border-b border-l border-r border-c4 border-c4 mb-10 select-none">

                    <div className="w-[30vw] flex justify-between">
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
                        
                    <div className="w-[10vw] justify-center text-center cursor-pointer border-t border-c4 hover:bg-c2 select-none" onClick={handleClick}>
                        {isClicked ? "Created By All" : "Created By You"}
                    </div>
                </div>

                {mappedAnime}
        </>
    )
}

export default AdminList;