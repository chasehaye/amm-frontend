import React from "react";
import { UserContext } from "../UserProvider";
import NavBar from "../Components/NavBar/NavBar";
import UnderDevComp from "../Components/UnderDevComp/UnderDevComp";

function UserMangaPage() {
    return(
        <>
        <NavBar/>
        <UnderDevComp titleOfDev="Manga Feature" />
        </>
    )
}

export default UserMangaPage;