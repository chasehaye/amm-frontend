import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimeRequest, deleteAnimeRequest } from "../utilities/anime-api";
import AnimeUpdate from "../Components/AnimeUpdate/AnimeUpdate";

function AnimeItemPage() {
    let { animeId } = useParams();
    const [ anime, setAnime ] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
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

    const confirmDelete = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setGenreToDelete(null);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        setShowModal(false);
    };


    const [hovered, setHovered] = useState(false);

    return (
        <>
            {loading ? 
                <div className="loader2 mx-auto mt-60"></div>
            :
            error ? 
                <p>{error}</p>
            :
            <div className="">
                <h1 class="mt-4 flex justify-center mb-8 border-b border-c4 w-40 mx-auto pb-2 hover:cursor-pointer"
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => navigate(-1)}
                >
                    {hovered ? 'Return' : 'Update Anime'}
                </h1>
                <div className="fixed top-0 right-0 p-4" onClick={() => confirmDelete()}>
                    <button className="mb-10 py-1 px-6 border border-c4 text-sm hover:bg-c2 mt-4 h-10 mr-4">Delete</button>
                </div>

                
                {showModal && (
                    <div className="fixed z-[9999] inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                        <div className=" bg-c1 p-6 w-96">
                            <h3 className="text-lg font-bold mb-4 flex justify-center items-center text-c2">Confirm Deletion</h3>
                            <p className="flex justify-center items-center">Are you sure you want to delete this Genre and its link to other Animes?</p>
                            <div className="mt-4 flex justify-end space-x-4 flex justify-center items-center">
                                <button
                                    className="py-1 px-4 bg-c4 text-white hover:bg-c6"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-1 px-4 bg-c2 text-white hover:bg-c6"
                                    onClick={handleConfirmDelete}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                <AnimeUpdate anime={anime} setAnime={setAnime}/>
            </div>
            }
        </>
    )
}

export default AnimeItemPage;