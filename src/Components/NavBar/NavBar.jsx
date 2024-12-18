import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../../UserProvider';
import './NavBar.css';
import { Link } from "react-router-dom";
import { logOut as apiLogOut } from "../../utilities/user-api";
import { useNavigate } from 'react-router-dom';
import { searchAnime } from "../../utilities/anime-api";


function NavBar() {
    const navigate = useNavigate();

    // user handling
    const { user, admin, logOut: contextLogOut } = useContext(UserContext);
    const handleLogout = async () => {
        try {
            await apiLogOut();
            navigate('/');
        } catch (err) {
            console.error("Error logging out:", err);
        } finally {
            contextLogOut();
        }
    };
    // hover feature handling
    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [isTrendingHovered, setIsTrendingHovered] = useState(false);
    const [isMangaHovered, setIsMangaHovered] = useState(false);
    const [isAnimeHovered, setIsAnimeHovered] = useState(false);
    const [isUserHovered, setIsUserHovered] = useState(false);
    


    // search hover and select feature handling
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const handleSearchHover = () => {
        setIsSearchHovered(true);
    };
    const handleSearchLeave = () => {
        if (!isSearchClicked) {
            setIsSearchHovered(false);
        }
    };
    const toggleSearchClick = () => {
        setIsSearchClicked(prev => !prev);
    };

    // search handling
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
          clearTimeout(timeoutId);
        };
      }, [searchTerm]);

    useEffect (()=> {
        const searchAndFetchAnimes = async () => {
            if(!debouncedSearchTerm) return;
            try{
                const searchParams = {
                    titleEnglish: debouncedSearchTerm,
                    titleJpRoman: debouncedSearchTerm    
                };
                const searchedAnimes = await searchAnime(searchParams);
                setSearchResults(searchedAnimes);
            }catch{
                setSearchResults([]);
                setError("error");
            }
        }
        searchAndFetchAnimes();
    }, [debouncedSearchTerm]);

    // redirect to pages

    const handleRedirect = (target) => {
        if(location.pathname !== target){
            navigate(target);
        }
    }



    return (
        <>
            {admin === null ? (
                null
            ) : admin ? (
                <div>
                    <div className="font-bold border-t border-r border-c4 inline-block m-4 p-1 select-none ">
                        Admin
                    </div>
                    <Link className="font-bold border-b border-l border-c4 inline-block m-4 hover:text-c2 p-1 select-none " to="/admin/home">
                        Menu
                    </Link>
                </div>
            ) : (
                <div className="font-bold border-r border-l p-1 border-c4 inline-block m-4 select-none ">
                    AMM
                </div>
            )}

            <div className="mt-10 flex w-full nav_w">
                <Link className="p-2 text-center flex-1 cursor-pointer hover:text-c2 relative" to="/" onMouseEnter={() => setIsHomeHovered(true)} onMouseLeave={() => setIsHomeHovered(false)}>
                    <p className="select-none ">Home</p>
                    <span className="absolute bottom-1/2 transform translate-y-1/2 right-0 h-20 border-r-2 border-c4"></span>
                    <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                </Link>

                <div className="p-2 flex-1 text-center cursor-pointer hover:text-c2 relative" onMouseEnter={() => setIsTrendingHovered(true)} onMouseLeave={() => setIsTrendingHovered(false)} onClick={() => handleRedirect(`/trending`)}>
                    <p className="select-none ">Trending</p>
                    <span className="absolute bottom-0 transform translate-y-1/2 right-0 h-20 border-r-2 border-c4"></span>
                    <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                </div>

                <div className="p-2 flex-1 text-center cursor-pointer hover:text-c2 relative" onMouseEnter={() => setIsMangaHovered(true)} onMouseLeave={() => setIsMangaHovered(false)} onClick={() => handleRedirect(user?.name ? `/mangaList/${user.name}` : '/mangaList')}>
                    <p className="select-none ">Manga</p>
                    <span className="absolute bottom-1/2 transform translate-y-1/2 right-0 h-20 border-r-2 border-c4"></span>
                    <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                </div>
                <div className="p-2 flex-1 text-center cursor-pointer hover:text-c2 relative" onMouseEnter={() => setIsAnimeHovered(true)} onMouseLeave={() => setIsAnimeHovered(false)} onClick={() => handleRedirect(user?.name ? `/animeList/${user.name}` : '/AnimeList')}>
                    <p className="select-none ">Anime</p>
                    <span className="absolute bottom-0 transform translate-y-1/2 right-0 h-20 border-r-2 border-c4"></span>
                    <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                </div>
                <div className="p-2 flex-1 text-center cursor-pointer hover:text-c2 relative" onMouseEnter={handleSearchHover} onMouseLeave={handleSearchLeave}>
                    <p className="select-none ">Search</p>
                    <span className="absolute bottom-1/2 transform translate-y-1/2 right-0 h-20 border-r-2 border-c4"></span>
                    <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                </div>
                {
                    user 
                    ?
                    <div className="p-2 flex-1 text-center cursor-pointer relative group" onMouseEnter={() => setIsUserHovered(true)} onMouseLeave={() => setIsUserHovered(false)}>
                        <div className="hover:text-c2 select-none ">
                            {user.name}
                        </div>
                        <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                    </div>
                    :     
                    <Link className="p-2 flex-1 text-center cursor-pointer relative group hover:text-c2" to='/auth'>        
                            <div className="w-full select-none ">
                                Login
                            </div>
                        <span className="absolute right-0 bottom-0 w-full h-1/2 border-b-2 border-c4"></span>
                    </Link>
                }
            </div>

            <div className="flex w-full nav_w mb-36">
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isHomeHovered ? '' : 'hidden'}`} onMouseEnter={() => setIsHomeHovered(true)} onMouseLeave={() => setIsHomeHovered(false)}>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-2/3 border-c4 pl-1 select-none ">home links</div>
                    </div>
                </div>
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isTrendingHovered ? '' : 'hidden'}`} onMouseEnter={() => setIsTrendingHovered(true)} onMouseLeave={() => setIsTrendingHovered(false)}>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-2/3 border-c4 pl-1 select-none ">high viewership</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/2 border-c4 pl-1 select-none ">newly added</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/3 border-c4 pl-1 select-none ">trending</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/4 border-c4 pl-1 select-none ">charts</div>
                    </div>
                </div>
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isMangaHovered ? '' : 'hidden'}`} onMouseEnter={() => setIsMangaHovered(true)} onMouseLeave={() => setIsMangaHovered(false)}>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-2/3 border-c4 pl-1 select-none ">top manga</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/2 border-c4 pl-1 select-none ">recommended</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/3 border-c4 pl-1 select-none ">publishing</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/4 border-c4 pl-1 select-none ">popular</div>
                    </div>
                </div>
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isAnimeHovered ? '' : 'hidden'}`} onMouseEnter={() => setIsAnimeHovered(true)} onMouseLeave={() => setIsAnimeHovered(false)}>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-2/3 border-c4 pl-1 select-none " onClick={() => handleRedirect('/top/anime')}>top anime</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/2 border-c4 pl-1 select-none ">recommended</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/3 border-c4 pl-1 select-none ">seasonal</div>
                        <div className="hover:text-c2 text-left ml-8 mb-1 border-b w-1/4 border-c4 pl-1 select-none ">popular</div>
                    </div>
                </div>
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isSearchHovered ? '' : 'hidden'}`} onMouseEnter={handleSearchHover} onMouseLeave={handleSearchLeave} onClick={toggleSearchClick}>
                        {/* Search Input */}
                        <input
                            name='search'
                            type="text"
                            className="mx-auto p-2 mx-auto mb-2 w-48 bg-c5 text-c6 h-8"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {debouncedSearchTerm && searchResults.length === 0 && !error && (
                            <div className="mx-auto p-2 mx-auto mb-2 w-48 bg-c5 text-c6 h-8 pb-8">
                                No results
                            </div>
                        )}
                        <div className="w-[17.5vw] max-w-lg mx-auto text-c6">

                            {/* Error Message */}
                            {error && (
                                <div className="text-center text-c2 mb-2 relative z-5">
                                    {error}
                                </div>
                            )}

                            {/* Search Results */}
                            <div className="bg-c5 relative z-5">
                                {searchResults.map((anime, index) => (
                                    <Link to={`/anime/${anime.id}`}>
                                        <div
                                            key={index}
                                            className="p-2 border-b border-c4 pb-1 hover:bg-c2 hover:text-c5 cursor-pointer relative z-5 flex"
                                        >
                                            <img 
                                                src={anime.image} 
                                                alt={"Anime Image"} 
                                                className="w-[29px] h-[41px] object-cover mr-2" 
                                            />
                                            {anime.titleEnglish || anime.titleJpRoman || "Unknown Title"}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2 flex-1 relative">
                    <div className={`p-2 absolute top-0 left-0 w-full text-center cursor-pointer ${isUserHovered ? '' : 'hidden'}`} onMouseEnter={() => setIsUserHovered(true)} onMouseLeave={() => setIsUserHovered(false)}>
                        <Link className="cursor-pointer hover:text-c select-none 2" to="/profile">Profile</Link>
                        <div className="cursor-pointe hover:text-c2 select-none " onClick={handleLogout}>LogOut</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;