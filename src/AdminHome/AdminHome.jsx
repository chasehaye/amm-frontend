import React, { useState, useEffect } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import AnimeList from "../Components/AdminList/AdminList";
import { index } from "../utilities/anime-api";

function AdminHomePage() {

    const [loading, setLoading] = useState(true);
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const anime = await index();
                setAnimeList(anime);
            }catch(err){
                console.error("Failed to fetch Anime List", err);
            }finally{
                setLoading(false);
            }
        }

        fetchAnime();
    }, []);

    return(
        <>
            {loading ?
                <div className="loader2 mx-auto mt-60"></div>
            : 
            <>
                <AdminNav /> 
                <AnimeList animeList={animeList} />
            </>
            }
            
        </>
    )

}

export default AdminHomePage;