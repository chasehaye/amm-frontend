import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserProvider";

function AdminNav() {
    const { admin, user } = useContext(UserContext);

    
    if (admin === null) return null;
    if (admin === false) return null;

    return(
    <>
    <div className="top-0 w-full flex h-[6vh] mb-10">
        <Link className="cursor-pointer flex-1 text-center leading-[6vh] border-c4 border-b hover:text-c2" to="/admin/anime/add">Add Anime</Link>
        <Link className="cursor-pointer flex-1 text-center leading-[6vh] border-c4 border-l border-b hover:text-c2" to="/admin/genre/add">Genre Panel</Link>
        <Link className="cursor-pointer flex-1 text-center leading-[6vh] border-c4 border-l border-b hover:text-c2" to="/admin/studio/add">Studio Panel</Link>
        <div className="flex-1 text-center leading-[6vh] border-c4 border-l border-b">Admin - {user.name}</div>
        <div className="flex-1 leading-[6vh] border-b border-l border-c4">
            <div className="flex text-center border-c4 border-b hover:text-c2">
                <Link className="w-full cursor-pointer text-center leading-[3vh]" to="/">Leave Admin Panel</Link>
            </div>
            <div className="flex text-center border-c4 hover:text-c2">
                <Link className="w-full cursor-pointer text-center leading-[3vh]" to="/null/user/admin">Non-User View</Link>
            </div>
        </div>
    </div>
    </>
    )
}

export default AdminNav;