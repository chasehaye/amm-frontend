import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewStudio } from "../../utilities/anime-api";
import DatePicker from "react-datepicker";

function NewStudioForm({onStudioAdded}) {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const studioNameRef = useRef('');
    const [establishedDate, setEstablishedDate] = useState(null);
    const websiteRef = useRef('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const formattedDate = establishedDate ? new Date(establishedDate).toISOString().split('T')[0] : '';

        const newStudio = {
            name: studioNameRef.current.value,
            establishedDate: formattedDate,
            website: websiteRef.current.value,
        }
        try{
            const newStudioResponse = await createNewStudio(newStudio);
            onStudioAdded();
            studioNameRef.current.value = '';
            websiteRef.current.value = '';
            setEstablishedDate(null);
        }catch(error){
            setError("invalid submission");
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mb-4">
            <div className="flex flex-col w-60 mx-20">
                <label htmlFor="name">Studio:</label>
                <input placeholder="Studio" type="text" id="name" ref={studioNameRef} className="px-2 py-1 text-c1 px-1"/>
            </div>

            <div>
                <div className="flex flex-col w-60">
                    <label className="mb-1 w-60" htmlFor="date">Established Date: </label>
                    <DatePicker
                    selected={establishedDate}
                    onChange={(date) => setEstablishedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="px-2 py-1 text-c1 mb-2"
                    placeholderText="YYYY-MM-DD"
                    />
                </div>
            </div>

            <div className="flex flex-col w-60 mx-20">
                <label htmlFor="name">Website Link:</label>
                <input placeholder="Website" type="text" id="name" ref={websiteRef} className="px-2 py-1 text-c1 px-1"/>
            </div>





            <div className="w-full flex justify-center mt-4">
                    <button className="mx-auto py-1 px-6 border border-c4 text-sm hover:bg-c2 h-10">Create</button>
            </div>

        </form>
        <div className="flex justify-center items-center mb-2">{error}</div>
        </>
    )
}
export default NewStudioForm;