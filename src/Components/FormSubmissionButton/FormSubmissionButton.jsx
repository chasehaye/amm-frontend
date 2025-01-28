import React from "react";

function FormSubmissionButton({ buttonText, isSubmitting }){
    return(
        <>
            {!isSubmitting ?
                <div className="w-full flex justify-center mt-10">
                        <button className=" mx-auto py-1 px-6 border border-c4 text-sm hover:bg-c2 h-10">{buttonText}</button>
                </div>
                :
                <div class="loader mt-10"></div>
            }
        </>
    )
}

export default FormSubmissionButton;