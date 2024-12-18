import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimeRequest, deleteAnimeRequest } from "../utilities/anime-api";
import AnimeUpdate from "../Components/AnimeUpdate/AnimeUpdate";

function AnimeItemPage() {
    let { animeId } = useParams();
    const [ anime, setAnime ] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAnime(){
            try{
                const animeData = await getAnimeRequest(animeId);
                if(animeData){
                    setAnime(animeData);
                    setLoading(false);
                }else{
                    setError("Not found");
                    setLoading(false);
                }
            }catch(error) {
                setError("Error retreving");
                setLoading(false);
            }
        }
        if(animeId){
            fetchAnime();
        }
    }, [animeId]);

    async function handleDelete(e){
        try{
            const deleteResponse = await deleteAnimeRequest(anime.id);
            if(deleteResponse.message === 'success'){
                navigate('/admin/home')
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            {loading ? 
                <p>Loading</p>
            :
            error ? 
                <p>{error}</p>
            :
            <div>
                <h1 class="mt-4 flex justify-center mb-8 border-b border-c4 w-40 mx-auto pb-2">Update Anime</h1>
                <AnimeUpdate anime={anime} setAnime={setAnime}/>
                <div className="w-full flex justify-end mt-10 mr-10" onClick={handleDelete}>
                    <button className="mb-10 py-1 px-6 border border-c4 text-sm hover:bg-c2 mt-2 h-10 mr-40">Delete</button>
                </div>
            </div>
            }
        </>
    )
}

export default AnimeItemPage;