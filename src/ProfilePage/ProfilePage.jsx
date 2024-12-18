import React, { useContext } from 'react';
import { UserContext } from '../UserProvider';
import NavBar from '../Components/NavBar/NavBar';
import UnderDevComp from "../Components/UnderDevComp/UnderDevComp";


function ProfilePage() {
    const { user } = useContext(UserContext);
    return (
        <>
            <NavBar />
            <UnderDevComp titleOfDev="Profile" />
        </>
    )
}

export default ProfilePage;