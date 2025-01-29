import React, { useState } from "react";
import AnimeItem from "../UserAnimeItem/UserAnimeItem";

function AnimeListComp({ currently_watching = [], completed = [], plan_to_watch = [], dropped = [], interested_in = [], on_hold = [], listSelection }){
    
    const getList = () => {
        switch (listSelection) {
          case 0: // All Anime
            return [
              { list: currently_watching, color: 'bg-ccw' },
              { list: completed, color: 'bg-cc' },
              { list: on_hold, color: 'bg-coh' },
              { list: plan_to_watch, color: 'bg-cptw' },
              { list: interested_in, color: 'bg-cii' },
              { list: dropped, color: 'bg-cd' },
            ];
          case 1: // Currently Watching
            return [{ list: currently_watching, color: 'bg-ccw' }];
          case 2: // Completed
            return [{ list: completed, color: 'bg-cc' }];
          case 3: // Plan To Watch
            return [{ list: plan_to_watch, color: 'bg-cptw' }];
          case 4: // Dropped
            return [{ list: dropped, color: 'bg-cd' }];
          case 5: // Interested In
            return [{ list: interested_in, color: 'bg-cii' }];
          case 6: // On-Hold
            return [{ list: on_hold, color: 'bg-coh' }];
          default:
            return [];
        }
    };

    const selectedLists = getList();

      

    
    return(
        <>
            <div className="flex px-5 py-2 mb-2 mt-6 w-[70vw] mx-auto border border-c4 select-none">
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

            {selectedLists && selectedLists.length > 0 ? (
                selectedLists.some(({ list }) => list.length > 0) ? (
                    selectedLists.map(({ list, color }, index) => (
                    <div key={index}>
                        {list.map((anime) => (
                        <AnimeItem
                            key={anime.id}
                            anime={anime}
                            color={color}
                        />
                        ))}
                    </div>
                    ))
            ) : (
                    <div className="flex p-3 w-[70vw] mx-auto border-b border-c4 justify-center items-center h-20">
                    None added here
                    </div>
            )) : (
                <div className="flex p-3 w-[70vw] mx-auto border-b border-c4 justify-center items-center h-20">
                    None added here
                </div>
            )}
        </>
    )
}

export default AnimeListComp;