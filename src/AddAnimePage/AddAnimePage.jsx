import React from "react";
import NewAnimeForm from "../Components/NewAnimeForm/NewAnimeForm"
function AddAnimePage() {

    return(
        <>
            <h1 class="mt-4 flex justify-center mb-8 border-b border-c4 w-40 mx-auto pb-2">Add Anime</h1>

            <NewAnimeForm />
        </>
    )
}

export default AddAnimePage;