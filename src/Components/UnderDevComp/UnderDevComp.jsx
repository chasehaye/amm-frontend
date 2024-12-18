import React from "react";

function UnderDevComp({titleOfDev}){
    return(
        <div className="flex flex-col items-center justify-center p-4">
            <div className="text-lg text-center mb-6 border-b border-r p-4 border-c4">
                Currently under development
            </div>
            <div className="text-3xl text-center text-c2 mb-4">
            {titleOfDev}
            </div>
            <div className="text-center">
                <div className="inline-block p-4 border-t border-l border-c4">
                    Stay tuned for updates!
                </div>
            </div>
        </div>

    )
}

export default UnderDevComp;