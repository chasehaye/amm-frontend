import React, { useState, useRef, useEffect } from "react";
import { indexGenre, indexStudio, searchAnime, updateAnime } from "../../utilities/anime-api";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import FormSubmissionButton from "../FormSubmissionButton/FormSubmissionButton";

function AnimeItemDetail({anime, setAnime}){
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const titleEnglishRef = useRef(anime.titleEnglish);
    const titleJpRomanRef = useRef(anime.titleJpRoman);
    const titleJpKanjiRef = useRef(anime.titleJpKanji);
    const descriptionRef = useRef(anime.description);
    const episodesRef = useRef(anime.episodes);
    const episodeDurationRef = useRef(anime.episodeDuration);

    const [type, setType] = useState(anime.type);
    const [demographic, setDemographic] = useState(anime.demographic);

    // seasons related logic
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'].map((season) => ({
        label: season,
        value: season
    }));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear + 2 - 1970 + 1 }, (_, index) => currentYear + 2 - index).map((year) => ({
        label: year.toString(),
        value: year.toString(),
    }));
    const handleSeasonChange = (selectedOption) => {
        setSelectedSeason(selectedOption);
    };
    
    const handleYearChange = (selectedOption) => {
        setSelectedYear(selectedOption);
    };

    useEffect(() => {
        if (anime.premiereSeason) {
            const [season, year] = anime.premiereSeason.split(" ");
            setSelectedSeason({ label: season, value: season });
            setSelectedYear({ label: year, value: year });
        }
    }, [anime.premiereSeason]); 




    // genre related logic
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleGenreChange = (genre) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genre)
                ? prevSelectedGenres.filter((selected) => selected !== genre)
                : [...prevSelectedGenres, genre]
        );
    };
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const fetchedGenres = await indexGenre();
                setGenres(fetchedGenres);
                const selectedGenreNames = fetchedGenres
                .filter((genre) => anime.genre.includes(genre.name))
                .map((genre) => genre.name);
                setSelectedGenres(selectedGenreNames);
            } catch {
                console.log("Failed to fetch genres");
            }
        };
      
        fetchGenres();
    }, [anime.genre]);
    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const studios = await indexStudio();
                setStudios(studios);
            } catch {
                console.log("Failed to fetch studios");
            }
        };
        fetchStudios();
    }, []);

    // studio related logic
    const [studios, setStudios] = useState([]);
    const [selectedStudio, setSelectedStudio] = useState(anime.studio?.name || null);


    // start end date fields
    const [airDate, setAirDate] = useState(anime.airDate);
    const [endDate, setEndDate] = useState(anime.endDate);


    // prequel / sequel related logic
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [prequel, setPrequel] = useState(anime.prequel);
    const [sequel, setSequel] = useState(anime.sequel);

    const handleSePreLinking = (searchedResult, type) => {
        if(type === 'pre'){
            setPrequel(searchedResult)
        }
        if(type === 'seq'){
            setSequel(searchedResult)
        }
        setSearchTerm('');
        setDebouncedSearchTerm('');
    };

    useEffect (() => {
        const searchAndFetchAnimeDefault = async () => {
            try{
                const searchParams = {};
                if (anime.prequel) {
                    searchParams.idPre = anime.prequel;
                }
                if (anime.sequel) {
                    searchParams.idSeq = anime.sequel;
                }
                if (Object.keys(searchParams).length > 0) {
                    const searchedAnimes = await searchAnime(searchParams);
                    const foundPrequel = searchedAnimes.find((animeItem) => Number(animeItem.id) === Number(anime.prequel));
                    const foundSequel = searchedAnimes.find((animeItem) => Number(animeItem.id) === Number(anime.sequel));
                    if (foundPrequel) {
                        setPrequel(foundPrequel);
                    }
                    if (foundSequel) {
                        setSequel(foundSequel);
                    }
                }
            }catch(e){
                console.log("Failed to fetch the search");

            }
        };
        if (anime) {
            searchAndFetchAnimeDefault();
        }
    }, [anime]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => {
          clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    useEffect (() => {
        const searchAndFetchAnimes = async () => {
            if (!debouncedSearchTerm) {
                setSearchResults([]);
                return;
            }
            try{
                const searchParams = { titleEnglish: debouncedSearchTerm, titleJpRoman: debouncedSearchTerm };
                const searchedAnimes = await searchAnime(searchParams);
                setSearchResults(searchedAnimes);
            }catch{
                setSearchResults([]);
                console.log("Failed to fetch the search");
            }
        };
        searchAndFetchAnimes();
    }, [debouncedSearchTerm, prequel, sequel]);


    // handling file input 
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(anime.image);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImagePreview(anime.image || null);
        }
    }, [imageFile, anime.image]);
  
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };
  
    const handleFileRemove = () => {
        setImageFile(null);
        setImagePreview(anime.image || null);
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }else{
            fileInputRef.current.value = anime.iamge;
        }
    };




    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        setError('');

        const premiereSeason = selectedSeason && selectedYear ? `${selectedSeason.value} ${selectedYear.value}` : '';
        const formattedAirDate = airDate ? new Date(airDate).toISOString().split('T')[0] : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';

        const updatedAnime = {};

        if (titleEnglishRef.current.value) updatedAnime.titleEnglish = titleEnglishRef.current.value;
        if (titleJpRomanRef.current.value) updatedAnime.titleJpRoman = titleJpRomanRef.current.value;
        if (titleJpKanjiRef.current.value) updatedAnime.titleJpKanji = titleJpKanjiRef.current.value;
        if (descriptionRef.current.value) updatedAnime.description = descriptionRef.current.value;
        if (type) updatedAnime.type = type;
        if (episodesRef.current.value) updatedAnime.episodes = parseInt(episodesRef.current.value, 10);
        if (episodeDurationRef.current.value) updatedAnime.episodeDuration = parseInt(episodeDurationRef.current.value, 10);
        if (premiereSeason) updatedAnime.premiereSeason = premiereSeason;
        if (demographic) updatedAnime.demographic = demographic;
        if (formattedAirDate) updatedAnime.airDate = formattedAirDate;
        if (formattedEndDate) updatedAnime.endDate = formattedEndDate;
        if (prequel) updatedAnime.prequel = prequel.id;
        if (sequel) updatedAnime.sequel = sequel.id;
        if (selectedStudio) updatedAnime.studio = selectedStudio;
        if (selectedGenres.length > 0) updatedAnime.genre = selectedGenres;
        try{
            const newAnime = await updateAnime(anime.id, updatedAnime, imageFile);
            setAnime(newAnime);
            navigate("/admin/home");
        }catch{
            setError("Invalid update");
        }finally{
            setLoading(false);
        }
    }


    return(
        <>
            <Link className="mt-4 flex justify-center items-center mb-2 border-x border-c4 w-40 mx-auto py-2 hover:bg-c2" to={`/anime/${anime.id}/base`}>
                view detail
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div>
                        <div className="flex flex-col w-60 mx-20">
                            <label className="mb-1" htmlFor="eng">English Title: </label>
                            <input placeholder="English Title" type="text" id="eng" ref={titleEnglishRef} defaultValue={anime.titleEnglish} className="px-2 py-1 text-c1 px-1 mb-2"/>
                        </div>
                        <div className="flex flex-col w-60 mx-20">
                            <label className="mb-1" htmlFor="">Romanized Japanese Title: </label>
                            <input placeholder="Romanized Title" type="text" ref={titleJpRomanRef} defaultValue={anime.titleJpRoman} className="px-2 py-1 text-c1 px-1 mb-2" required />
                        </div>
                        <div className="flex flex-col w-60 mx-20">
                            <label className="mb-1" htmlFor="">Japanese Kanji Title: </label>
                            <input placeholder="Japanese Title" type="text" ref={titleJpKanjiRef} defaultValue={anime.titleJpKanji} className="px-2 py-1 text-c1 px-1 mb-2"/>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex flex-col mb-2">
                            <label className="mb-1" htmlFor="air-date">Air Date: </label>
                            <DatePicker
                            selected={airDate}
                            onChange={(date) => setAirDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="px-2 py-1 text-c1 mb-2"
                            placeholderText="YYYY-MM-DD"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1" htmlFor="end-date">End Date: </label>
                            <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="px-2 py-1 text-c1 mb-2"
                            placeholderText="YYYY-MM-DD"
                            />
                        </div>
                    </div>
                    <div className="flex ml-2 ml-20">
                        <div className="mx-auto mt-7">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="w-52 mb-2"
                            />
                        </div>
                        <div className="relative mx-auto w-[174px] h-[246px] ml-16 mt-7">
                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            onClick={handleFileRemove}
                                            className="w-[174px] h-[246px] cursor-pointer"
                                        />
                                        <div className="cursor-pointer absolute top-0 right-0 w-[174px] h-[246px] flex justify-center items-center text-c2 text-6xl opacity-0 hover:opacity-100" onClick={handleFileRemove}>
                                            X
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[40vw] mx-20">
                    <label className="mb-1" htmlFor="">Description/Synopsis: </label>
                    <textarea 
                        id="description" 
                        ref={descriptionRef}
                        defaultValue={anime.description}
                        className="px-2 py-1 text-c1 px-1 mb-2" 
                        rows="10"
                    />
                </div>



                <div className="flex w-80 mx-40 mb-4">
                    <div className="flex flex-col w-60 mr-6">
                        <label className="mb-1" htmlFor="">Number of episodes:</label>
                        <input placeholder="#" type="number" ref={episodesRef} defaultValue={anime.episodes} className="px-2 py-1 text-c1 px-1 mb-2 w-14"/>
                    </div>
                    <div className="flex flex-col w-60 mr-6">
                        <label className="mb-1" htmlFor="">Duration per episode:</label>
                        <input placeholder="#" type="number" ref={episodeDurationRef} defaultValue={anime.episodeDuration} className="px-2 py-1 text-c1 px-1 mb-2 w-14"/>
                    </div>
                    <div className="flex flex-col mx-4 mb-4">
                        <div className="flex flex-col justify-center items-center mb-2"><span>Select</span><span>Type</span></div>
                        <div 
                            onClick={() => setType(type === 'TV' ? null : 'TV')} 
                            className={`select-none mb-2 no-select cursor-pointer border-t border-r border-c4 flex justify-center items-center py-2 w-20 ${type === 'TV' ? 'bg-c2 text-c6' : ''}`}
                        >
                            TV
                        </div>
                        <div 
                            onClick={() => setType(type === 'Movie' ? null : 'Movie')} 
                            className={`select-none mb-2 no-select cursor-pointer border-t border-l border-c4 flex justify-center items-center px-4 py-2 w-20 ${type === 'Movie' ? 'bg-c2 text-c6' : ''}`}
                        >
                            Movie
                        </div>
                        <div 
                            onClick={() => setType(type === 'OVA' ? null : 'OVA')}
                            className={`select-none mb-2 no-select cursor-pointer border-t border-r border-c4 flex justify-center items-center px-4 py-2 w-20 ${type === 'OVA' ? 'bg-c2 text-c6' : ''}`}
                        >
                            OVA
                        </div>
                    </div>
                    <div className="flex flex-col mx-4 mb-4">
                        <div className="flex flex-col justify-center items-center mb-2"><span>Select</span><span>Demographic</span></div>
                            <div 
                                onClick={() => setDemographic(demographic === 'Shounen' ? null : 'Shounen')}
                                className={`select-none mb-2 no-select cursor-pointer border-t border-r border-c4 flex justify-center items-center py-2 w-24 ${demographic === 'Shounen' ? 'bg-c2 text-c6' : ''}`}
                            >
                                Shounen
                            </div>
                            <div 
                                onClick={() => setDemographic(demographic === 'Seinen' ? null : 'Seinen')}
                                className={`select-none mb-2 no-select cursor-pointer border-t border-l border-c4 flex justify-center items-center px-4 py-2 w-24 ${demographic === 'Seinen' ? 'bg-c2 text-c6' : ''}`}
                            >
                                Seinen
                            </div>
                            <div 
                                onClick={() => setDemographic(demographic === 'Shoujo' ? null : 'Shoujo')}  
                                className={`select-none mb-2 no-select cursor-pointer border-t border-r border-c4 flex justify-center items-center px-4 py-2 w-24 ${demographic === 'Shoujo' ? 'bg-c2 text-c6' : ''}`}
                            >
                                Shoujo
                            </div>
                            <div 
                                onClick={() => setDemographic(demographic === 'Josei' ? null : 'Josei')}
                                className={`select-none mb-2 no-select cursor-pointer border-t border-l border-c4 flex justify-center items-center px-4 py-2 w-24 ${demographic === 'Josei' ? 'bg-c2 text-c6' : ''}`}
                            >
                                Josei
                            </div>
                    </div>

                    <div>
                        <div className="flex flex-col w-32 mx-4">
                            <label className="mb-1" htmlFor="season">Select Season:</label>
                            <Select
                            id="season"
                            value={selectedSeason}
                            onChange={handleSeasonChange}
                            options={seasons}
                            placeholder="--Season--"
                            className="text-c1"
                            classNamePrefix="react-select"
                            />
                        </div>
                        <div className="flex flex-col w-32 mx-4">
                            <label className="mb-1" htmlFor="year">Select Year:</label>
                            <Select
                            id="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            options={years}
                            placeholder="--Year--"
                            className="text-c6"
                            classNamePrefix="react-select"
                            />
                        </div>

                    </div>

                    <div className="mt-2 mx-2 w-10 min-w-[40px] flex-shrink-0 flex flex-col ml-10">
                            <div className={`flex justify-center items-center text-c2 ${type && (demographic) ? 'border-b border-c4 pb-3 mb-3' : ''}`}>{type}</div>
                            <div className={`flex justify-center items-center mb-3 text-c2`}>{demographic}</div>
                            <div className={`flex justify-center items-center mb-3 pt-3 ${selectedSeason && selectedYear && (type || demographic) ? 'border-t border-c4' : ''}`}>
                                {selectedSeason && selectedYear ? 
                                    <div className="flex flex-col space-y-2">
                                        <div className="text-center text-c2">{selectedSeason.value}</div>
                                        <div className="text-center text-c2">{selectedYear.value}</div>
                                    </div> 
                                : 
                                    ''
                                }
                            </div>
                    </div>
                </div>

                <div className="ml-20 flex">
                    <div>
                        <label className="border-b border-c4 pb-2">Select Genre (many)</label>
                        <div className="max-h-80 overflow-y-auto mt-4 pt-2 w-40 scrollbar-custom overflow-x-hidden">
                            {genres.map((genre) => (
                            <div
                            key={genre.id}
                            className={`select-none flex space-x-1 cursor-pointer mb-1 ${
                                selectedGenres.includes(genre.name)
                                ? "bg-c2 text-c6" 
                                : "border-b border-l border-c4"
                            } p-2`}
                            onClick={() => handleGenreChange(genre.name)}
                            >
                            <span>{genre.name}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="ml-4">
                        <label className="border-b border-c4 pb-2">Select Studio (one)</label>
                        <div className="max-h-80 overflow-y-auto mt-4 pt-2 w-40 scrollbar-custom overflow-x-hidden">
                            {studios.map((studio) => (
                                <div
                                key={studio.id}
                                className={`select-none flex space-x-1 cursor-pointer mb-1 ${
                                    selectedStudio === studio.name
                                    ? "bg-c2 text-c6"
                                    : "border-b border-l border-c4"
                                } p-2`}
                                onClick={() => setSelectedStudio(selectedStudio === studio.name ? null : studio.name)}
                                >
                                <span>{studio.name || "No studio available"}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="ml-20">
                        <div className="flex flex-col w-60 mb-4">
                            <label>Search to add pre/sequel:</label>
                            <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="search for anime"
                                    className="px-2 py-1 mt-2 mr-4"
                                />
                        </div>
                        <div className="max-h-60 overflow-y-auto scrollbar-custom overflow-x-hidden w-80">
                            {searchResults.map((searchedResult, id) => (
                                <div key={searchedResult.id} className="">
                                    <div className="border-t border-l border-c4 flex mb-1">
                                        {searchedResult.image ? (
                                            <img 
                                                src={searchedResult.image} 
                                                alt="Anime Prequel Image" 
                                                className="w-[58px] h-[82px] my-4 mx-4" 
                                            />
                                        ) : (
                                            <div 
                                                className="w-[58px] h-[82px] my-4 mx-4 bg-c4 text-c6 flex items-center justify-center"
                                            >
                                                <span className="text-5xl">?</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col mt-3">
                                            <div>{searchedResult?.titleEnglish || searchedResult?.titleJpRoman || "No title"}</div>
                                            <div className="flex mt-2">
                                                <div className="ml-1 mr-2 p-1 border-t border-r border-c4 hover:bg-c2 cursor-pointer" onClick={() => {handleSePreLinking(searchedResult, 'pre')}}>+ pre</div>
                                                <div className="ml-1 mr-2 p-1 border-t border-l border-c4 hover:bg-c2 cursor-pointer" onClick={() => {handleSePreLinking(searchedResult, 'seq')}}>+ seq</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col w-60 ml-4">
                        {prequel && (
                        <div className="flex mb-2 border-t border-l border-c4">
                            {prequel.image ? (
                            <img 
                                src={prequel.image} 
                                alt="Anime Prequel Image" 
                                className="w-[58px] h-[82px] my-4 mx-4" 
                            />
                            ) : (
                            <div 
                                className="w-[58px] h-[82px] my-4 mx-4 bg-c4 text-c6 flex items-center justify-center"><span className="text-5xl">?</span></div>
                            )}
                            <div className="mt-4 flex flex-col">
                                <div>
                                    {prequel.titleEnglish ?? prequel.titleJpRoman}
                                </div>
                                <div>
                                    prequel
                                </div>
                            </div>
                        </div>
                        )}
                        {prequel && sequel && (
                        <div className="border-b border-c4 w-20 mx-auto"></div>
                        )}
                        {sequel && (
                        <div className="flex mt-2 border-b border-l border-c4">
                            {sequel.image ? (
                            <img 
                                src={sequel.image} 
                                alt="Anime Sequel Image" 
                                className="w-[58px] h-[82px] my-4 mx-4" 
                            />
                            ) : (
                            <div 
                                className="w-[58px] h-[82px] my-4 mx-4 bg-c4 text-c6 flex items-center justify-center"><span className="text-5xl">?</span></div>
                            )}
                            <div className="mt-4 flex flex-col">
                                <div>
                                    {sequel.titleEnglish ?? sequel.titleJpRoman}
                                </div>
                                <div>
                                    sequel
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>







                <div className="w-full flex justify-center mt-10">
                    <FormSubmissionButton  buttonText="Update" isSubmitting={loading} />
                </div>





            </form>
            <p className="flex w-full justify-center items-center mb-2">{error}</p>
        </>
    )
}

export default AnimeItemDetail;