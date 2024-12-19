import { getToken } from './user-service';


export default async function sendRequest(url, method = 'GET', payload = null, queryParameters = {}) {

  if (Object.keys(queryParameters).length > 0) {
    const queryString = new URLSearchParams(queryParameters).toString();
    url = `${url}?${queryString}`;
  }

  const options = { method, credentials: 'include' };


  if (payload) {
    if (payload instanceof FormData) {
      options.body = payload;
    } else {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  }


  const token = getToken();
  if (token) {
    // Ensure that headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }


  const cleanedUrl = url.replace(/^\/api/, '');
  const fullUrl = `${import.meta.env.VITE_API_URL}${cleanedUrl}`;
  console.log(fullUrl)


  const res = await fetch(fullUrl, options);
  console.log('Response status:', res.status);
  if (res.ok) {
    return res.json();
  } else {
    console.error('Error response:', await res.text()); // Log the error response
    throw new Error('Bad Request');
  }
}