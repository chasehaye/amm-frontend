import sendRequest from "./send-request";
const BASE_URL = '/api/anime';

export function index(){
    return sendRequest(`${BASE_URL}/index/base`, 'GET');
}

export function indexOrder(queryParameters){
    return sendRequest(`${BASE_URL}/index/by`, 'GET', null, queryParameters)
}   

export function createNewAnime(animeData, imageFile){
    console.log(animeData)
    const formData = new FormData();
    if (imageFile) {
        formData.append('image', imageFile);
    }
    Object.keys(animeData).forEach((key) => {
        formData.append(key, animeData[key]);
    });
    if (!imageFile) {
        return sendRequest(`${BASE_URL}/create`, 'POST', animeData);
    }

    return sendRequest(`${BASE_URL}/create`, 'POST', formData);
}

export function getAnimeRequest(animeId){
    return sendRequest(`${BASE_URL}/${animeId}`, 'GET');
}

export function getAbbrvAnimeRequest(animeId){
    return sendRequest(`${BASE_URL}/${animeId}/abbrv`, 'GET');
}

export function deleteAnimeRequest(animeId){
    return sendRequest(`${BASE_URL}/${animeId}/delete`, 'DELETE');
}

export function updateAnime(animeId, animeData, imageFile){
    const formData = new FormData();
    if (imageFile) {
        formData.append('image', imageFile);
    }
    Object.keys(animeData).forEach((key) => {
        formData.append(key, animeData[key]);
    });
    if (!imageFile) {
        return sendRequest(`${BASE_URL}/${animeId}/update`, 'PUT', animeData);
    }

    return sendRequest(`${BASE_URL}/${animeId}/update`, 'PUT', formData)
}

export function searchAnime(queryParameters){
    return sendRequest(`${BASE_URL}/index/search`, 'GET', null, queryParameters);
}






// genre calls
export function createNewGenre(genreData){
    return sendRequest(`${BASE_URL}/genre/create`, 'POST', genreData);
}

export function indexGenre(){
    return sendRequest(`${BASE_URL}/genre/index`, 'GET');
}

export function deleteGenre(genreId){
    return sendRequest(`${BASE_URL}/genre/delete/${genreId}`, 'DELETE');
}

// studio calls
export function createNewStudio(studioData){
    return sendRequest(`${BASE_URL}/studio/create`, 'POST', studioData);
}

export function indexStudio(){
    return sendRequest(`${BASE_URL}/studio/index`, 'GET');
}

export function deleteStudio(studioId){
    return sendRequest(`${BASE_URL}/studio/delete/${studioId}`, 'DELETE');
}