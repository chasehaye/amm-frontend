import sendRequest from "./send-request";
const BASE_URL = '/api/user';

export function register(userData) {
  return sendRequest(`${BASE_URL}/register`, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function grabUser() {
  return sendRequest(`${BASE_URL}/user`, 'GET');
}

export function adminVerify() {
  return sendRequest(`${BASE_URL}/admin`, 'GET');
}

export function logOut() {
  return sendRequest(`${BASE_URL}/logout`, 'POST');
}

//  user anime relation calls

export function linkAnimeToUser(username, queryParameters) {
  return sendRequest(`${BASE_URL}/${username}/link/anime`, 'POST', null, queryParameters);
}

export function retrieveUserList(username, queryParameters) {
  return sendRequest(`${BASE_URL}/${username}/list/anime`, 'GET', null, queryParameters);
}

export function retrieveUserAnimeInfo(username, animeId, queryParameters) {
  return sendRequest(`${BASE_URL}/${username}/info/for/${animeId}`, 'GET', null, queryParameters);
}

export function updateUserAnimeRating(username, animeId, queryParameters) {
  return sendRequest(`${BASE_URL}/${username}/rate/${animeId}`, 'POST', null, queryParameters);
}

export function updateUserEpisodeCnt(username, animeId, queryParameters){
  return sendRequest(`${BASE_URL}/${username}/ep/cnt/${animeId}`, 'POST', null, queryParameters);
}