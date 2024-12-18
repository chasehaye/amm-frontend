import React, { useEffect, useState } from "react";
import NewGenreForm from "./NewGenreForm/NewGenreForm";
import { indexGenre,deleteGenre } from "../utilities/anime-api";
import { Link } from "react-router-dom";

function AddGenrePage() {
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState(null);



    const fetchGenres = async () => {
        try {
            const genresResponse = await indexGenre();
            setGenres(genresResponse);
        } catch (err) {
            setError('Failed to load');
        }
    };

    const handleDelete = async (genreId) => {
        try {
            const deleteResponse = await deleteGenre(genreId);
            fetchGenres();
        } catch (err) {
            console.log('Error deleting genre:', err);
        }
    };

    const confirmDelete = (genreId) => {
        setGenreToDelete(genreId);
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setGenreToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (genreToDelete) {
            handleDelete(genreToDelete);
        }
        setShowModal(false);
        setGenreToDelete(null);
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleGenreAdded = () => {
        fetchGenres();
    };

    return(
        <>
            <Link className="mt-4 flex justify-center items-center mb-2 border-x border-c4 w-40 mx-auto py-2 cursor-pointer hover:bg-c2" to="/admin/home">
                Genre Control
            </Link>
            <NewGenreForm onGenreAdded={handleGenreAdded}/>
            <div className="mx-auto w-full flex flex-col justify-center items-center">
                {error && <p className="mb-2">{error}</p>}
                {genres ? (
                    <div className="flex flex-wrap">
                        {genres.map((genre, index) => (
                            <div key={index} className="m-2 border-b border-c4 flex pl-1">
                                <div className="min-w-10 px-1 flex justify-center items-center  whitespace-nowrap">
                                    {genre.name}
                                </div>
                                <div
                                    className="ml-1 px-2 py-1 border-l border-t border-r border-c4 hover:bg-c2 hover:text-c6 cursor-pointer flex justify-center items-center"
                                    onClick={() => confirmDelete(genre.id)}
                                >
                                    x
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading genres...</p>
                )}
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-c1 p-6 w-96">
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
        </>
    )
}
export default AddGenrePage;