import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider";
import NavBar from "../Components/NavBar/NavBar";
import { retrieveUserList } from "../utilities/user-api";
import AnimeListComp from "../Components/AnimeListComp/AnimeListComp";
import Loader from "../Components/Loader/Loader";


function UserAnimePage() {
    const [listSelection, setListSelection] = useState(0);
    const { user } = useContext(UserContext);
    const [orignalList, setOriginalList] = useState({});
    const [loading, setLoading] = useState(false);

    const handleListSelectionChange = (selection) => {
        setListSelection(selection)
    }


    useEffect(() => {
        const fetchUserAnimeList = async () => {
            try{
                const queryParameters = {
                    user_id: user.id,
                    list_type: listSelection
                };
                const listResponse = await retrieveUserList(user.name, queryParameters);
                setOriginalList(listResponse);
            }catch(error){
                console.error('Error fetching user anime list:', error);
            }finally{
                setLoading(true);
            }
        };
    
        fetchUserAnimeList();
    }, [listSelection, user.id, user.name]);

    const filteredAnimeList = () => {
        switch (listSelection) {
            case 0:
                return orignalList;
            case 1:
                return { currently_watching: orignalList.currently_watching };
            case 2:
                return { completed: orignalList.completed };
            case 6:
                return { on_hold: orignalList.on_hold };
            case 3:
                return { plan_to_watch: orignalList.plan_to_watch };
            case 5:
                return { interested_in: orignalList.interested_in };
            case 4:
                return { dropped: orignalList.dropped };
            default:
                return {};
        }
    };

    return(
        <>
            <NavBar/>
            {loading ? 
            <>
                    <div className="flex w-full justify-center items-center text-center mx-auto border-b border-c4 pb-4">
                        Your Anime
                    </div>
        
                    <div className="mt-10 flex w-[70vw] mx-auto border border-c4 h-14 mb-4">
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(0)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    All Anime
                                </div>
                                <div className="h-1 bg-c2 my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(1)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    Currently Watching
                                </div>
                                <div className="h-1 bg-ccw my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>    
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(2)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    Completed
                                </div>
                                <div className="w-full h-1 bg-cc my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>    
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(6)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    On Hold
                                </div>
                                <div className="w-full h-1 bg-coh my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>   
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(3)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    Plan To Watch
                                </div>
                                <div className="w-full h-1 bg-cptw my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>  
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative border-r border-c4 h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(5)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    Interested In
                                </div>
                                <div className="w-full h-1 bg-cii my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>  
                        </div>
                        <div className="group p-2 text-center flex-grow cursor-pointer hover:text-c2 relative h-14 flex items-center justify-center select-none " onClick={() => handleListSelectionChange(4)}>
                            <div className="flex flex-col w-full">
                                <div>
                                    Dropped
                                </div>
                                <div className="w-full h-1 bg-cd my-1 w-full group-hover:bg-c4">
                                    
                                </div>
                            </div>  
                        </div>
                    </div>
                    <AnimeListComp 
                        currently_watching={filteredAnimeList().currently_watching}
                        completed={filteredAnimeList().completed}
                        plan_to_watch={filteredAnimeList().plan_to_watch}
                        dropped={filteredAnimeList().dropped}
                        interested_in={filteredAnimeList().interested_in}
                        on_hold={filteredAnimeList().on_hold}
                        listSelection={listSelection}
                    />
                </>
            :
                <Loader />
            }

            
        </>
    )
}

export default UserAnimePage;