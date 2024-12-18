import React, { useState, useEffect} from "react";
import NewStudioForm from "./NewStudioForm/NewStudioForm";
import { Link } from "react-router-dom";
import { indexStudio, deleteStudio } from "../utilities/anime-api";

function AddStudioPage() {
    const [error, setError] = useState(null);
    const [studios, setStudios] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [studioToDelete, setStudioToDelete] = useState(null);

    const fetchStudios = async () => {
        try {
            const studiosResponse = await indexStudio();
            setStudios(studiosResponse);
        } catch (err) {
            setError('Failed to load');
        }
    };

    const handleDelete = async (studioId) => {
        try {
            const deleteResponse = await deleteStudio(studioId);
            fetchStudios();
        } catch (err) {
            console.log('Error deleting Studio:', err);
        }
    };

    const confirmDelete = (studioId) => {
        setStudioToDelete(studioId);
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setStudioToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (studioToDelete) {
            handleDelete(studioToDelete);
        }
        setShowModal(false);
        setStudioToDelete(null);
    };

    useEffect(() => {
        fetchStudios();
    }, []);

    const handleStudioAdded = () => {
        fetchStudios();
    };

    return(
        <>
            <Link className="mt-4 flex justify-center items-center mb-2 border-x border-c4 w-40 mx-auto py-2 cursor-pointer hover:bg-c2" to="/admin/home">
                Studio Control
            </Link>
            <NewStudioForm onStudioAdded={handleStudioAdded}/>
            <div className="mx-auto w-full flex flex-col justify-center items-center">
                {error && <p className="mb-2">{error}</p>}
                {studios ? (
                    <div className="flex flex-wrap">
                        {studios.map((studio, index) => (
                            <div key={index} className="m-2 border-b border-c4 flex pl-1">
                                <div className="min-w-10 px-1 flex justify-center items-center  whitespace-nowrap">
                                    {studio.name}
                                </div>
                                <div
                                    className="ml-1 px-2 py-1 border-l border-t border-r border-c4 hover:bg-c2 hover:text-c6 cursor-pointer flex justify-center items-center"
                                    onClick={() => confirmDelete(studio.id)}
                                >
                                    x
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading studios...</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-c1 p-6 w-96">
                        <h3 className="text-lg font-bold mb-4 flex justify-center items-center text-c2">Confirm Deletion</h3>
                        <p className="flex justify-center items-center">Are you sure you want to delete this Studio and its link to other Animes?</p>
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
export default AddStudioPage;