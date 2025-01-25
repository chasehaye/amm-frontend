import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGenre } from "../../utilities/anime-api";

function NewGenreForm({ onGenreAdded}) {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const genreNameRef = useRef('');
    const [loading , setLoading] = useState(false);

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        setError('');

        const newGenre = {
            name: genreNameRef.current.value
        }
        try{
            const newGenreCallResponse = await createNewGenre(newGenre);
            onGenreAdded();
            genreNameRef.current.value = '';
            setLoading(false);
        }catch(error){
            console.log(error)
            setError("Invalid Submission");
            setLoading(false);
        }
    } 

    return(
        <>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mb-10">
            <div className="flex flex-col w-60 mx-20">
                <label htmlFor="name">Genre:</label>
                <input placeholder="Genre" type="text" id="name" ref={genreNameRef} className="px-2 py-1 text-c1 px-1"/>
            </div>

            {!loading ?
                <div className="w-full flex justify-center mt-10">
                        <button className=" mx-auto py-1 px-6 border border-c4 text-sm hover:bg-c2 h-10">Create</button>
                </div>
                :
                <div class="loader mt-10"></div>
            }

        </form>
        <div className="flex justify-center items-center mb-2">{error}</div>
        </>
    )
}
export default NewGenreForm;