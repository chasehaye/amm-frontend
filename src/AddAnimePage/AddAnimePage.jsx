import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewAnimeForm from "../Components/NewAnimeForm/NewAnimeForm"
function AddAnimePage() {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    return(
        <>
            <h1 class="mt-4 flex justify-center mb-8 border-b border-c4 w-40 mx-auto pb-2 hover:cursor-pointer"
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate(-1)}
            >
                {hovered ? 'Return' : 'Add Anime'}
            </h1>

            <NewAnimeForm />
        </>
    )
}

export default AddAnimePage;