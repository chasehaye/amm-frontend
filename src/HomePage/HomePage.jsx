import React, { useContext } from 'react';
import { UserContext } from '../UserProvider';
import NavBar from '../Components/NavBar/NavBar';

function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
            <NavBar/>
            <div className="flex justify-center items-center h-20 border-b border-c4 mb-20 ">
                Welcome
            </div>
            <div className='flex mt-4'>
                <div className='flex flex-col border border-c4 ml-32 p-6'>
                    <div className='border-b border-c4 mb-2 pb-4'>
                        What is AMM:
                    </div>
                    <div className='mx-1 my-1 leading-[2.0]'>
                        AMM is an application used for tracking anime, manga, and manwha. It is a long term project with one developer. It's primary purpose is for personal education and growth.
                    </div>
                    
                </div>
                <div className='flex flex-col border-y border-c4 p-6'>
                    <div className='border-b border-c4 mb-2 flex justify-center items-center text-center pb-4'>
                        Developer Info
                    </div>
                    <div className='mx-40 my-1 leading-[2.0]'>
                        AMM uses a handful of different technologies to deliver the user a seamless experience. For the front end it utilizes REACT, in this instance it was built with vite,
                        for stylizing the page talwind CSS was chosen as a plugin to allow for a cleaner code-base and quicker development. The application then communicates to the backend
                        through custom built API calls. The Django server manages data and user tracking via token-based authentication. This backend handles robust logic through a variety
                        models and relations. The data is stored in a postgreSQL database and assets are handled efficiently via bucketing using AWS.
                    </div>
                </div>
                <div className='mr-32 border border-c4 p-6 w-1/2'>
                    <div className='border border-c4 mb-2 py-4 flex justify-center items-center text-center text-2xl cursor-pointer py-1'>
                        {user.name}
                    </div>
                    <div className='text-lg flex justify-center items-center text-center pt-2 leading-[2.0] border-t border-c4 mt-8 flex flex-col'>
                        <div>
                            Welcome, home
                        </div>
                        <div>
                            {user.name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home