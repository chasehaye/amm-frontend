import React, { useState } from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import AnimeList from "../Components/AdminList/AdminList";

function AdminHomePage() {

    const [loading, setLoading] = useState(false);
    

    return(
        <>
            <AdminNav />
            {!loading}
            <AnimeList />
            
        </>
    )

}

export default AdminHomePage;