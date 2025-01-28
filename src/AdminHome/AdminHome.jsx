import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import AnimeList from "../Components/AdminList/AdminList";
import { index, indexOrder } from "../utilities/anime-api";
import { UserContext } from "../UserProvider";

function AdminHomePage() {

    const [loading, setLoading] = useState(true);
    const [animeList, setAnimeList] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const anime = await indexOrder({user: user.name, order_by: "updated_at", order: 'des'});
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
            <AdminNav /> 
            {loading ?
                <>
                    <div className="loader2 mx-auto mt-60"></div>
                    <div className="mx-auto text-center">loading</div>
                </>
            : 
            <>
                <AnimeList animeList={animeList} />
            </>
            }
            
        </>
    )

}

export default AdminHomePage;