import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import NavBar from "../Components/NavBar/NavBar";
import { retrieveUserList } from "../utilities/user-api";
import AnimeListComp from "../Components/AnimeListComp/AnimeListComp";


function UserAnimePage() {
    const [listSelection, setListSelection] = useState(0);
    const { user } = useContext(UserContext);
    const [userAnimeList, setUserAnimeList] = useState([]);

    const handleListSelectionChange = (selection) => {
        setListSelection(selection)
    }


    useEffect(() => {
        const fetchUserAnimeList = async () => {
            try {
                const queryParameters = {
                    user_id: user.id,
                    list_type: listSelection
                };
                const listResponse = await retrieveUserList(user.name, queryParameters);
                setUserAnimeList(listResponse);
            } catch (error) {
                console.error('Error fetching user anime list:', error);
            }
        };
    
        fetchUserAnimeList();
    }, [listSelection, user.id, user.name]);

    return(
        <>
        <NavBar/>
            <div className="flex w-full justify-center items-center text-center mx-auto border-b border-c4 pb-4">
                Your Anime
            </div>

            <div className="mt-10 flex w-[70vw] mx-auto border border-c4 h-14 mb-4">
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(0)}>
                    All Anime
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(1)}>
                    Currently Watching    
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(2)}>
                    Completed
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(6)}>
                    On-Hold
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(3)}>
                    Plan To Watch
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(5)}>
                    Interested In
                </div>
                <div className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(4)}>
                    Dropped
                </div>
            </div>

            <AnimeListComp animeList={userAnimeList} />

            
        </>
    )
}

export default UserAnimePage;