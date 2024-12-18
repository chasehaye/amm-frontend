import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import UnderDevComp from "../Components/UnderDevComp/UnderDevComp";

function NoUserMangaPage() {

    return(
        <>
            <NavBar/>
            <UnderDevComp titleOfDev="Manga Feature" />
        </>
    )
}

export default NoUserMangaPage;